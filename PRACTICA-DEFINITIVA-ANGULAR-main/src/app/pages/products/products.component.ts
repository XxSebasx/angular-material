import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { IProduct } from '../../models/product.model';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-products',
    imports: [CommonModule, MatTableModule, MatButtonModule],
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList: IProduct[] = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'details'];
  private _apiService = inject(ApiService);
  private _router = inject(Router);

  ngOnInit(): void {
    this._apiService.getProducts().subscribe((data: IProduct[]) => {
      console.log(data);
      this.productList = data;
    });
  }

  navegate(id: string): void {
    this._router.navigate(['/products', id]);
  }

  trackById(index: number, product: IProduct): string {
    return product.id;
  }
}
