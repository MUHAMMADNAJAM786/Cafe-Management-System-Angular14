import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from 'src/app/snackbar.service';
import { CategoryComponent } from '../dialog/category/category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
displayColumns:string[]=['name','edit'];
datasource:any;
responseMessage:any;
  constructor(
    private categoryService:CategoryService,
    //private ngxservice:Ngxuiloaderservice
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router
  ) { }

  ngOnInit(): void {
    //this.ngxservice.start();
    this.tableData();

  }
  tableData(){
    //missngx
  this.categoryService.getCategory().subscribe((response:any)=>{
    this.datasource=new MatTableDataSource(response);

  },(error:any)=>{
//missngx
  if(error.error?.message)
  {
    this.responseMessage=error.error?.message;
  }
  else{
    this.responseMessage=GlobalConstants.genericError;
  }
  this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
  })
  }

  applyFilter(event:Event)
  {
    const filterValue=(event.target as HTMLInputElement).value;
    this.datasource.filter=filterValue.trim().toLowerCase();
  }
  handleAddAction()
{
  const dialogConfig= new MatDialogConfig();
  dialogConfig.data={
    action:"Add"
  }
  dialogConfig.width="850px";
  const dialogRef=this.dialog.open(CategoryComponent,dialogConfig);
  this.router.events.subscribe(()=>{
    dialogRef.close();
  });
  const sub = dialogRef.componentInstance.onAddCategory.subscribe(
    (response)=>{
      this.tableData();

  })
}
handleEditAction(values:any){
  const dialogConfig= new MatDialogConfig();
  dialogConfig.data={
    action:"Edit",
    data:values
  }
  dialogConfig.width="850px";
  const dialogRef=this.dialog.open(CategoryComponent,dialogConfig);
  this.router.events.subscribe(()=>{
    dialogRef.close();
  });
  const sub = dialogRef.componentInstance.onAddCategory.subscribe(
    (response)=>{
      this.tableData();

  })
}
}
