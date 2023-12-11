import React, { useEffect, useState } from "react";
import classes from "./Basket.Page.module.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { useContext } from "react";
import Back from "../Image/back.png";
import BasketTransitCard from "../component/BasketTransitCard";
import { observer } from "mobx-react-lite";
import { orders } from "../API/orderAPI";
import { orderDetails } from "../API/orderDetailsAPI";
import { changeNumber } from "../API/userAPI";
import { useForm } from "react-hook-form";
import { changeAdress } from "../API/userAPI";

const BasketPage = observer(() => {
  const navigate = useNavigate();
  const { basket, users } = useContext(Context);
  const [deleveryPrice, setDeleveryPrice] = useState(500);
  useEffect(() => {
    if (basket.basket_price < 1000) {
      setDeleveryPrice(500);
    } else {
      setDeleveryPrice(0);
    }
  }, [basket.basket_price]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      user_name: users.user.first_name,
      user_number: users.user.phone_number,
    },
  });
  const onSubmit = async (data) => {
    console.log("asdf");
    if (!basket.checkBasket()) {
      alert("Корзина пуста");
      return;
    }
    const order = {
      order_date: new Date().toLocaleDateString(),
      order_time: new Date().toLocaleTimeString(),
      delivery_addresses: `Улица ${data.user_street}, дом ${data.user_housing}, квартира: ${data.user_apartament}, подъезд: ${data.user_entrance}, этаж: ${data.user_floor}`,
      status: true,
      order_price: basket.basket_price,
      delevery_price: deleveryPrice,
    };
    if (!users.loggedIn) {
      order["user_name"] = data.user_name;
      order["user_number"] = data.user_number;
    } else {
      order["user_id"] = basket.getUserId();
      try {
        const response = await changeNumber(users.user.id, data.user_number);
        const responseAdress = await changeAdress(
          users.user.id,
          data.user_street,
          data.user_housing,
          data.user_apartament,
          data.user_entrance,
          data.user_floor,
          Math.floor(basket.basket_price * 0.05)
        );
        users.setUser(responseAdress.data);
        console.log(responseAdress);
        console.log(response);
      } catch (error) {
        alert("Ошибка замены номера");
      }
    }

    try {
      const response = await orders(order);
      for (let product of basket.getInfoForOrderDetails()) {
        const responseDetails = await orderDetails({
          order_id: response.data.id,
          product_id: product.id_product,
          quantity: product.quantity,
          product_price: product.product_price,
        });
      }
      basket.setBasket([]);
      basket.delPrice();
      alert("Заказ оформлен");
      navigate("/main");
    } catch (error) {
      alert("Ошибка сервера или данных");
    }
  };

  return (
    <div className={classes.main_basket}>
      <div className={`${classes.basket_cont} _cont_limit`}>
        <div className={classes.basket_body}>
          <div className={classes.basket_order}>
            <div className={classes.basket_adress}>
              <h1 className={classes.basket_title}>Оформление заказа</h1>
              <form
                action="#"
                id="adress"
                className={classes.basket_form}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className={classes.basket_user_date}>
                  <div
                    className={`${classes.input_user_date} ${classes.input_user_date_name} `}
                  >
                    <input
                      className={
                        errors.user_name && classes.basket_input_active
                      }
                      placeholder="Имя"
                      {...register("user_name", {
                        required: "Поле не заполнено",
                        maxLength: {
                          value: 20,
                          message: "Максимум 20 символов",
                        },
                        pattern: {
                          value: /^[А-Яа-яё]+$/i,
                          message: "Только кириллица",
                        },
                      })}
                    />
                  </div>
                  <div
                    className={`${classes.input_user_date} ${classes.input_user_date_number} `}
                  >
                    <input
                      className={
                        errors.user_number && classes.basket_input_active
                      }
                      placeholder="Телефон"
                      {...register("user_number", {
                        required: "Поле не заполнено",
                        pattern: {
                          value:
                            /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                          message: "Некорректный номер",
                        },
                      })}
                    />
                  </div>
                </div>
                <h2 className={classes.basket_title_low}>Куда доставить?</h2>
                <div className={classes.basket_street}>
                  <div className={classes.input_street}>
                    <input
                      className={
                        errors.user_street && classes.basket_input_active
                      }
                      placeholder="Улица"
                      {...register("user_street", {
                        required: "Поле не заполнено",
                        maxLength: {
                          value: 30,
                          message: "Максимум 30 символов",
                        },
                        pattern: {
                          value: /^[А-Яа-яё]+$/i,
                          message: "Только кириллица",
                        },
                      })}
                    />
                  </div>
                  <div className={classes.basket_street_exact}>
                    <div className={classes.input_street_exact}>
                      <input
                        className={
                          errors.user_housing && classes.basket_input_active
                        }
                        placeholder="Дом"
                        {...register("user_housing", {
                          required: "Поле не заполнено",
                          maxLength: {
                            value: 5,
                            message: "Максимум 5 cимволов",
                          },
                          pattern: {
                            value: /^\d+$/,
                            message: "Только цифры",
                          },
                        })}
                      />
                    </div>
                    <div className={classes.input_street_exact}>
                      <input
                        className={
                          errors.user_apartament && classes.basket_input_active
                        }
                        placeholder="Квартира"
                        {...register("user_apartament", {
                          maxLength: {
                            value: 5,
                            message: "Максимум 5 cимволов",
                          },
                          pattern: {
                            value: /^\d+$/,
                            message: "Только цифры",
                          },
                        })}
                      />
                    </div>
                    <div className={classes.input_street_exact}>
                      <input
                        className={
                          errors.user_entrance && classes.basket_input_active
                        }
                        placeholder="Подъезд"
                        {...register("user_entrance", {
                          maxLength: {
                            value: 3,
                            message: "Максимум 3 cимвола",
                          },
                          pattern: {
                            value: /^\d+$/,
                            message: "Только цифры",
                          },
                        })}
                      />
                    </div>
                    <div className={classes.input_street_exact}>
                      <input
                        className={
                          errors.user_floor && classes.basket_input_active
                        }
                        placeholder="Этаж"
                        {...register("user_floor", {
                          maxLength: {
                            value: 3,
                            message: "Максимум 3 cимвола",
                          },
                          pattern: {
                            value: /^\d+$/,
                            message: "Только цифры",
                          },
                        })}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className={classes.basket_total}>
              <h2 className={classes.basket_title_total}>Ваша корзина</h2>
              <div className={classes.basket_cards}>
                {basket.basket.map((product) => (
                  <BasketTransitCard
                    key={product.id_product}
                    id_product={product.id_product}
                    total_old={product.total}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={classes.basket_payment}>
            <div className={classes.basket_payment_body}>
              <div className={classes.basket_total_cost}>
                <div className={classes.basket_total_cost_item}>
                  <div>Общая сумма корзины</div>
                  <div>{basket.basket_price} ₽</div>
                </div>
                <div className={classes.basket_total_cost_item}>
                  <div>Стоимсть доставки</div>
                  <div>{deleveryPrice} ₽</div>
                </div>
              </div>
              <div className={classes.basket_total_cost}>
                <div className={classes.basket_total_cost_item}>
                  <div>Время доставки:</div>
                  <div>90 мин</div>
                </div>
                <div
                  className={`${classes.basket_total_cost_item} ${classes.basket_font_max}`}
                >
                  <div>Итого:</div>
                  <div>{basket.basket_price + deleveryPrice} ₽</div>
                </div>
                <div className={classes.basket_total_cost_button}>
                  <button type="submit" form="adress">
                    Заказать
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main_img _ibg">
        <img src={Back} alt="cover" />
      </div>
    </div>
  );
});

export default BasketPage;
