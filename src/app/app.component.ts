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
  loading : boolean = true
  ShowQr : boolean = false
  Login : boolean = false
  ListTelefonos : any [] = []
  Telefono : string = ''
  Mensaje : string = ''

  constructor(private sms : SmsService, private cdref : ChangeDetectorRef){}

  ngOnInit(): void {
    this.sms.GetQr().then(async (res : any) => {
      this.QrImg = await res.res    
        this.loading = false
        this.ShowQr = true
      this.sms.DetectUrl().then(async (res:any) => {        
        this.Login = true
        this.ShowQr = false
      })     
    })    
  }

  addphone(){
    this.ListTelefonos.push(this.Telefono)
    this.Telefono = ''
  }

 async sendsms(){
  for(const tel of this.ListTelefonos){
    await this.sms.SendSms(tel, this.Mensaje).then(async (res) =>{
      res
   })
  }        
  }
}
