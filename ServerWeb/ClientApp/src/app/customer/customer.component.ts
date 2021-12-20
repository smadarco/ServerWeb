import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})


export class CustomerComponent implements OnInit {
  id: string;
  header: string;
  baseurl: string;
  customers: Customer[];
  customer: Customer = { "Id": "", "idNumber": "", "phone": "", "email": "", "username": "" };

  loading: boolean = false;
  errorMessage;

  constructor(private router: Router, private route: ActivatedRoute, http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private customerService: CustomerService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.baseurl = baseUrl;
  }

  ngOnInit(): void {

    this.loading = true;
    this.errorMessage = "";
    this.header = this.id === "" ? 'Add customer' : 'Edit customer';

    if (this.id != "") {
      this.customerService.onGet(this.baseurl, this.id)
        .subscribe(
          (response) => {
            console.log('response received')
            this.customers = response;
            this.customer = this.customers[0];
          },
          (error) => {
            console.error('Request failed with error')
            this.errorMessage = error;
            this.loading = false;
          },
        )
    }
    else
    {
      this.customer = 
        { "Id": "", "idNumber": "", "phone": "", "email": "", "username": "" }
     
    }
    
    }
      

  onSubmit(form: NgForm) {
    this.customers = [{
      Id: this.id,
      "idNumber": form.value.idNumber, "phone": form.value.phone
      , "email": form.value.email, "username": form.value.username
    }]
    this.customerService.onEditOrAdd(this.baseurl, this.customers);
    setTimeout(() => {
      this.router.navigateByUrl('fetch-data');
    },
      2000);
   

  }
}


export interface Customer {
  Id: string;
  idNumber: string;
  username: string;
  email: string;
  phone: string;
}
