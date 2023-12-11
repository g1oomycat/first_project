import React from "react";
import Back from "../Image/back.png";
import classes from "./Main.Page.module.css";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
const MainPage = observer(() => {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.main_block}>
        <div className={classes.main_block_body}>
          <div className={`${classes.main_cont} _cont_limit`}>
            <h1 className={classes.main_title}>
              Видовой ресторан Food Exxe Relo на Крестовском острове
            </h1>
          </div>
        </div>
        <div className="main_img _ibg">
          <img src={Back} alt="cover" />
        </div>
      </div>
      <section className={`${classes.main_menu} ${classes.main_menu_rest}`}>
        <div className={`${classes.main_card} ${classes.main_card_text}`}>
          <div className={classes.main_text_block}>
            <div className={classes.main_card_title}>Food Exxe Relo</div>
            <div className={classes.main_card_sub_title}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
              vero quisquam incidunt neque ratione cum ad ipsum! Praesentium
              doloremque tempora qui unde reiciendis odio quam expedita minus.
            </div>
            <div className={classes.main_card_button}>
              <button> УЗНАТЬ БОЛЬШЕ</button>
            </div>
          </div>
        </div>
        <div className={`${classes.main_card} ${classes.main_card_img}`}></div>
      </section>
      <section className={`${classes.main_menu} ${classes.main_menu_menu}`}>
        <div className={`${classes.main_card} ${classes.main_card_img}`}></div>
        <div className={`${classes.main_card} ${classes.main_card_text}`}>
          <div className={classes.main_text_block}>
            <div className={classes.main_card_title}>МЕНЮ</div>
            <div className={classes.main_card_sub_title}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
              vero quisquam incidunt neque ratione cum ad ipsum! Praesentium
              doloremque tempora qui unde reiciendis odio quam expedita minus.
            </div>
            <div className={classes.main_card_button}>
              <button onClick={() => navigate("/menu")}> УЗНАТЬ БОЛЬШЕ</button>
            </div>
          </div>
        </div>
      </section>
      <section className={`${classes.main_menu} ${classes.main_menu_shef}`}>
        <div className={`${classes.main_card} ${classes.main_card_text}`}>
          <div className={classes.main_text_block}>
            <div className={classes.main_card_title}>огузок</div>
            <div className={classes.main_card_sub_title}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
              vero quisquam incidunt neque ratione cum ad ipsum! Praesentium
              doloremque tempora qui unde reiciendis odio quam expedita minus.
            </div>
            <div className={classes.main_card_button}>
              <button> УЗНАТЬ БОЛЬШЕ</button>
            </div>
          </div>
        </div>
        <div className={`${classes.main_card} ${classes.main_card_img}`}></div>
      </section>

      <section className={classes.main_parallax}></section>
      <section className={classes.main_aboutus}>
        <div className={classes.aboutus_body}>
          <div className={`${classes.aboutus_column} ${classes.column_adress}`}>
            <div className={classes.aboutus_item}>
              <div className={classes.aboutus_title}>Адрес</div>
              <div className={classes.aboutus_sub_title}>
                Коммунистическая 39
                <br />
                Уфа
              </div>
              <div className={classes.aboutus_other}>
                <button>Расположение</button>
              </div>
            </div>
          </div>
          <div className={`${classes.aboutus_column} ${classes.column_time}`}>
            <div className={classes.aboutus_item}>
              <div className={classes.aboutus_title}>Часы работы</div>
              <div className={classes.aboutus_sub_title}>
                Воскресенье-Четверг
                <br />
                14:00-11:00
              </div>
              <div className={classes.aboutus_other}>
                Пятница-Суббота
                <br />
                14:00-01:00
              </div>
            </div>
          </div>
          <div
            className={`${classes.aboutus_column} ${classes.column_contact}`}
          >
            <div className={classes.aboutus_item}>
              <div className={classes.aboutus_title}>Контакты</div>
              <div className={classes.aboutus_sub_title}>
                Телефон для бронирования <br />
                +7 (800) 555-35-35
              </div>
              <div className={classes.aboutus_other}>
                Почта для связи <br />
                foodinfo@mail.ru
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default MainPage;
