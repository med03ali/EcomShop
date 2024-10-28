import { User } from "./User";

export class Comment{
    productId : number;
    user : User;
    date : Date;
    comment : string;
    rating : number;



    constructor( productId : number ,user : User ,date : Date ,comment: string ,rating: number){
        this.productId = productId;
        this.user=user;
        this.date=date;
        this.comment=comment;
        this.rating=rating;
    }
}

