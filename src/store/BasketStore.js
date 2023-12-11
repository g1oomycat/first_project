import { makeAutoObservable } from "mobx";

class BasketStore {
  _basket = [];
  basket_price = 0;
  constructor() {
    makeAutoObservable(this);
  }
  findProduct(id_product) {
    for (let product of this.basket) {
      if (product.id_product === id_product) {
        return product;
      }
    }
  }
  //basket
  addBasket(userId, id_product, product_price) {
    // это ускоряет процесс работы но нужно обращаться только напрямую
    // this._basket = [
    //   ...this.basket,
    //   { basketId: 1, userId: userId, id_product: id_product, total: 1 },
    // ];

    this.basket.push({
      basketId: 1,
      userId: userId || "NotLogged",
      id_product: id_product,
      total: 1,
      product_price: product_price,
    });
  }

  setBasket(product) {
    this._basket = product;
  }
  get basket() {
    return this._basket;
  }

  delBasket(id_product) {
    let product = this.findProduct(id_product);
    let index = this.basket.indexOf(product);
    this.basket.splice(index, 1);
  }
  getInfoForOrderDetails() {
    let data_list = [];
    for (let product of this.basket) {
      data_list = [
        ...data_list,
        {
          id_product: product.id_product,
          quantity: product.total,
          product_price: product.product_price,
        },
      ];
    }

    return data_list;
  }
  checkBasket() {
    return this.basket.length;
  }

  //check status of products in basket

  getStatusBuy(id_product) {
    if (this.findProduct(id_product)) {
      return true;
    } else {
      return false;
    }
  }

  //total
  incrementTotal(id_product) {
    let product = this.findProduct(id_product);
    if (product) {
      product.total += 1;
    }
  }
  dincrementTotal(id_product) {
    let product = this.findProduct(id_product);
    if (product) {
      product.total -= 1;
    }
  }
  // userId
  addUserId(user_id) {
    if (this.basket) {
      for (let product of this.basket) {
        product.userId = user_id;
      }
    }
  }
  delUserId() {
    if (this.basket) {
      for (let product of this.basket) {
        product.userId = "NotLogged";
      }
    }
  }
  getUserId() {
    if (this.basket) {
      for (let product of this.basket) {
        return product.userId;
      }
    }
  }
  //price
  sumPrice(price_product) {
    this.basket_price += price_product;
  }
  minusPrice(price_product) {
    this.basket_price -= price_product;
  }
  delPrice() {
    this.basket_price = 0;
  }
}

export default BasketStore;
