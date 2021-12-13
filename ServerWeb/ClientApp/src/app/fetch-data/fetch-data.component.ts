import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})

export class FetchDataComponent implements OnInit {
  customers: Customer[];
  baseurl: string;

  constructor(private customerService: CustomerService, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.baseurl = baseUrl;
    http.get<Customer[]>(baseUrl + 'customers').subscribe(result => {
      this.customers = result;
    }, error => console.error(error));
  }

  ngOnInit(): void {

  }


  onDelete(id: Number) {
    this.customerService.onDelete(this.baseurl, id);
  }
}


export interface Customer {
  IdNumber: number;
  Username: string;
  Email: string;
  Birthdate: string;
}
