import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { ResumeItem } from './app.interface'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AppService {

  private http = inject(HttpClient)
  private url = environment.api

  getDb() {
    return this.http.get<ResumeItem[]>(`${this.url}api/`)
  }

  generatePdf() {
    let headers = new HttpHeaders()
    headers = headers.set('Accept', 'application/pdf')
    return this.http.get(`${this.url}generate-pdf/`,
      { headers: headers, responseType: 'blob' as 'json'})
  }

}