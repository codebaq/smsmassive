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
export class BdService {

  url : String = 'http://localhost:3000/'

  constructor(private http : HttpClient) { }

  CreateBd(){
    return new Promise ((resolve,rejects)=> {
      this.http.get(this.url + 'createbd', httpOptions).subscribe(res => {
        return resolve(res)
       })
     })
  }
}
