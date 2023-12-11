import { observer } from "mobx-react-lite";
import React from "react";

import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { useContext } from "react";
import classes from "./ModalWindow.module.css";
import { deleteUser } from "../API/userAPI";

const ChangeDeleteForm = observer(({ setActive }) => {
  const { users, basket } = useContext(Context);
  const navigate = useNavigate();
  const delUser = async () => {
    try {
      const response = await deleteUser(users.user.id);
      console.log(response);
      users.setUser([]);
      users.setLoggedIn(false);
      basket.delUserId();
      navigate("/main");
    } catch (error) {
      console.log("Ошибка", error);
    }
  };

  return (
    <div
      className={[classes.modal_target, classes.modal_target_delete].join(" ")}
    >
      <div onClick={() => setActive(false)} className={classes.modal_exit}>
        X
      </div>

      <span>Вы тончо хотите удалить аккаунт?</span>

      <div className={classes.delete_btn}>
        <button onClick={delUser}>Удалить аккаунт</button>
        <button onClick={() => setActive(false)}>Отмена</button>
      </div>
    </div>
  );
});

export default ChangeDeleteForm;
