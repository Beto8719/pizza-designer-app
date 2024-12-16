import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, firstValueFrom } from 'rxjs';

export interface Topping {
  id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToppingsService {
  private collectionName = 'toppings';

  constructor(private firestore: AngularFirestore) {}

  //Gets the toppings from database
  getToppings(): Observable<Topping[]> {
    return this.firestore
      .collection<Topping>(this.collectionName)
      .valueChanges({ idField: 'id' });
  }

  //Adds toppings from database
  async addTopping(name: string): Promise<string> {
    const exists = await this.checkIfToppingExists(name);
    if (exists) {
      return Promise.reject('Topping with the same name already exists!');
    }

    const id = this.firestore.createId();
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .set({ id, name })
      .then(() => 'Topping added successfully!');
  }

  //Updates the toppings names to the database
  async updateTopping(id: string, newName: string): Promise<string> {
    const exists = await this.checkIfToppingExists(newName, id);
    if (exists) {
      return Promise.reject('Topping with the same name already exists!');
    }

    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .update({ name: newName })
      .then(() => 'Topping updated successfully!');
  }

  //Checks if the database contains an existing topping
  private async checkIfToppingExists(name: string, excludeId?: string): Promise<boolean> {
    const snapshot = await firstValueFrom(
      this.firestore
        .collection<Topping>(this.collectionName, (ref) =>
          ref.where('name', '==', name.trim())
        )
        .get()
    );

    const toppings = snapshot.docs.map((doc) => doc.data());
    if (excludeId) {
      return toppings.some((t) => t.id !== excludeId);
    }
    return toppings.length > 0;
  }

  //Deletes the toppings from database
  deleteTopping(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}

