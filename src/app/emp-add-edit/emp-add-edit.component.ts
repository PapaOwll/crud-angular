import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../services/employee.service";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit{
  empForm: FormGroup
 education:string[]=[
   "Elementary",'Diploma',"Graduate","Ma","PHD",
 ];
 constructor(private _fb:FormBuilder ,
             private empService : EmployeeService ,
             private dialog : DialogRef <EmpAddEditComponent>) {
   this.empForm = this._fb.group({
     firstName:'',
     lastName:'',
     email:'',
     dob:'',
     gender:'',
     education:'',
     company:'',
     exp:'',
     package:'',
   })
 }
 formSubmit(){
   if (this.empForm.valid){
   this.empService.addEmployee(this.empForm.value).subscribe({
     next : (val : any) => {
       alert("Employee Added Successfully")
       this.dialog.close();
       this.empService.getEmployeeList()

     },
     error :(err) => {
       console.log(err)
     }
   })
   }
 }

  ngOnInit(): void {

  }
}
