import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SmsService } from './services/sms.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pandora2';
  QrImg : any
  Login : boolean = false
  ListTelefonos : any [] = []
  Telefono : string = ''
  constructor(private sms : SmsService, private cdref : ChangeDetectorRef){}

  ngOnInit(): void {
    this.sms.GetQr().then(async (res : any) => {
      this.QrImg = await res.res    
      this.sms.DetectUrl().then(async (res:any) => {
        this.Login = true
      })     
    })
    
  }

  addphone(){
    this.ListTelefonos.push(this.Telefono)
    console.log(this.ListTelefonos)
  }

  sendsms(){
    this.sms.SendSms('3045688647').then(() => {
      
    })
  }
}
