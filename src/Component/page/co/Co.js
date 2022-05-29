import React, {useState, useEffect,} from "react";
import { Badge, DropdownItem } from "reactstrap";
import useGet from "../../Hooks/useGet";
import ContentLayout from "../../layout/ContentLayout";
import DropDown from "../../OtherComp/DropDown";
import AddForm from "./AddForm";
import { BiGridAlt,BiPencil,BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import useConfirm from "../../Hooks/useConfirm";
import useToast from "../../Hooks/useToast";
import useDelete from "../../Hooks/useDelete";


const CO = () => {
    const notify = useToast();
    const {sendDelete} = useDelete();
    const {sendRequest} = useGet();
    const [users, setUsers] = useState([]);
    const { confirm } = useConfirm();

    useEffect(() => {
        return sendRequest('/cos', setUsers);
    }, [sendRequest]);

    function coDelete(id) {
        confirm('Are you sure to delete?').then(function(res) {
            if(res){
                notify(sendDelete(`/cos/${id}`, function(){
                    setUsers(users => users.filter(item=> item.id !== id));
                }))
            }else {
                return;
            }
        });
    };
    return (
        <React.Fragment>
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
                        users.length <= 0 && (<tr><td colSpan={7} >No Data Available</td></tr>)
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
                                        <DropdownItem onClick={() => coDelete(item.id)} className="text-danger">
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