import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private  http : HttpClient) { }
  addEmployee( data : any) :  Observable <any>{
    return this.http.post('http://localhost:3000/posts' , data)
  }
  getEmployeeList() :  Observable <any>{
    return this.http.get('http://localhost:3000/posts')
  }
  deleteEmployee(id : number) :Observable<any>{
    return  this.http.delete(`http://localhost:3000/posts/${id}`)
  }
  updateEmployee(data : any , id : any) : Observable<any>{
    return this.http.put(`http://localhost:3000/posts/${id}` , data )
  }
}
