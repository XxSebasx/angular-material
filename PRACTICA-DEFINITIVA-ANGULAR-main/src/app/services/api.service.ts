import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _http = inject(HttpClient);
  private urlBase: string = 'https://api.mercadolibre.com/sites/MLA/search?q=malabares';

  getProducts(): Observable<IProduct[]> {
    return this._http.get<{ results: any[] }>(this.urlBase).pipe(
      map(response => response.results.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.title, // La API de MercadoLibre no tiene descripción, así que usamos el título
        image: item.thumbnail
      })))
    );
  }

  getProduct(id: string): Observable<IProduct> {
    return this._http.get<any>(`https://api.mercadolibre.com/items/${id}`).pipe(
      map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.title, // La API de MercadoLibre no tiene descripción, así que usamos el título
        image: item.thumbnail
      }))
    );
  }
}
