import React, { useEffect, useState } from "react";
import classes from "./Menu.Page.module.css";
import { getProducts } from "../API/menuAPI";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../index";
import { useContext } from "react";
import MenuCard from "../component/MenuCard";
import { observer } from "mobx-react-lite";
import Preloader from "../component/Preloader";

const MenuPage = observer(() => {
  const { food, basket } = useContext(Context);
  const [isLoad, setIsLoad] = useState(true);
  const [category_food, setCategory] = useState([]);

  const changeCategory = (event, categ_id) => {
    setCategory(
      food.products.filter((product) => product.id_category == categ_id)
    );
  };
  useEffect(() => {
    getProductsFromServer();
  }, []);
  const getProductsFromServer = async () => {
    try {
      const response = await getProducts();
      food.setProducts(response.data);
      setCategory(food.products.filter((product) => product.id_category == 1));
      setIsLoad(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {isLoad ? (
        <Preloader />
      ) : (
        <section className={classes.main_menu}>
          <div className={`${classes.menu_cont} _cont_limit`}>
            <nav className={classes.menu_header}>
              <ul className={classes.menu_list}>
                <li
                  className={classes.menu_list_item}
                  onClick={(event) => changeCategory(event, 1)}
                >
                  Завтраки
                </li>
                <li
                  className={classes.menu_list_item}
                  onClick={(event) => changeCategory(event, 2)}
                >
                  Raw
                </li>
                <li
                  className={classes.menu_list_item}
                  onClick={(event) => changeCategory(event, 3)}
                >
                  Холодные закуски
                </li>
                <li
                  className={classes.menu_list_item}
                  onClick={(event) => changeCategory(event, 4)}
                >
                  Брускетты{" "}
                </li>
                <li
                  className={classes.menu_list_item}
                  onClick={(event) => changeCategory(event, 5)}
                >
                  К вину{" "}
                </li>
                <li
                  className={classes.menu_list_item}
                  onClick={(event) => changeCategory(event, 6)}
                >
                  Салаты
                </li>
                <li
                  className={classes.menu_list_item}
                  onClick={(event) => changeCategory(event, 7)}
                >
                  Супы
                </li>
                <li
                  className={classes.menu_list_item}
                  onClick={(event) => changeCategory(event, 8)}
                >
                  Паста и ризотто
                </li>
                <li
                  className={classes.menu_list_item}
                  onClick={(event) => changeCategory(event, 9)}
                >
                  Мясо
                </li>
                <li
                  className={classes.menu_list_item}
                  onClick={(event) => changeCategory(event, 10)}
                >
                  Рыба
                </li>
                <li
                  className={classes.menu_list_item}
                  onClick={(event) => changeCategory(event, 11)}
                >
                  Grill
                </li>
                <li
                  className={classes.menu_list_item}
                  onClick={(event) => changeCategory(event, 12)}
                >
                  Гарниры
                </li>
              </ul>
            </nav>
            <div class={classes.menu_body}>
              {category_food.map((product) => (
                <MenuCard
                  key={product.id}
                  name={product.name}
                  picture={product.product_img}
                  price={product.price}
                  id_product={product.id}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
});

export default MenuPage;
