import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  public isAuthenticated():any{
     const token = localStorage.getItem('token');
     if(!token){
      this.router.navigate(['/'])
     } else{
      return true
     }
  }
}
