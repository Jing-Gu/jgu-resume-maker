import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AppService } from './app.service'
import { Subscription, map } from 'rxjs'
import { ResumeItem } from './app.interface'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit, OnDestroy{
  private service = inject(AppService)
  personal: ResumeItem | undefined
  education: ResumeItem | undefined
  experience: ResumeItem | undefined
  skills: ResumeItem | undefined
  certifications: ResumeItem | undefined
  resumeSub: Subscription | undefined

  loadingPage = true
  loadingPdf = false
  githubLink = 'https://github.com/jing-gu/jgu-resume-maker'

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
    ).subscribe(_ => {
      if (this.personal && this.education && this.experience &&
        this.skills && this.certifications) {
        this.loadingPage = false
      }
    })
  }

  generatePDF() {
    this.loadingPdf = true
    this.service.generatePdf().subscribe((pdfLink: any) => {
      const file = new Blob([pdfLink], {type: 'application/pdf'})
      const fileURL = URL.createObjectURL(file)
      window.open(fileURL, '_blank')
      this.loadingPdf = false
    })
  }

  ngOnDestroy(): void {
    this.resumeSub?.unsubscribe()
  }
}
