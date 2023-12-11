import React, { useState } from "react";
import classes from "./ProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { useContext } from "react";

import ChangeNameForm from "../component/ChangeNameForm";
import ChangeLastNameForm from "../component/ChangeLastNameForm";
import { BsPencil } from "react-icons/bs";
import ModalWindow from "../component/ModalWindow";
import { observer } from "mobx-react-lite";

const ProfilePage = observer(() => {
  const { users } = useContext(Context);
  const [targetForModal, setTargetForModal] = useState("");
  const [activeModal, setActiveModal] = useState(false);
  const changeModal = (statusModal, targetModal) => {
    setActiveModal(statusModal);
    setTargetForModal(targetModal);
  };
  return (
    <div className={classes.profile_block_main}>
      <div className={`${classes.profile_block_body} _cont_limit`}>
        <div className={classes.profile_block}>
          <div className={classes.profile_info}>
            <div className={`${classes.block_info} ${classes.info_data}`}>
              <div className={classes.profile_info_body}>
                <h1>Личные данные </h1>
                <ChangeNameForm />
                <ChangeLastNameForm />
                <div className={classes.item_profile_body}>
                  <div className={classes.item_const}>Телефон:</div>
                  <div onClick={() => changeModal(true, "number")}>
                    {users.user.phone_number}
                    <span>
                      <BsPencil />
                    </span>
                  </div>
                </div>
                <div className={classes.item_profile_body}>
                  <div className={classes.item_const}>Почта:</div>
                  <div onClick={() => changeModal(true, "email")}>
                    {users.user.email}
                    <span>
                      <BsPencil />
                    </span>
                  </div>
                </div>
                <div className={classes.item_profile_body}>
                  <div className={classes.item_const}>Баланс:</div>
                  <div>{users.user.user_balance} Бонусов</div>
                </div>

                <div className={classes.profile_info_body_btn}>
                  <button
                    style={{ marginRight: "20px" }}
                    onClick={() => changeModal(true, "password")}
                  >
                    Сменить пароль
                  </button>
                  <button onClick={() => changeModal(true, "delete")}>
                    Удалить аккаунт
                  </button>
                </div>
              </div>
            </div>
            <div className={`${classes.block_info} ${classes.info_adress}`}>
              <div className={classes.profile_info_body}>
                <h1>Адрес доставки </h1>
                <div className={classes.item_profile_body}>
                  <div className={classes.item_const}>Улица:</div>
                  <div>{users.user.user_street}</div>
                </div>
                <div className={classes.item_profile_body}>
                  <div className={classes.item_const}>Дом:</div>
                  <div>{users.user.user_housing}</div>
                </div>
                <div className={classes.item_profile_body}>
                  <div className={classes.item_const}>Квартира:</div>
                  <div>{users.user.user_apartament}</div>
                </div>
                <div className={classes.item_profile_body}>
                  <div className={classes.item_const}>Подъезд:</div>
                  <div>{users.user.user_entrance}</div>
                </div>
                <div className={classes.item_profile_body}>
                  <div className={classes.item_const}>Этаж:</div>
                  <div>{users.user.user_floor}</div>
                </div>
                <div className={classes.profile_info_body_btn}>
                  <button onClick={() => changeModal(true, "adress")}>
                    Редактировать адрес
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalWindow
        active={activeModal}
        setActive={setActiveModal}
        targetProfile={targetForModal}
      />
    </div>
  );
});

export default ProfilePage;
