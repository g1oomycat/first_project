import React, { useEffect, useState } from "react";
import classes from "../pages/Basket.Page.module.css";
import { Context } from "../index";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { AiFillDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const BasketCard = observer(
  ({ id_product, total_old, product_price, product_name, imgg }) => {
    const { basket } = useContext(Context);
    const [total, setTotal] = useState(total_old);

    function changeTotalAndPrice(value) {
      if (value) {
        basket.incrementTotal(id_product);
        let incr_total = total + 1;
        setTotal(incr_total);
        basket.sumPrice(product_price);
      } else {
        basket.dincrementTotal(id_product);
        let dincr_total = total - 1;
        setTotal(dincr_total);
        basket.minusPrice(product_price);
      }
    }

    function delProduct() {
      basket.minusPrice(total * product_price);
      basket.delBasket(id_product);
    }

    useEffect(() => {
      if (total === 0) {
        delProduct();
      }
    }, [total]);

    return (
      <div className={classes.basket_column}>
        <div className={classes.basket_item}>
          <div className={classes.basket_item_icon}>
            <img
              src={process.env.REACT_APP_BASE_URL + imgg}
              alt="product_name"
            />
            <div className={classes.basket_item_name}>{product_name}</div>
          </div>
          <div className={classes.basket_item_total_product}>
            <button onClick={() => changeTotalAndPrice(false)}>
              <AiOutlineMinus />
            </button>
            <span>{total}</span>
            <button onClick={() => changeTotalAndPrice(true)}>
              <AiOutlinePlus />
            </button>
          </div>
          <div className={classes.basket_item_price}>
            <span>{total * product_price} ₽</span>
            <button onClick={delProduct}>
              <AiFillDelete />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default BasketCard;
