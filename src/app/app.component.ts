import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppDataState } from './app-data/app-data.state';
import { Order } from './models/order.interface';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="orders">Orders</a> |
      <a routerLink="customer">Customer</a>
    </nav>

    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  orders$: Observable<Order[]> = new Observable();

  constructor(private readonly state: AppDataState) { }

  async ngOnInit(): Promise<void> {
    await this.state.loadInitialState();
  }
}
