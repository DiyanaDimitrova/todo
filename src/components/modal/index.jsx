import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button } from '..';
import { ADD_COLOR, CLOSE, MODAL_ROOT } from '../../constants';
import styles from './index.module.css';

const ModalHeader = ({ header }) => (
  <p id="modal-header" className={styles.modalHeader}>
    {header}
  </p>
);

const ModalBody = ({ children }) => (
  <div className={styles.modalBody}>{children}</div>
);

const ModalFooter = React.memo(({ onClose, onAddColor }) => (
  <div className={styles.modalFooter}>
    <Button onClick={onClose} text={CLOSE} aria-label="Close Modal" />
    <Button onClick={onAddColor} text={ADD_COLOR} aria-label="Add Color" />
  </div>
));

const Modal = ({ isOpen, onClose, onAddColor, header, children }) => {
  const handleOverlayClick = useCallback((event) => {
    if (event.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-header"
    >
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <ModalHeader header={header} />
          <ModalBody>{children}</ModalBody>
          <ModalFooter onClose={onClose} onAddColor={onAddColor} />
        </div>
      </div>
    </div>,
    document.getElementById(MODAL_ROOT)
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddColor: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

ModalHeader.propTypes = {
  header: PropTypes.string.isRequired,
};

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};

ModalFooter.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddColor: PropTypes.func.isRequired,
};

export default Modal;
