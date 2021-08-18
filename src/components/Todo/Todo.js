import { useState } from "react";

import Modal from "../Modal/Modal";
import Backdrop from "../Backdrop/Backdrop";

function Todo(props) {
  const { title } = props;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function deleteHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="actions">
        <button onClick={deleteHandler} className="btn">
          Delete
        </button>
      </div>
      {modalIsOpen && <Modal closeModalHandler={closeModalHandler} />}
      {modalIsOpen && <Backdrop closeModalHandler={closeModalHandler} />}
    </div>
  );
}

export default Todo;
