import React from 'react';
import './styles/modal.css';

const Modal = ({ show, onClose, recordingUrl, onRetry }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Recording Playback</h4>
                </div>
                <div className="modal-body">
                    <video src={recordingUrl} controls autoPlay />
                </div>
                <div className="modal-footer">
                    <button onClick={onRetry}>Retry</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
