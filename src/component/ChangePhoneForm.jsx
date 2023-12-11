import { observer } from "mobx-react-lite";
import React from "react";
import { useForm } from "react-hook-form";
import { Context } from "../index";
import { useContext } from "react";
import classes from "./ModalWindow.module.css";
import { changeNumber } from "../API/userAPI";

const ChangePhoneForm = observer(({ setActive }) => {
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
      const response = await changeNumber(users.user.id, data.phone_number);
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
        <span>Введите номер телефона</span>
        <input
          placeholder="Введите номер..."
          {...register("phone_number", {
            required: "Поле не заполнено",
            pattern: {
              value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
              message: "Некорректный номер",
            },
          })}
        />
        <div className={classes.errors}>
          {errors.phone_number && (
            <p>{errors.phone_number.message || "Erorr!"}</p>
          )}
        </div>
        <button className={classes.target_btn} type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
});

export default ChangePhoneForm;
