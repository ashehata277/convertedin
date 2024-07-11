import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getProducts } from 'src/states/action/app-action';
import { productSelector } from 'src/states/selector/app-selector';
import { ProductState } from './ProductState';
import { interval, switchMap } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'converted.in-assignment';
  product: ProductState | null = null;
  categoryList: Set<string> = new Set();
  brandList: Set<string> = new Set();
  defaultPageSize = 48;
  pages = [1, 2, 3, 4, 5];
  currentProducts: any[] = [];
  focusedPage: number = 1;
  selectedCat: string = '';
  selectedBrand: string = '';
  selectedRate: number = 0;
  selectedPrice: number = 0;
  searchText: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;
  minRate: number = 0;
  maxRate: number = 0;
  showTooltipPrice = false;
  showTooltipRate = false;
  tooltipPositionPrice = 0;
  tooltipPositionRate = 0;
  clear = () => {
    this.selectedCat = '';
    this.selectedBrand = '';
    this.searchText = '';
    this.search();
  };
  categoryChanged = (selectedCat: string) => {
    this.selectedCat = selectedCat;
    this.search();
  };
  brandChanged = (selectedBrand: string) => {
    this.selectedBrand = selectedBrand;
    this.search();
  };

  changePage = (page: number) => {
    console.log(page);
    this.focusedPage = page;
    this.search();
  };
  nextPage = () => {
    if (this.focusedPage != this.pages[this.pages.length - 1]) {
      this.focusedPage++;
      this.search();
    }
  };
  previousPage = () => {
    if (this.focusedPage != this.pages[0]) {
      this.focusedPage--;
      this.search();
    }
  };

  search = () => {
    this.currentProducts = this.product?.products ?? [];
    if (this.selectedCat) {
      this.currentProducts = this.currentProducts.filter(
        (a) => a.category == this.selectedCat
      );
    }
    if (this.selectedBrand) {
      this.currentProducts = this.currentProducts.filter(
        (a) => a.brand == this.selectedBrand
      );
    }

    if (this.searchText) {
      this.currentProducts = this.currentProducts.filter(
        (a) =>
          a.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
          a.description.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    this.currentProducts = this.currentProducts.slice(
      (this.focusedPage - 1) * this.defaultPageSize,
      this.focusedPage * this.defaultPageSize
    );
  };

  constructor(private store: Store<ProductState>) {
    this.store.pipe(select(productSelector)).subscribe((data) => {
      this.product = data;
      this.currentProducts = this.product.products.slice(
        0,
        this.defaultPageSize
      );
      this.categoryList = new Set(
        this.product.products.map((product: any) => product.category)
      );
      this.brandList = new Set(
        this.product.products.map((product: any) => product.brand)
      );
      this.minPrice = Math.min(
        ...(this.product.products.flatMap((a) => a.price) as number[])
      );
      this.maxPrice = Math.max(
        ...(this.product.products.flatMap((a) => a.price) as number[])
      );
      this.minRate = Math.min(
        ...(this.product.products.flatMap((a) => a.rate) as number[])
      );
      this.maxRate = Math.max(
        ...(this.product.products.flatMap((a) => a.rate) as number[])
      );
      const totalPages = Math.ceil(this.product.products.length / this.defaultPageSize);

      this.pages = Array.from({ length: totalPages }, (v, k) => k + 1);
    });
    interval(900000)
      .pipe(
        switchMap(() => {
          this.store.dispatch(getProducts());
          return [];
        })
      )
      .subscribe();
    this.store.dispatch(getProducts());
  }

  onMouseMovePrice(event: MouseEvent): void {
    const target = event.target as HTMLInputElement;
    const rect = target.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    this.tooltipPositionPrice = offsetX;
    this.showTooltipPrice = true;
  }
  onMouseMoveRate(event: MouseEvent): void {
    const target = event.target as HTMLInputElement;
    const rect = target.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    this.tooltipPositionRate = offsetX;
    this.showTooltipRate = true;
  }

  onMouseOutPrice(): void {
    this.showTooltipPrice = false;
  }
  onMouseOutRate(): void {
    this.showTooltipRate = false;
  }
}
