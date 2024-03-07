import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AppService } from './app.service'
import { Subscription, map } from 'rxjs'
import { NotionListObject, ResumeItem } from './app.interface'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'jgu-resume';

  private service = inject(AppService)
  personal: ResumeItem | undefined
  education: ResumeItem | undefined
  experience: ResumeItem | undefined
  skills: ResumeItem | undefined
  certifications: ResumeItem | undefined
  resumeSub: Subscription | undefined


  ngOnInit(): void {
    this.resumeSub = this.service.getDb().pipe(
      map(res => {
        res.forEach(r => {
          if(r.name === 'personal data') {
            this.personal = r
          }
          if(r.name === 'education') {
            this.education = r
          }
          if(r.name === 'professional experience') {
            this.experience = r
          }
          if(r.name === 'key skills') {
            this.skills = r
          }
          if(r.name === 'certifications') {
            this.certifications = r
          }

        })

      })
    ).subscribe(r => {
      // add a loader, show when data prepared
      console.log(this.personal, this.education)
    })
  }

  ngOnDestroy(): void {
    this.resumeSub?.unsubscribe()
  }
}
