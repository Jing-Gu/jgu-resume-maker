export interface ResumeItem {
  name: string
  data: NotionListObject
}

export interface NotionListObject {
  object: 'list',
  has_more: boolean,
  type: string,
  results: NotionPageObject[]
}

export interface NotionPageObject {
  object: 'page',
  id: string,
  icon: null,
  properties: any
}

export interface ResumeItemList extends ResumeItem {}