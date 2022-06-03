import React, {useState} from 'react';
import { Alert } from "reactstrap";

function InfoAlert({message, color='danger'}) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <Alert
            className="mt-5"
            color={color}
            isOpen={isOpen}
            fade={true}
            toggle={()=> setIsOpen(!isOpen)}
            >
            {message}
        </Alert>
    )
};

export default React.memo(InfoAlert);