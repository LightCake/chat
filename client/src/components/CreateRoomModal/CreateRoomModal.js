import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./CreateRoomModal.css";

const CreateRoomModal = props => {
  const { isShowing, toggle, handleCreate } = props;

  const [name, setName] = useState("");

  const update = fn => event => {
    fn(event.target.value);
  };

  /*
  onBlur={handleFocus("name")}
          error={errors.name}
  */

  return (
    <Modal isShowing={isShowing} hide={toggle}>
      <form onSubmit={handleCreate(name)} className="modal_form">
        <Input
          value={name}
          onChange={update(setName)}
          label="Room Name"
          type="text"
        />
        <Button label="Create" type="submit" />
      </form>
    </Modal>
  );
};

CreateRoomModal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default CreateRoomModal;
