import "../styles/PopupModal.css";

interface IPopupModalProps {
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function PopupModal({ modalIsVisible, setModalIsVisible }: IPopupModalProps) {
  const handleModalClose = () => {
    setModalIsVisible(false);
  };

  return (
    <>
      {modalIsVisible && (
        <div className="container">
          <div className="modal-container">
            <div className="modal-content">
              <p>Modal text goes here</p>
              <button onClick={handleModalClose}>Close Modal</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupModal;
