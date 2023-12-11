import React, { useEffect, useState } from "react";
import classes from "../pages/Menu.Page.module.css";
import { Context } from "../index";
import { useContext } from "react";
import { observer } from "mobx-react-lite";

const MenuCard = observer(({ name, picture, price, id_product }) => {
  const { basket, users } = useContext(Context);
  const [buy, setBuy] = useState(false);

  function submitInBasket() {
    basket.addBasket(users.user.id, id_product, price);
    basket.sumPrice(price);
    setBuy(true);
  }
  function delInBasket() {
    basket.delBasket(id_product);
    basket.minusPrice(price);
    setBuy(false);
  }
  useEffect(() => {
    setBuy(basket.getStatusBuy(id_product));
  }, []);
  return (
    <div className={classes.menu_column}>
      <div className={classes.menu_item}>
        <div className={classes.menu_icon}>
          <img src={process.env.REACT_APP_BASE_URL + picture} alt={name} />
        </div>
        <div className={classes.menu_title}>{name}</div>
        <div className={classes.menu_text_btn}>
          <div className={classes.menu_text}>{price} ₽</div>
          {!buy ? (
            <button className={classes.menu_btn} onClick={submitInBasket}>
              В корзину
            </button>
          ) : (
            <button className={classes.menu_btn} onClick={delInBasket}>
              Удалить
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default MenuCard;
