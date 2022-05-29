import React,{useState} from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

function ConfirmBox(props) {
    const [open, setOpen] = useState(true);
    const {confirm, cancel, message} = props;

    function isConfirm() {
        confirm();
        setOpen(false);
    }

    function isCancel() {
        cancel(false);
        setOpen(false);
    }


    return (
        <Modal isOpen={open} centered={true} size="sm">
            <ModalBody>
                <h5 className={'text-danger'}>{message}</h5>
            </ModalBody>
            <ModalFooter className="justify-content-start">
                <Button color="primary" onClick={isConfirm}>Confirm</Button>
                <Button color="danger" outline onClick={isCancel}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmBox;