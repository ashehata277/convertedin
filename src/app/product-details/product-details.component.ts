import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductState } from '../ProductState';
import { select, Store } from '@ngrx/store';
import { productSelectorById } from 'src/states/selector/app-selector';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  productId: number | null = 0;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.has('product-id')) {
        this.productId = Number(params.get('product-id'));
        this.store
          .pipe(select(productSelectorById(this.productId)))
          .subscribe((product) => {
            console.log(product);
            this.product = product;
          });
      }
    });
  }
  getRateStars = (rating: number) => {
    return Array.from({ length: rating }, (v, k) => k + 1);
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<ProductState>
  ) {}
}
