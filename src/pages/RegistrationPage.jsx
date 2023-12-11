import React from "react";
import Back from "../Image/back.png";
import classes from "./Registration.Page.module.css";
import Logo from "../Image/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../index";
import { useContext } from "react";
import { registerDB } from "../API/userAPI";
import { useForm } from "react-hook-form";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { users, basket } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    let user = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      phone_number: "Не указано",
      user_street: "Не указано",
      user_housing: "Не указано",
      user_apartament: "Не указано",
      user_entrance: "Не указано",
      user_floor: "Не указано",
      user_balance: 0,
    };
    try {
      const response = await registerDB(user);
      console.log(response);
      users.setUser(response.data);
      users.setLoggedIn(true);
      basket.addUserId(response.data.id);
      navigate("/main");
    } catch (error) {
      console.log("Ошибка при введении данных", error);
    }
  };
  return (
    <div className="main_block">
      <div className={`${classes.main_block_body} _cont_limit`}>
        <div className={classes.enter_block}>
          <div className={classes.registretion_body}>
            <div className={classes.main_logo}>
              <img src={Logo} alt="logo" />
            </div>
            <div className={classes.main_title}>Регистрация</div>
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
              <input
                className={classes.main_inp_1}
                placeholder="Имя"
                {...register("firstName", {
                  required: "Поле не заполнено",
                  maxLength: { value: 20, message: "Максимум 20 символов" },
                  pattern: {
                    value: /^[А-Яа-яё]+$/i,
                    message: "Только кириллица",
                  },
                })}
              />
              <div className={classes.errors}>
                {errors.firstName && (
                  <p>{errors.firstName.message || "Erorr!"}</p>
                )}
              </div>
              <input
                className={classes.main_inp_1}
                placeholder="Фамилия"
                {...register("lastName", {
                  required: "Поле не заполнено",
                  maxLength: { value: 20, message: "Максимум 20 символов" },
                  pattern: {
                    value: /^[А-Яа-яё]+$/i,
                    message: "Только кириллица",
                  },
                })}
              />
              <div className={classes.errors}>
                {errors.lastName && (
                  <p>{errors.lastName.message || "Erorr!"}</p>
                )}
              </div>
              <input
                className={classes.main_inp_1}
                type="email"
                placeholder="Почта"
                {...register("email", {
                  required: "Поле не заполнено",
                  maxLength: { value: 30, message: "Максимум 30 символов" },
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: "Некорректная почта",
                  },
                })}
              />
              <div className={classes.errors}>
                {errors.email && <p>{errors.email.message || "Erorr!"}</p>}
              </div>

              <input
                className={classes.main_inp_1}
                type="password"
                placeholder="Пароль"
                {...register("password", {
                  required: "Поле не заполнено",
                  minLength: { value: 8, message: "Минимум 8 символов" },
                  maxLength: { value: 40, message: "Максимум 40 символов" },
                  pattern: {
                    value:
                      /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d)[a-zA-Zа-яА-ЯёЁ0-9!@#$%^&*()_+{}:;<>,.?~/\-=[\]\\]{8,40}$/,
                    message: "Некорректный пароль",
                  },
                })}
              />
              <div className={classes.errors}>
                {errors.password && (
                  <p>{errors.password.message || "Erorr!"}</p>
                )}
              </div>
              <Link to={"/enter"} className={classes.main_reg}>
                Войти в аккаунт
              </Link>
              {/* <input className={classes.main_btn} type="submit" /> */}
              <button className={classes.main_btn} type="submit">
                Зарегестрироваться
              </button>
            </form>
          </div>
          {/* <form
            action="#"
            className={classes.main_form}
            onSubmit={registerUser}
          >
            <div className={classes.main_logo}>
              <img src={Logo} alt="logo" />
            </div>
            <div className={classes.main_title}>Регистрация</div>
            <div className={classes.main_inp_1}>
              <input
                type="text"
                className=""
                placeholder="Имя"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
              />
            </div>
            <div className={classes.main_inp_1}>
              <input
                type="text"
                className=""
                placeholder="Фамилия"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
              />
            </div>
            <div className={classes.main_inp_1}>
              <input
                type="email"
                className=""
                placeholder="Почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={classes.main_inp_2}>
              <input
                type="password"
                className=""
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link to={"/enter"} className={classes.main_reg}>
              Войти в аккаунт
            </Link>

            <div>
              <button className={classes.main_btn} onSubmit={registerUser}>
                Зарегестрироваться
              </button>
            </div>
          </form> */}
        </div>
      </div>
      <div className="main_img _ibg">
        <img src={Back} alt="cover" />
      </div>
    </div>
  );
};

export default RegistrationPage;
