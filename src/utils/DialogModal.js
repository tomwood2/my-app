import { useEffect, useRef } from "react";
import styled from "styled-components";

const Dialog = styled.dialog`
  width: 400px;
  border-radius: 8px;
  border: 1px solid #888;

  ::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;

// type Props = {
//   title: string;
//   isOpened: boolean;
//   onProceed: () => void;
//   onClose: () => void;
//   children: React.ReactNode;
// };

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
        <Dialog ref={dialog} onCancel={onClose} onClick={onClose}>
            <div onClick={preventAutoClose}>
                <h3>{title}</h3>

                {children}

                <Buttons>
                    {/* Only show OK button if onProceed was provided */}
                    {onProceed != null &&
                        <button onClick={proceedAndClose}>Proceed</button>
                    }
                    <button onClick={onClose}>Close</button>
                </Buttons>
            </div>
        </Dialog>
    );
}

export {DialogModal};