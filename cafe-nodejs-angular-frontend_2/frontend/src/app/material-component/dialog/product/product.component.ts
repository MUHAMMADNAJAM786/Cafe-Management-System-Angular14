import { Inject, inject } from '@angular/core';
import { Component, OnInit,EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from 'src/app/snackbar.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
onADDproduct =new EventEmitter();
onEditProduct=new EventEmitter();

producForm:any =FormGroup;
dialogAction:any="Add";
action:any="Add";
responseMessage:any;
categorys:any =[];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formbuilder:FormBuilder,
  private ProductService:ProductService,
  public dialogRef:MatDialogRef<ProductComponent>,
  private snackbarService:SnackbarService,
  private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.producForm =this.formbuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId:[null,Validators.required],
   price:[null,Validators.required],
     description:[null,Validators.required]

    })

    if(this.dialogData.action === 'Edit')
    {
      this.dialogAction="Edit";
      this.action="Update";
      this.producForm.patchValue(this.dialogData.data);
    }
   this.getCategroy();
  }

  getCategroy()
  {
    this.categoryService.getCategory().subscribe((response:any)=>{
    this.categorys =response;

    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }
      else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  handleSubmit()
  {
    if(this.dialogAction === 'Edit')
    {
      this.edit();
    }
    else{
      this.add();
    }
  }
  add()
  {
 var formData =this.producForm.value;
 var data ={
   name:formData.name,
   categoryId: formData.categoryId,
   price:formData.price,
   description: formData.description,
  
 }
 this.ProductService.add(data).subscribe((response:any)=>{
  this.dialogRef.close();
  this.onADDproduct.emit();
  this.responseMessage=response.message;
  this.snackbarService.openSnackBar(this.responseMessage,"success");
 },(error:any)=>{
  if(error.error?.message){
    this.responseMessage=error.error?.message;
  }
  else{
    this.responseMessage=GlobalConstants.genericError;
  }
  this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
 })
  }
  edit()
  {
    var formData =this.producForm.value;
    var data ={
      id:this.dialogData.data.id,
      name:formData.name,
      categoryId: formData.categoryId,
      price:formData.price,
      description: formData.description,
     
    }
    this.ProductService.update(data).subscribe((response:any)=>{
     this.dialogRef.close();
    this.onEditProduct.emit();
     this.responseMessage=response.message;
     this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
     if(error.error?.message){
       this.responseMessage=error.error?.message;
     }
     else{
       this.responseMessage=GlobalConstants.genericError;
     }
     this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }
}
