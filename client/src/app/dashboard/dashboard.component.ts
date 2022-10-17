import { GlobalConstants } from './../shared/constant/global-constant';
import { SnakbarService } from './../services/snack/snakbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from './../services/dashboard/dashboard.service';
import { Component, AfterViewInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  data:any
  responseMessage:any
	ngAfterViewInit() { }

	constructor(private dashboardService:DashboardService,private ngxService:NgxUiLoaderService,private snackbarService:SnakbarService) {
    this.ngxService.start()
    this.dashboardData()
	}
  dashboardData(){
    this.dashboardService.getDetails().subscribe((response:any)=>{
      this.ngxService.stop()
      this.data = response;
    },(error:any)=>{
      this.ngxService.stop()
      console.log(error)
      if(error.error?.message){
        this.responseMessage=error.error?.message
      } else{
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error)
    })
  }
}
