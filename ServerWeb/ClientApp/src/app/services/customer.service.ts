import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  public customers: Customer[];
  httpc: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.httpc = http;

  }

 /* GetAll(baseUrl): Observable<any> {
    return this.httpc.get<Customer[]>(baseUrl + 'customers');
  }*/

  onGet(baseUrl, id: string): Observable<any> {
    return this.httpc.get<Customer[]>(baseUrl + 'Getby/' + id);

  }


  onEditOrAdd(baseUrl, customer: Customer[]) {
    this.httpc.post<Customer[]>(baseUrl + 'customers', customer).subscribe(result => {
    }, error => console.error(error));
  }


  onDelete(baseUrl, id: string): Observable<any> {
    return this.httpc.delete<Customer[]>(baseUrl + 'delete/' + id);
  }


}
export interface Customer {
  //Id: string;
  idNumber: string;
  username: string;
  email: string;
  birthdate: string;
}
