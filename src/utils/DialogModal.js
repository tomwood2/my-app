import { useEffect, useRef } from "react";
import './DialogModal.css';

// use object destructuring assignment to put prop members into variables
function DialogModal({title, isOpened, onProceed, onClose, children}) {

    const dialog = useRef(null);

    useEffect(() => {
        if (isOpened) {
            dialog.current.showModal();
            document.body.classList.add("modal-open"); // prevent bg scroll
        } else {
            dialog.current.close();
            document.body.classList.remove("modal-open");
        }
    }, [isOpened]);

    const proceedAndClose = () => {
        if (onProceed()) {
            onClose();
        }
    };

    const preventAutoClose = (e) => e.stopPropagation();

    return (
        <dialog className="dialog-modal-dialog" ref={dialog} onCancel={onClose} onClick={onClose}>
            <div className="dialog-modal-container" onClick={preventAutoClose}>
                <header>{title}</header>
                {children}
                <div className="dialog-modal-button-container">
                    {/* Only show OK button if onProceed was provided */}
                    {onProceed != null &&
                        <button  className="dialog-modal-form-control dialog-modal-button" onClick={proceedAndClose}>Proceed</button>
                    }
                    <button className="dialog-modal-form-control dialog-modal-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </dialog>
    );
}

export {DialogModal};