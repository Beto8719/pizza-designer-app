import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, firstValueFrom } from 'rxjs';

export interface Pizza {
  id?: string;
  name: string;
  toppings: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PizzasService {
  private collectionName = 'pizzas';

  constructor(private firestore: AngularFirestore) {}

  //Gets pizzas from database
  getPizzas(): Observable<Pizza[]> {
    return this.firestore
      .collection<Pizza>(this.collectionName)
      .valueChanges({ idField: 'id' });
  }

  //Adds pizzas to database and checks for duplicates
  async addPizza(name: string, toppings: string[]): Promise<string> {
    const exists = await this.checkIfPizzaExists(name);
    if (exists) {
      return Promise.reject('Pizza with the same name already exists!');
    }

    const id = this.firestore.createId();
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .set({ id, name, toppings })
      .then(() => 'Pizza added successfully!');
  }

  //Updates the pizza name and toppings added
  async updatePizza(id: string, name: string, toppings: string[]): Promise<string> {
    const exists = await this.checkIfPizzaExists(name, id);
    if (exists) {
      return Promise.reject('Pizza with the same name already exists!');
    }

    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .update({ name, toppings })
      .then(() => 'Pizza updated successfully!');
  }

  //Checks if pizza name is already in database
  private async checkIfPizzaExists(name: string, excludeId?: string): Promise<boolean> {
    const snapshot = await firstValueFrom(
      this.firestore
        .collection<Pizza>(this.collectionName, (ref) =>
          ref.where('name', '==', name.trim())
        )
        .get()
    );

    const pizzas = snapshot.docs.map((doc) => doc.data());
    if (excludeId) {
      return pizzas.some((p) => p.id !== excludeId);
    }
    return pizzas.length > 0;
  }

  //Deletes pizza from database
  deletePizza(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
