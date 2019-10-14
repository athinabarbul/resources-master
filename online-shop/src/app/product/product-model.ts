export class ProductModel {

  id: number;
  name: string;
  category?: string;
  price: number;
  imageUrl?: string;
  description?: string;

  constructor(id:number, name:string, category: string, price:number, imageUrl: string, description: string) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

}
