import http from "http";
import { Client } from "@notionhq/client";
import { DB_API_KEY, DB_ID, HOST, PORT } from "./config.js";

const notion = new Client({
  auth: DB_API_KEY,
});

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  if (req.url.startsWith('/api')) {
    const dbQuery = await notion.databases.query({
      database_id: DB_ID,
    });

    const promises = dbQuery.results.map(async dbPage => {
      const children = await notion.blocks.children.list({
        block_id: dbPage.id,
      })
      let tableId
      let dbTitle
      let dbData

      if (children.results[0].type === 'child_database') {
        tableId = children.results[0].id
        dbTitle = children.results[0].child_database.title
        dbData = await notion.databases.query({
          database_id: tableId,
          sorts: [
            {
              "property": "key",
              "direction": "ascending"
            }
          ]
        });
      }

      return { name: dbTitle, data: dbData };
    })

    Promise.all(promises)
      .then(list => {
          // All asynchronous operations have completed here
          res.setHeader("Content-Type", "application/json");
          res.writeHead(200);
          res.end(JSON.stringify(list));
      })
      .catch(error => {
          console.error(error);
          res.writeHead(500);
          res.end(JSON.stringify({ error: "Internal Server Error" }));
      });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Resource not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});