import { GlobalConstants } from './../../shared/constant/global-constant';
import { SnakbarService } from './../snack/snakbar.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import jwt_decode from 'jwt-decode'
@Injectable({
  providedIn: 'root'
})
export class RouteGaurdService {

  constructor(public auth:AuthService,public router:Router,private snackbarService:SnakbarService) { }

  canActivate(route:ActivatedRouteSnapshot):boolean{
    let expectedRoleArray = route.data
    expectedRoleArray = expectedRoleArray.expectedRole;
    const token:any =localStorage.getItem('token')
    var tokenPayload:any;
    try {
      tokenPayload = jwt_decode(token)
    } catch (error) {
      localStorage.clear();
      this.router.navigate(['/'])
    }
    let checkRole = false
    for(let i=0;i<expectedRoleArray.length;i++){
      if(expectedRoleArray[i]===tokenPayload.role){
        checkRole=true;
      }
    }
    if(tokenPayload.role==='user' || tokenPayload.role==='admin'){
      if(this.auth.isAuthenticated() && checkRole){
        return true
      }
      this.snackbarService.openSnackBar(GlobalConstants.unauthorized,GlobalConstants.error)
      this.router.navigate(['/cafe/dashboard'])
      return false
    }
    else{
      this.router.navigate(['/'])
      localStorage.clear()
      return false
    }
  }
}
