import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Customer } from '../models/customer.interface';
import { AppDataState } from './app-data.state';


@Injectable({ providedIn: 'root' })
export class CustomerService {
    customers$: Observable<Customer[]> = this.state.state$.pipe(map(state => state.customers));
    selectedCustomerId$: BehaviorSubject<number> = new BehaviorSubject(-1);
    selectedCustomer$: Observable<Customer | undefined>;

    getCustomerName = (customerId: number): Observable<string> =>
        this.customers$.pipe(
            map(customers => customers.find(c => c.id === customerId) as Customer),
            map(customer => customer?.name)
        );

    setSelectedCustomer(customerId: string): void {
        this.selectedCustomerId$.next(Number(customerId));
    }

    constructor(private readonly state: AppDataState) {
        this.selectedCustomer$ = combineLatest([
            this.customers$,
            this.selectedCustomerId$
        ]).pipe(map(([customers, selectedId]) => customers.find(c => c.id === selectedId)));
    }
}
