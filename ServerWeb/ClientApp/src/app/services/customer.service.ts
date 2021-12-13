import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  public customers: Customer[];
  httpc: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.httpc = http;

  }


  onGet(baseUrl, id: Number) {

    this.httpc.get<Customer[]>(baseUrl + 'Getby/' + id).subscribe(result => {
      this.customers = result;
      return this.customers;

    }, error => console.error(error));
    return this.customers;
  }


  onAdd(baseUrl, customer: Customer) {
    this.httpc.post<Customer[]>(baseUrl + 'customers', customer).subscribe(result => {
      this.customers = result;
    }, error => console.error(error));
  }

  onEdit(baseUrl, customer: Customer) {
    this.httpc.post<Customer[]>(baseUrl + 'customers', customer).subscribe(result => {
      this.customers = result;
    }, error => console.error(error));
  }


  onDelete(baseUrl, id: Number) {
    this.httpc.post<Customer[]>(baseUrl + 'customers', id).subscribe(result => {
      this.customers = result;
    }, error => console.error(error));
  }

}


export interface Customer {
  IdNumber: number;
  Username: string;
  Email: string;
  Birthdate: string;
}
