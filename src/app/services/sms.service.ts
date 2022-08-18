import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Authorization':'authkey',
    'userid':'1',
    "Content-Type": "application/json",        
  }),  
};

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  url : String = 'http://localhost:3000/'

  constructor(private http : HttpClient) { }

  GetQr(){
    return new Promise ((resolve,rejects)=> {
      this.http.get(this.url + 'getqr', httpOptions).subscribe(res => {
        return resolve( res)
       })
     })
  }

  DetectUrl(){
    return new Promise ((resolve,rejects)=> {
      this.http.get(this.url + 'listenurl', httpOptions).subscribe(res => {
        return resolve( res)
       })
     })
  }

  SendSms(phone : any, mensaje : any){
    return new Promise ((resolve,rejects)=> {
      this.http.get(this.url + 'sendsms', {params : { 'tel': phone, 'sms' : mensaje}, headers : httpOptions.headers } ).subscribe(res => {
        return resolve( res)
       })
     })
  }
}
