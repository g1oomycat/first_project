import { makeAutoObservable } from "mobx";

class FoodStore {
  _products = [];

  constructor() {
    makeAutoObservable(this);
  }

  // продукты

  get products() {
    return this._products;
  }
  setProducts(listProducts) {
    this._products = listProducts;
  }
  // купленные продукты
}

export default FoodStore;
