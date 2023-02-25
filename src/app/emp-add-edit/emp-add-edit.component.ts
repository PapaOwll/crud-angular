import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../services/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup
  education: string[] = [
    "Elementary", 'Diploma', "Graduate", "Ma", "PHD",
  ];

  constructor(private _fb: FormBuilder,
              private empService: EmployeeService,
              private dialog: MatDialogRef<EmpAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      exp: '',
      package: '',
    })
  }

  formSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.empService.updateEmployee(this.empForm.value , this.data.id ).subscribe({
          next : (val) => {
            console.log(val)
            alert("Employee Updated Successfully")
            this.dialog.close(true)

          },
          error :(err) => {
            console.log(err)
          }
        })
      }
      else {
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: () => {
            alert("Employee Added Successfully")
            this.dialog.close(true)

          },
          error: (err) => {
            console.log(err)
          }
        })
      }

    }
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }
}
