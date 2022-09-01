import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SmsService } from './services/sms.service';
import { BdService } from './services/bd.service'

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
  MultiTelefono : string = ''
  Mensaje : string = ''

  constructor(private sms : SmsService, private bd : BdService,  private cdref : ChangeDetectorRef){}

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

  addmultiphone(){
    this.MultiTelefono.replace(/\n/g,' ')
    this.ListTelefonos = this.MultiTelefono.split(/\r\n|\r|\n/, -1)
    console.log(this.ListTelefonos)
    console.log(this.MultiTelefono.split(" "))
  }

 async sendsms(){
  for(const tel of this.ListTelefonos){
    await this.sms.SendSms(tel, this.Mensaje).then(async (res) =>{
      res
   })
  }        
  }

  createbd(){
    this.bd.CreateBd().then((res)=>{})
  }
}
