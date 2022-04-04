import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Customer } from '../models/customer.interface';
import { Order } from '../models/order.interface';
import { Product } from '../models/product.interface';

@Injectable({ providedIn: 'root' })
export class AppDataApiService {
  products$: Observable<Product[]> = this.http.get<Product[]>('api/products')
    .pipe(tap(() => console.log('Products api called')));

  customers$: Observable<Customer[]> =
    this.http.get<Customer[]>('api/customers').pipe(tap(() => console.log('Customers api called')));

  orders$: Observable<Order[]> = this.http.get<Order[]>('api/orders')
    .pipe(tap(() => console.log('Orders api called')));

  constructor(private http: HttpClient) { }
}
