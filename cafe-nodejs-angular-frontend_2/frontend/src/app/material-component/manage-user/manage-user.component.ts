import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from 'src/app/snackbar.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  displayColumns:string[]=['name','email','contactNumber','status'];
datasource:any;
responeMessage:any;
  constructor(private userService:UserService,
    private snackbarService:SnackbarService ) { }

  ngOnInit(): void {
    this.tableData()
  }
tableData(){
  this.userService.getUsers().subscribe((response:any)=>{
    this.datasource = new MatTableDataSource(response)
  },(error:any)=>{
    if(error.error.messase){
      this.responeMessage=error.error?.message;
    }
    else{
      this.responeMessage = GlobalConstants.genericError;
    }
    this.snackbarService.openSnackBar(this.responeMessage,GlobalConstants.error);
  })

}
applyFilter(event:Event){
const filterValue =(event.target as HTMLInputElement).value;
this.datasource.filter =filterValue.trim().toLowerCase();
}
handleChangeAction(status:any,id:any){
  var data = {
    status:status.toString(),
    id:id
}
this.userService.update(data).subscribe((response:any)=>{
  this.responeMessage=response?.message;
  this.snackbarService.openSnackBar(this.responeMessage,"success");
},(error:any)=>{


  if(error.error.messase){
    this.responeMessage=error.error?.message;
  }
  else{
    this.responeMessage = GlobalConstants.genericError;
  }
  this.snackbarService.openSnackBar(this.responeMessage,GlobalConstants.error);
})
}

}
