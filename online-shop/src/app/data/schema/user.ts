import { CartItemModel } from './cart-item-model';

export class UserModel {

    id: number;
    username: string;
    password: string;
    fullName: string;
    roles: string[];
    cart: CartItemModel[];
  
    constructor(id:number, username:string, password:string, fullName: string, roles: string[],
      cart: CartItemModel[]) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.fullName = fullName;
      this.roles = roles;
      this.cart = cart;
    }
    
  }
  