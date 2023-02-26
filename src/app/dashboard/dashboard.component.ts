import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeService} from "../services/employee.service";
import {CoreService} from "../core/core.service";
import {EmpAddEditComponent} from "../emp-add-edit/emp-add-edit.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] =
    [
      'id',
      'firstName',
      'lastName',
      'email',
      'dob',
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

  constructor(
    private dialog: MatDialog,
    private empService: EmployeeService,
    private coreService: CoreService) {
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

  openAddForm() {
    this.dialog.open(EmpAddEditComponent).afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList()
        }
      }
    })

  }

  openEditForm(data: any) {
    this.dialog.open(EmpAddEditComponent, {data}).afterClosed().subscribe({
      next: (val) => {
        if (val) {
          console.log(val)
          this.getEmployeeList()
        }
      }
    })

  }

  getEmployeeList() {
    this.empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator

      },
      error: console.log
    })
  }

  deleteEmployee(id: number) {
    this.empService.deleteEmployee(id).subscribe({
      next: (res) => {

        this.coreService.openSnackBar("Employee Deleted Successfully", 'Done')
        this.getEmployeeList()
      },
      error: console.log
    })
  }

}
