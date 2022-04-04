import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Order } from '../models/order.interface';
import { AppDataState } from './app-data.state';
import { CustomerService } from './customer.service';


@Injectable({ providedIn: 'root' })
export class OrderService {
    orders$: Observable<Order[]>;

    constructor(private readonly appState: AppDataState, private readonly customerService: CustomerService) {
        this.orders$ = combineLatest([
            this.appState.state$,
            this.customerService.selectedCustomerId$
        ]).pipe(map(([state, selectedCustomerId]) => {
            return selectedCustomerId !== -1 ? state.orders.filter(o => o.customerId === selectedCustomerId) : state.orders
        }));
    }
}
