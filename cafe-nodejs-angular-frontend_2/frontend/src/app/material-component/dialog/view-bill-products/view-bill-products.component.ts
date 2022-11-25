import { Component, OnInit, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-bill-products',
  templateUrl: './view-bill-products.component.html',
  styleUrls: ['./view-bill-products.component.scss']
})
export class ViewBillProductsComponent implements OnInit {
  displayColumns:string[]=['name','category','price','quantity','total'];
  datasource:any;
  data:any;
  responseMessage:any;
  constructor(@Inject(MAT_DIALOG_DATA)
  public dialogData:any,
  public dialogRef:MatDialogRef<ViewBillProductsComponent>) { }

  ngOnInit() {
    this.data =this.dialogData.data;
    this.datasource=JSON.stringify(this.dialogData.data.productDetail);
  }
}
