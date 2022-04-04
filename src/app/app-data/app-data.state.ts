import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, lastValueFrom, map, take } from 'rxjs';
import { Customer } from '../models/customer.interface';
import { Order } from '../models/order.interface';
import { Product } from '../models/product.interface';
import { AppDataApiService } from './app-data-api.service';
import { AppData } from './app-data.interface';


@Injectable({ providedIn: 'root' })
export class AppDataState {
    private readonly initialState: AppData = {
        orders: [] as Order[],
        products: [] as Product[],
        customers: [] as Customer[]
    }

    readonly state$: BehaviorSubject<AppData> = new BehaviorSubject(this.initialState);

    async loadInitialState(): Promise<void> {
        const data = await lastValueFrom(combineLatest([
            this.service.orders$,
            this.service.customers$,
            this.service.products$
        ]).pipe(take(1), map(([orders, customers, products]) => ({ orders, products, customers }))));

        this.state$.next(data);
    }

    constructor(private readonly service: AppDataApiService) {
    }
}
