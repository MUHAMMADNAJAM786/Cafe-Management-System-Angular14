import { Component, EventEmitter, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/category.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
onAddCategory= new EventEmitter();
onEditCategory=new EventEmitter();
categoryForm:any;
dialogAction:any="Add";
action:any="Add";
responseMessage:any;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formbuilder:FormBuilder,private categoryService:CategoryService,
  public dialogRef:MatDialogRef<CategoryComponent>,
  private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.categoryForm=this.formbuilder.group({
      name:[null,[Validators.required]]
    });
    if(this.dialogData.action === 'Edit')
    {
      this.dialogAction='Edit';
      this.action="update";
      this.categoryForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit()
  {
    if(this.dialogAction==="Edit")
    {
      this.Edit();
    }
    else{
      this.add();
    }
  }
  add()
  {
 var formData=this.categoryForm.value;
 var data={
  name:formData.name
 }
 this.categoryService.add(data).subscribe((response:any)=>{
  this.dialogRef.close();
  this.onAddCategory.emit();
  this.responseMessage=response.message;
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
  Edit()
  {
    var formData=this.categoryForm.value;
 var data={
  id:this.dialogData.data.id,
  name:formData.name
 }
 this.categoryService.update(data).subscribe((response:any)=>{
  this.dialogRef.close();
  this.onEditCategory.emit();
  this.responseMessage=response.message;
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
