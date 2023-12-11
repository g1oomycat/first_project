import React from "react";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <div className={classes.footer}>
      <div className={`${classes.footer_cont} _cont_limit`}>
        Все права защищены
      </div>
    </div>
  );
}

export default Footer;
