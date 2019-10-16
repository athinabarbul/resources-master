import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product/service/product.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { ProductModel } from '../product/product-model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  id: number;
  product$: Observable<ProductModel>;

  constructor(private route: ActivatedRoute, private productService: ProductService) {

  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.product$ = this.productService.getSpecificProduct(this.id);
  }

}
