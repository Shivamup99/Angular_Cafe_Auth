import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   url = environment.apiurl
  constructor(private httpClient:HttpClient) { }

  register(data:any){
    return this.httpClient.post(this.url+"/auth/register",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  login(data:any){
    return this.httpClient.post(this.url+'/auth/login',data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    })
  }

  checkToken(){
    return this.httpClient.get(this.url+'/auth/checkToken');
  }
}
