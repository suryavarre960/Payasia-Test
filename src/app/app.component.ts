import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewUserComponent } from './view-user/view-user.component';
import { EmployeeService } from './services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from './Common/iusers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  Udata:any;
  selectedRows: Set<number> = new Set();
  displayedColumns: string[] = ['select','id', 'name', 'username', 'email','action'];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }



  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
         this.Udata= res
        this.dataSource = new MatTableDataSource(this.Udata);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ViewUserComponent, {
      height: '60%',
      width: '50%',
      data
    });
  }

  onSelectAllChange(event: any): void {
    if (event.checked) {
      this.dataSource.data.forEach(row => this.selectedRows.add(row.id));
    } else {
      this.selectedRows.clear();
    }
  }
  onRowCheckboxChange(row: any, event: any): void {
    if (event.checked) {
      this.selectedRows.add(row.id);
    } else {
      this.selectedRows.delete(row.id);
    }
  }

  isRowSelected(row: any) {
   return this.selectedRows.has(row.id);
  }
}
