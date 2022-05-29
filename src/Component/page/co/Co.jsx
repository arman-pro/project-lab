import React, {useState, useEffect,} from "react";
import { Badge, Button, DropdownItem, Modal, ModalBody, ModalFooter, ModalHeader, Toast, ToastBody } from "reactstrap";
import useGet from "../../Hooks/useGet";
import ContentLayout from "../../layout/ContentLayout";
import DropDown from "../../OtherComp/DropDown";
import AddForm from "./AddForm";
import { BiGridAlt,BiPencil,BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import ConfirmBox from "../../OtherComp/ConfirmBox";
import useConfirm from "../../Hooks/useConfirm";

const CO = () => {
    const {sendRequest} = useGet();
    const [users, setUsers] = useState([]);
    const {allowed, confirm} = useConfirm();

    useEffect(() => {
        return sendRequest('/cos', setUsers);
    }, [sendRequest]);

    const toastAlert = () => {
       if(!confirm) {
            allowed();
       }else {
           alert(confirm);
       }
    }
    
    return (
        <React.Fragment>
        {/* <Modal isOpen={true} centered={true} size="sm">
            <ModalBody>
                <h5 className={'text-danger'}>Are you sure to delete?</h5>
            </ModalBody>
            <ModalFooter className="justify-content-start">
                <Button color="primary" >Yes</Button>
                <Button color="danger" outline >No</Button>
            </ModalFooter>
        </Modal> */}
        <ContentLayout>
                        
            <div className="row">
            <div className='col-8 col-md-8 col-sm-12 border rounded shadow'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Mobile</th>
                            <th>Status</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users.length <= 0 && (<tr><td colSpan={6} >No Data Available</td></tr>)
                    }
                    {
                        users.length > 0 && users.map((item, index) => (
                                <tr key={item.code}>
                                <td>{index + 1}</td>
                                <td>{item.full_name}</td>
                                <td>{item.code}</td>
                                <td>{item.phone}</td>
                                <td>{item.is_active ? (<Badge pill color="primary">Active</Badge>) : (<Badge color="warning">Inactive</Badge>)}</td>
                                <td>{item.address}</td>
                                <td>
                                    <DropDown text={<BiGridAlt/>}>
                                        <DropdownItem tag={Link} to={`/co/${item.id}/edit`} >
                                            <BiPencil/> Edit
                                        </DropdownItem>
                                        <DropdownItem onClick={toastAlert} className="text-danger">
                                            <BiTrash/> Delete
                                        </DropdownItem>
                                    </DropDown>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <div className="col-4 col-md-4 col-sm-12">
                <AddForm storeState={setUsers} />
            </div>
            </div>
        </ContentLayout>
        </React.Fragment>
    )
}

export default CO;