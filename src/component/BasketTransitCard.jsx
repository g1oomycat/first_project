import React from "react";
import BasketCard from "./BasketCard";
import { Context } from "../index";
import { useContext } from "react";
import { observer } from "mobx-react-lite";

const BasketTransitCard = observer(({ id_product, total_old }) => {
  const { food } = useContext(Context);
  let product_from_food = food.products.filter(
    (product) => product.id == id_product
  );
  return (
    <>
      {product_from_food.map((product) => (
        <BasketCard
          key={id_product}
          id_product={id_product}
          total_old={total_old}
          product_price={product.price}
          product_name={product.name}
          imgg={product.product_img}
        />
      ))}
    </>
  );
});

export default BasketTransitCard;
