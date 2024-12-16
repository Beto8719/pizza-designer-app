import { Component, OnInit } from '@angular/core';
import { PizzasService, Pizza } from './pizzas.service';
import { ToppingsService, Topping } from '../toppings/toppings.service';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
})

export class PizzasComponent implements OnInit {
  pizzas: Pizza[] = [];
  toppingsList: Topping[] = [];
  selectedToppings: string[] = [];
  newPizzaName: string = '';
  editingPizzaId: string | null = null;

  constructor(
    private pizzasService: PizzasService,
    private toppingsService: ToppingsService
  ) {}

  ngOnInit(): void {
    this.pizzasService.getPizzas().subscribe((data) => {
      this.pizzas = data;
    });

    this.toppingsService.getToppings().subscribe((data) => {
      this.toppingsList = data;
    });
  }

  //Saves with the selected toppings and checks for duplicates
  savePizza(): void {
    if (!this.newPizzaName.trim()) {
      alert('Pizza name cannot be empty!');
      return;
    }

    if (this.editingPizzaId) {
      this.pizzasService
        .updatePizza(this.editingPizzaId, this.newPizzaName.trim(), this.selectedToppings)
        .then((message) => {
          alert(message);
          this.clearForm();
        })
        .catch((error) => alert(error));
    } else {
      this.pizzasService
        .addPizza(this.newPizzaName.trim(), this.selectedToppings)
        .then((message) => {
          alert(message);
          this.clearForm();
        })
        .catch((error) => alert(error));
    }
  }

  //Edits pizza name and toppings
  editPizza(pizza: Pizza): void {
    this.editingPizzaId = pizza.id!;
    this.newPizzaName = pizza.name;
    this.selectedToppings = [...pizza.toppings];
  }

  //Deletes pizza designed
  deletePizza(id: string): void {
    this.pizzasService.deletePizza(id).then(() => {
      alert('Pizza deleted successfully!');
    });
  }

  //Manage the selected toppings array
  toggleTopping(toppingId: string): void {
    const index = this.selectedToppings.indexOf(toppingId);
    if (index > -1) {
      this.selectedToppings.splice(index, 1);
    } else {
      this.selectedToppings.push(toppingId);
    }
  }

  //get toppings from array
  getToppingNames(toppingIds: string[]): string {
    const toppingNames = toppingIds
      .map((id) => {
        const topping = this.toppingsList.find((t) => t.id === id);
        return topping ? topping.name : null;
      })
      .filter((name) => name !== null);
  
    return toppingNames.length > 0 ? toppingNames.join(', ') : 'No Toppings';
  }

  //Clears the form back to empty
  clearForm(): void {
    this.newPizzaName = '';
    this.selectedToppings = [];
    this.editingPizzaId = null;
  }
}
