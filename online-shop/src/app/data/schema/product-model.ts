export class ProductModel {
  id: number;
  name: string;
  category?: string;
  price: number;
  image?: string;
  description?: string;

  constructor(id:number, name:string, category: string, price:number, image: string, description: string) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.image = image;
    this.price = price;
    this.description = description;
  }

}
