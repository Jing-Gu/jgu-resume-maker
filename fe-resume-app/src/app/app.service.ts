import { HttpClient } from '@angular/common/http'
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
    return this.http.get<ResumeItem[]>(this.url)
  }

}