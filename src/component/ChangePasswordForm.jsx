import { observer } from "mobx-react-lite";
import React from "react";
import { useForm } from "react-hook-form";
import { Context } from "../index";
import { useContext } from "react";
import classes from "./ModalWindow.module.css";
import { changePassword } from "../API/userAPI";

const ChangePasswordForm = observer(({ setActive }) => {
  const { users } = useContext(Context);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const watchPassword = watch("password");
  const onSubmit = async (data) => {
    setActive(false);
    try {
      const response = await changePassword(users.user.id, data.password);
      users.setUser(response.data);

      reset();
    } catch (error) {
      console.log("Ошибка сервера", error);
    }
  };
  return (
    <div
      className={[classes.modal_target, classes.modal_target_password].join(
        " "
      )}
    >
      <div onClick={() => setActive(false)} className={classes.modal_exit}>
        X
      </div>
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <span>Введите новый пароль</span>
        <input
          type="password"
          placeholder="Введите пароль..."
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
          {errors.password && <p>{errors.password.message || "Erorr!"}</p>}
        </div>
        <input
          type="password"
          placeholder="Повторите пароль..."
          {...register("repeat_password", {
            required: "Поле не заполнено",
            validate: (value) =>
              value === watchPassword || "Пароли не совпадают",
          })}
        />
        <div className={classes.errors}>
          {errors.repeat_password && (
            <p>{errors.repeat_password.message || "Erorr!"}</p>
          )}
        </div>
        <button className={classes.target_btn} type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
});

export default ChangePasswordForm;
