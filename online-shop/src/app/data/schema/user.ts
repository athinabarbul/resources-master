import { CartItemModel } from './cart-item-model';
import { Role } from "./role";

export class UserModel {
    username: string;
    fullName: string;
    roles: Role;
    cart: CartItemModel[];

    constructor(username:string, fullName: string, roles: Role,
      cart: CartItemModel[]) {
      this.username = username;
      this.fullName = fullName;
      this.roles = roles;
      this.cart = cart;
    }
    
  }
  