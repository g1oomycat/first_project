import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import classes from "./NaviBar.module.css";
import { Context } from "../index";
import { useContext } from "react";
import Logo from "../Image/logo.svg";
import { observer } from "mobx-react-lite";

const NaviBar = observer(() => {
  const navigate = useNavigate();
  const { users, basket } = useContext(Context);
  const [scrolled, setScrolled] = useState(false);
  function delUsers() {
    users.setUser([]);
    users.setLoggedIn(false);
    basket.delUserId();
    navigate("/main");
  }
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll".onScroll);
  }, []);

  return (
    <header className={scrolled ? classes.header_active : classes.header}>
      <div className={`${classes.header_cont} _cont_limit`}>
        <Link className={classes.header_logo} to="/main">
          <img src={Logo} alt="logo" />
        </Link>
        <nav className={classes.header_menu}>
          <ul className={classes.menu_list}>
            <li className={classes.menu_item}>
              <Link
                className={`${classes.menu_link} ${classes.menu_link_active_main}`}
                to="/main"
              >
                Главная
              </Link>
            </li>
            <li className={classes.menu_item}>
              <Link className={classes.menu_link} to="/menu">
                Меню
              </Link>
            </li>
            {users.loggedIn && (
              <li className={classes.menu_item}>
                <Link className={classes.menu_link} to="/profile">
                  Профиль
                </Link>
              </li>
            )}

            <li className={classes.menu_item}>
              {users.loggedIn ? (
                <button
                  className={`${classes.menu_link} ${classes.headr_btn}`}
                  onClick={delUsers}
                >
                  Выйти из аккаунта
                </button>
              ) : (
                <button
                  className={`${classes.menu_link} ${classes.headr_btn}`}
                  onClick={() => navigate("/enter")}
                >
                  Войти в аккаунт
                </button>
              )}
            </li>
            <li className={classes.menu_item}>
              <button
                className={`${classes.menu_link} ${classes.headr_btn}`}
                onClick={() => navigate("/basket")}
              >
                Корзина
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
});

export default NaviBar;
