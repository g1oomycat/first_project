import { observer } from "mobx-react-lite";
import React from "react";
import { useForm } from "react-hook-form";
import { Context } from "../index";
import { useContext } from "react";
import classes from "./ModalWindow.module.css";
import { changeEmail } from "../API/userAPI";

const ChangeEmailForm = observer(({ setActive }) => {
  const { users } = useContext(Context);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = async (data) => {
    setActive(false);
    try {
      const response = await changeEmail(users.user.id, data.email);
      users.setUser(response.data);

      reset();
    } catch (error) {
      console.log("Ошибка сервера", error);
    }
  };
  return (
    <div
      className={[classes.modal_target, classes.modal_target_email_number].join(
        " "
      )}
    >
      <div onClick={() => setActive(false)} className={classes.modal_exit}>
        X
      </div>
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <span>Введите почту</span>
        <input
          placeholder="Введите почту..."
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
        <button className={classes.target_btn} type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
});

export default ChangeEmailForm;
