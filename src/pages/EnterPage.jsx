import React, { useState } from "react";
import Back from "../Image/back.png";
import classes from "./Enter.module.css";
import Logo from "../Image/logo.svg";
import { login } from "../API/userAPI";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../index";
import { useContext } from "react";

const EnterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { users, basket } = useContext(Context);
  const navigate = useNavigate();
  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      console.log(response);
      users.setUser(response.data);
      users.setLoggedIn(true);
      basket.addUserId(response.data.id);
      navigate("/main");
    } catch (error) {
      if (error.response.status == 403) {
        alert("Пользователь не найден");
      }
    }
  };
  return (
    <div className="main_block">
      <div className={`${classes.main_block_body} _cont_limit`}>
        <div className={classes.enter_block}>
          <form action="#" onSubmit={loginUser} className={classes.main_form}>
            <div className={classes.main_logo}>
              <img src={Logo} alt="logo" />
            </div>
            <div className={classes.main_title}>Вход в аккаунт</div>
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
            <Link to={"/registration"} className={classes.main_reg}>
              Зарегестрироваться
            </Link>

            <div>
              <button onSubmit={loginUser} className={classes.main_btn}>
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="main_img _ibg">
        <img src={Back} alt="cover" />
      </div>
    </div>
  );
};

export default EnterPage;
