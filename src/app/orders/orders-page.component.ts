import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerService } from '../app-data/customer.service';
import { OrderService } from '../app-data/order.service';
import { ProductService } from '../app-data/product.service';
import { Customer } from '../models/customer.interface';
import { Order } from '../models/order.interface';

@Component({
  template: `
    <select (change)="onCustomerSelected($event)">
      <option value="-1"></option>
      <option *ngFor="let customer of (customers$ | async)" [value]="customer.id"
              [selected]="customer.id == (selectedCustomer$ | async) ? 'selected' : ''">{{ customer.name }}</option>
    </select>
    <table>
      <thead>
        <th>Order Id</th>
        <th>Customer Name</th>
        <th>Order Date</th>
        <th>Product Name</th>
      </thead>
      <tbody>
        <tr *ngFor="let order of (displayOrders$ | async)">
          <td>{{ order.id }}</td>
          <td>{{ getCustomerName(order.customerId) | async }}</td>
          <td>{{ order.date | date:'dd/MM/yyyy' }}</td>
          <td>{{ getProductName(order.productId) | async }}</td>
        </tr>
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPageComponent implements OnInit {
  displayOrders$: Observable<Order[]> = new Observable();
  customers$: Observable<Customer[]> = new Observable();
  selectedCustomer$: Observable<number> = new Observable();

  constructor(
    private readonly orderService: OrderService,
    private readonly customerService: CustomerService,
    private readonly productService: ProductService) { }

  ngOnInit(): void {
    this.displayOrders$ = this.orderService.orders$;
    this.customers$ = this.customerService.customers$;
    this.selectedCustomer$ = this.customerService.selectedCustomerId$;
  }

  getCustomerName(customerId: number): Observable<string> {
    return this.customerService.getCustomerName(customerId);
  }

  getProductName(productId: number): Observable<string> {
    return this.productService.getProductName(productId);
  }

  onCustomerSelected(event: Event): void {
    const customerId = (event.target as HTMLInputElement).value;
    this.customerService.setSelectedCustomer(customerId);
  }
}
