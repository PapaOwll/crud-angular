import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent {
  empForm: FormGroup
 education:string[]=[
   "Elementry",'Diploma',"Graduate","Ma","PHD",
 ];
 constructor(private _fb:FormBuilder) {
   this.empForm = this._fb.group({
     firstName:'',
     lastName:'',
     email:'',
     dob:'',
     gender:'',
     education:'',
     company:'',
     experiance:'',
     package:'',
   })
 }
 formSubmit(){
   if (this.empForm.valid){
     console.log(this.empForm.value)
   }
 }
}