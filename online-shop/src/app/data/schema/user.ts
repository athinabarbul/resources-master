export class UserModel {

    id: number;
    username: string;
    password: string;
    fullName: string;
    roles: string[];
  
    constructor(id:number, username:string, password:string, fullName: string, roles: string[]) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.fullName = fullName;
      this.roles = roles;
    }
    
  }
  