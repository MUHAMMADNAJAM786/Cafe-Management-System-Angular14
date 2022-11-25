import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from 'src/app/snackbar.service';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ProductComponent } from '../dialog/product/product.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  displayColumns:string[]=['name','categoryName','description','price','edit'];
  datasource:any;
  responseMessage:any;
  constructor(private ProductService:ProductService,
    //private ngexservice:ngxuiloaderservice
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,
    
    ) { }

  ngOnInit(): void {
    //ngx missing
    this.tableData();
  }
  tableData(){
    //missngx
  this.ProductService.getProducts().subscribe((response:any)=>{
    this.datasource=new MatTableDataSource(response);

  },(error:any)=>{
//missngx
console.log(error);
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
  const dialogRef=this.dialog.open(ProductComponent,dialogConfig);
  this.router.events.subscribe(()=>{
    dialogRef.close();
  });
  const sub = dialogRef.componentInstance.onADDproduct.subscribe(
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
  const dialogRef=this.dialog.open(ProductComponent,dialogConfig);
  this.router.events.subscribe(()=>{
    dialogRef.close();
  });
  const sub = dialogRef.componentInstance.onEditProduct.subscribe(
    (response)=>{
      this.tableData();

  })
 
}
handleDeleteAction(values:any)
{
  const dialogConfig= new MatDialogConfig();
  dialogConfig.data={
    message:'delete'+values.name+'product'
    
  };
  const dialogRef=this.dialog.open(ConfirmationComponent,dialogConfig);
  const sub= dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any)=>{
    //ngx missing
    this.deleteProduct(values.id);
    dialogRef.close();
  })
}

deleteProduct(id:any){
this.ProductService.delete(id).subscribe((response:any)=>{
  //ngx missing
  this.tableData();
  this.responseMessage =response?.message;
  this.snackbarService.openSnackBar(this.responseMessage,"success");

},(error:any)=>{

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

onChange(status:any,id:any)
{
    var data = {
      status:status.toString(),
      id:id
    }
    this.ProductService.updateStatus(data).subscribe((response:any)=>{
      //ngx missionf
      this.responseMessage=response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
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
}



