import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  currentProduct = {
    name: "Iphone XS",
    category: "Electronics",
    price: "500000$",
    imageUrl: "https://images.idgesg.net/images/article/2018/09/iphone-xs-sizes-100771828-large.jpg",
    description: "Apple’s new phone comes in two sizes: the iPhone XS, with a 5.8-inch display, and the iPhone XS Max, with a 6.5-inch display. It has the same sharpness, at 458 pixels per inch, which gives it a resolution of 2688 x 1242. The iPhone XS and XS Max began preorders on September 14 from a variety of retail stores and carriers. They ship, and appear in stores, on September 17. If you want their less expensive cousin--the iPhone XR--you’ll have to wait October 19 to preorder and October 26 to get it. That iPhone XS Max is about the same size as the iPhone 7 Plus or 8 Plus, only with a much bigger edge-to-edge display. In other words, if you love big phones, you now have a big iPhone X. "
  };

  constructor() { }

  ngOnInit() {
  }

}
