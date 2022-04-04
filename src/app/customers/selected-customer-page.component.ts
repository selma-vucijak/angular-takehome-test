import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerService } from '../app-data/customer.service';
import { Customer } from '../models/customer.interface';

@Component({
  template: `
    <ul *ngIf="(customer$ | async) as customer">
      <li>Customer Id: {{ customer.id }}</li>
      <li>Customer Name: {{ customer.name }}</li>
      <li>Customer Address: {{ customer.address }}</li>
      <li>Customer City: {{ customer.city }}</li>
      <li>Customer Country: {{ customer.country }}</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedCustomerPageComponent implements OnInit {
  customer$: Observable<Customer | undefined> = new Observable();

  constructor(private readonly customerService: CustomerService) { }

  ngOnInit(): void {
      this.customer$ = this.customerService.selectedCustomer$;
  }
}
