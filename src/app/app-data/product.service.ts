import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { AppDataState } from './app-data.state';


@Injectable({ providedIn: 'root' })
export class ProductService {
    products$: Observable<Product[]> = this.state.state$.pipe(map(state => state.products));

    getProductName = (productId: number): Observable<string> =>
        this.products$.pipe(
            map(products => products.find(p => p.id === productId) as Product),
            map(product => product?.name)
        );

    constructor(private readonly state: AppDataState) {
    }
}
