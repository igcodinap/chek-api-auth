export class User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    jwt_token?: string;
    constructor(id: number, name: string, lastname: string, email: string, password: string, jwt_token: string) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.jwt_token = jwt_token;
    }
}