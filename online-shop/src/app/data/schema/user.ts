import { CartItemModel } from './cart-item-model';
import { Role } from "./role";

export class UserModel {

    id: number;
    username: string;
    password: string;
    fullName: string;
    roles: Role;
    cart: CartItemModel[];
    token?: string;
  
    constructor(id:number, username:string, password:string, fullName: string, roles: Role,
      cart: CartItemModel[], token?:string) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.fullName = fullName;
      this.roles = roles;
      this.cart = cart;
      this.token = token;
    }
    
  }
  