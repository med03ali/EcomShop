import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private firestore: Firestore) {}
  


  addProduct(name:string,price:number,description:string){
    const productData : any = { name : name , price : price , description : description}
    const collectionInstance = collection(this.firestore,'products')
    addDoc(collectionInstance,productData)
    .then(()=>console.log("data saved successfuly"))
    .catch(error=>console.log(error))
  }

}
