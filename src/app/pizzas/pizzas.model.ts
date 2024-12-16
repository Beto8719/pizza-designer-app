import { Topping } from '../toppings/toppings.model';

export interface Pizza {
  id: number;
  name: string;
  toppings: Topping[];
}