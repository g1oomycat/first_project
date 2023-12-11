import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../index";
import { useContext } from "react";
import classes from "../pages/ProfilePage.module.css";
import { changeLastName } from "../API/userAPI";
import { BsPencil } from "react-icons/bs";

const ChangeLastNameForm = observer(() => {
  const { users } = useContext(Context);
  const [statusLastName, setStatusLastName] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      last_name: users.user.last_name,
    },
  });
  const onSubmit = async (data) => {
    setStatusLastName(!statusLastName);
    try {
      const response = await changeLastName(users.user.id, data.last_name);
      users.setUser(response.data);
    } catch (error) {
      console.log("Ошибка сервера");
    }
  };
  return (
    <div className={classes.item_profile_body}>
      <div className={classes.item_const}>Фамилия:</div>
      <div
        onClick={() => setStatusLastName(!statusLastName)}
        style={statusLastName ? { display: "block" } : { display: "none" }}
      >
        {users.user.last_name}
        <span>
          <BsPencil />
        </span>
      </div>
      <div style={!statusLastName ? { display: "block" } : { display: "none" }}>
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.form_inp_btn}>
            <input
              className={errors.last_name && classes.inp_active}
              placeholder="Введите фамилию"
              {...register("last_name", {
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
            {errors.last_name && <p>{errors.last_name.message || "Erorr!"}</p>}
          </div>
        </form>
      </div>
    </div>
  );
});

export default ChangeLastNameForm;
