import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../index";
import { useContext } from "react";
import classes from "../pages/ProfilePage.module.css";
import { changeFirstName } from "../API/userAPI";
import { BsPencil } from "react-icons/bs";

const ChangeNameForm = observer(() => {
  const { users } = useContext(Context);
  const [statusFirstName, setStatusFirstName] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: users.user.first_name,
    },
  });
  const onSubmit = async (data) => {
    setStatusFirstName(!statusFirstName);
    try {
      const response = await changeFirstName(users.user.id, data.first_name);
      users.setUser(response.data);
    } catch (error) {
      console.log("Ошибка сервера");
    }
  };
  return (
    <div className={classes.item_profile_body}>
      <div className={classes.item_const}>Имя:</div>
      <div
        onClick={() => setStatusFirstName(!statusFirstName)}
        style={statusFirstName ? { display: "block" } : { display: "none" }}
      >
        {users.user.first_name}
        <span>
          <BsPencil />
        </span>
      </div>
      <div
        style={!statusFirstName ? { display: "block" } : { display: "none" }}
      >
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.form_inp_btn}>
            <input
              className={errors.first_name && classes.inp_active}
              placeholder="Введите имя"
              {...register("first_name", {
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
            <button className={classes.item_btn} type="submit">
              Сохранить
            </button>
          </div>
          <div className={classes.errors}>
            {errors.first_name && (
              <p>{errors.first_name.message || "Erorr!"}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
});

export default ChangeNameForm;
