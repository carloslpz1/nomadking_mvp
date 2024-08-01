import OutsideClickHandler from '../../handlers/OutsideClickHandler'
import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";
import './ConfirmationModal.css'

const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="modal-container">
      <OutsideClickHandler onOutsideClick={onCancel}>
        <div className="modal">
          <IoClose onClick={onCancel} />
          <div className="modal-header">
            {title && (
              <h2>{title}</h2>
            )}
          </div>

          <div className="modal-content">
            <p>{message}</p>
          </div>

          <div className="modal-footer">
            <button className="btn-confirm" onClick={onConfirm}>Confirm</button>
            <button className="btn-cancel btn-inverse" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  )
}

ConfirmationModal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default ConfirmationModal