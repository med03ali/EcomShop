export class User{
    name : string;
    lastname : string;
    email : string;
    age : number;
    password : string;
    profilePicture='';



    constructor(name: string ,lastname: string, age: number , password: string,email:string){
        this.name=name;
        this.lastname=lastname;
        this.age=age;
        this.password=password;
        this.email=email;
    }


}