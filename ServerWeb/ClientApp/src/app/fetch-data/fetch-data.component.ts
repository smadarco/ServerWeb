import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})

export class FetchDataComponent implements OnInit {
  customers: Customer[];
  baseurl: string;
  httpc: HttpClient;
  id: string;
  loading: boolean = false;
  errorMessage;


  constructor(private router: Router, private route: ActivatedRoute,private customerService: CustomerService, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.httpc = http;
    this.baseurl = baseUrl;
   
  }

  ngOnInit(): void {
    if (this.id != null) {
      this.customerService.onDelete(this.baseurl, this.id)
        .subscribe(
          (response) => {
            console.log('response received')
            this.httpc.get<Customer[]>(this.baseurl + 'customers').subscribe(result => {
              this.customers = result;
              this.router.navigateByUrl('fetch-data');
            }, error => console.error(error));

          },
          (error) => {
            console.error('Request failed with error')
            this.errorMessage = error;
            this.loading = false;
          },
        )
    }
    else {
      this.httpc.get<Customer[]>(this.baseurl + 'customers').subscribe(result => {
        this.customers = result;
      }, error => console.error(error));
    }

    }
  
}

export interface Customer {
 // Id: string;
  idNumber: string;
  username: string;
  email: string;
  phone: string;
}
