import { Component, AfterViewInit } from '@angular/core';

import { DashboardService } from '../dashboard.service';
import { GlobalConstants } from '../shared/global-constants';
import { SnackbarService } from '../snackbar.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
 
	ngAfterViewInit() { }
     responsemessage:any;
	 data:any;
	constructor(private dashboardServices:DashboardService,
		//private ngx	Service:NgxUiLoaderService,
		private  SnackbarService: SnackbarService) {
			//this.ngxService.start();
			this.dashboardData();
	}
	dashboardData()
	{
this.dashboardServices.getDetails().subscribe((response:any)=>{
	//this.ngxService.stop();
	this.data= response;
},(error:any)=>{
	//this.ngxSevice.stop();
	console.log(error);
	if(error.error?.message){
		this.responsemessage=error.error?.message;
	}
	else
	{
		this.responsemessage=GlobalConstants.genericError;
	}
	this.SnackbarService.openSnackBar(this.responsemessage,GlobalConstants.error);
})
	}
}

