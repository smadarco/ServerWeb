import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})


export class CustomerComponent implements OnInit {
  id: Number;
  header: string;
  //customers: Customer[];
  baseurl: string;

  customer: Customer[] =
    [{
      IdNumber: 0,
      Username: '',
      Email: '',
      Birthdate: ''
    }]


  constructor(private router: Router, private route: ActivatedRoute, http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private customerService: CustomerService) {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.baseurl = baseUrl;

  }

  ngOnInit(): void {

    this.header = this.id === 0 ? 'Add customer' : 'Edit customer';

    if (this.id != 0) {
      this.customer = this.customerService.onGet(this.baseurl, this.id);
      console.log(this.customer);
    }
  }


  onSubmit(form: NgForm) {
    var customer: Customer = {
      IdNumber: form.value.IdNumber,
      Username: form.value.Username,
      Email: form.value.Email,
      Birthdate: form.value.Birthdate,

    }
    console.log(form.value);
    if (this.id != 0)
      this.customerService.onEdit(this.baseurl, customer);
    else
      this.customerService.onAdd(this.baseurl, customer);
    this.router.navigateByUrl('fetch-data');

  }
}


export interface Customer {
  IdNumber: number;
  Username: string;
  Email: string;
  Birthdate: string;
}
