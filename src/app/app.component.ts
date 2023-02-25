import {Component, OnInit , ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EmpAddEditComponent} from "./emp-add-edit/emp-add-edit.component";
import {EmployeeService} from "./services/employee.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] =
    [
      'id',
      'firstName',
      'lastName',
      'email',
      'dob' ,
      'gender',
      'education',
      'company',
      'exp',
      'package',
      'action'
    ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title: string | undefined;
  constructor(private dialog: MatDialog, private empService: EmployeeService) {
  }

ngOnInit() {
    this.getEmployeeList();
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditForm() {
    this.dialog.open(EmpAddEditComponent).afterClosed().subscribe({
      next: ()=>{
        this.getEmployeeList()
      }
    })

  }

  getEmployeeList() {
    this.empService.getEmployeeList().subscribe({
      next : (res) => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.sort=this.sort
        this.dataSource.paginator = this.paginator

      },
      error: console.log
    })
  }

  deleteEmployee(id : number){
    this.empService.deleteEmployee(id).subscribe({
      next : (res)=>{
        alert("Employee Deleted Successfully")
        this.getEmployeeList()
      },
      error : console.log
    })
  }
  }

