import React,{useState} from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

function ConfirmBox(props) {
    const [open, setOpen] = useState(true);
    const {confirmHandler} = props;

    function allowed() {
        confirmHandler(true);
        setOpen(false);
    }

    function notAllowed() {
        confirmHandler(false);
        setOpen(false);
    }


    return (<Modal isOpen={open} centered={true} size="sm">
        <ModalBody>
            <h5 className={'text-danger'}>Are you sure to delete</h5>
        </ModalBody>
        <ModalFooter className="justify-content-start">
            <Button color="primary" onClick={allowed}>Yes</Button>
            <Button color="danger" outline onClick={notAllowed}>No</Button>
        </ModalFooter>
    </Modal>);
};

export default ConfirmBox;