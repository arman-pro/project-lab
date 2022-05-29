import React,{ useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

export default function DropDown({children, text=null, caret=false}) {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
            <DropdownToggle color="secondary" className="btn btn-sm" caret={caret}>
                {text ? text : "Action"}
            </DropdownToggle>
            <DropdownMenu container="body">
            {children}
            </DropdownMenu>
        </Dropdown>
    );
}