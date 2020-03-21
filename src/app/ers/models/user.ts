import {UserRole} from "./userRole"
export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    constructor(username : string, password : string, firstName : string, lastName : string, email : string, role : UserRole){
        this.id = 0;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }
}