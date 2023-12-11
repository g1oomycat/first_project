import React from "react";
import classes from "./ModalWindow.module.css";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangeDeleteForm from "./ChangeDeleteForm";
import ChangeAdressForm from "./ChangeAdressForm";
import ChangePhoneForm from "./ChangePhoneForm";

const ModalWindow = ({ active, setActive, targetProfile }) => {
  return (
    <div
      className={
        active ? [classes.modal, classes.modal_active].join(" ") : classes.modal
      }
      onClick={() => setActive(false)}
    >
      <div
        className={classes.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        {targetProfile === "number" && (
          <ChangePhoneForm setActive={setActive} />
        )}
        {targetProfile === "email" && <ChangeEmailForm setActive={setActive} />}
        {targetProfile === "password" && (
          <ChangePasswordForm setActive={setActive} />
        )}
        {targetProfile === "delete" && (
          <ChangeDeleteForm setActive={setActive} />
        )}
        {targetProfile === "adress" && (
          <ChangeAdressForm setActive={setActive} />
        )}
      </div>
    </div>
  );
};

export default ModalWindow;
