import { Component, OnInit } from '@angular/core';
import { ToppingsService, Topping } from './toppings.service';

@Component({
  selector: 'app-toppings',
  templateUrl: './toppings.component.html',
  styleUrls: ['./toppings.component.scss'],
})
export class ToppingsComponent implements OnInit {
  toppings: Topping[] = [];
  newTopping: string = '';
  editingToppingId: string | null = null;
  editedToppingName: string = '';

  constructor(private toppingsService: ToppingsService) {}

  ngOnInit(): void {
    this.toppingsService.getToppings().subscribe((data) => {
      this.toppings = data;
    });
  }

  //Adds toping to the topping service
  addTopping(): void {
    if (!this.newTopping.trim()) {
      alert('Topping name cannot be empty!');
      return;
    }
  
    this.toppingsService
      .addTopping(this.newTopping.trim())
      .then((message) => {
        alert(message);
        this.newTopping = '';
      })
      .catch((error) => alert(error));
  }

  //Deletes topping from list
  deleteTopping(id: string): void {
    this.toppingsService
      .deleteTopping(id)
      .catch((error) => console.error('Error deleting topping:', error));
  }

  //Edits the toping name
  startEditing(topping: Topping): void {
    this.editingToppingId = topping.id!;
    this.editedToppingName = topping.name;
  }

  //saves edited topping name
  saveEditedTopping(): void {
    if (!this.editedToppingName.trim()) {
      alert('Topping name cannot be empty!');
      return;
    }
  
    this.toppingsService
      .updateTopping(this.editingToppingId!, this.editedToppingName.trim())
      .then((message) => {
        alert(message);
        this.editingToppingId = null;
        this.editedToppingName = '';
      })
      .catch((error) => alert(error));
  }

  //Cancels the edit mode and does not make changes
  cancelEdit(): void {
    this.editingToppingId = null;
    this.editedToppingName = '';
  }
}
