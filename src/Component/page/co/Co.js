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
import DataTable from "react-data-table-component";
import Preloader from "../../Loader/Preloader";
import customStyle from "../../../dataTableStyle";


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

    const columns = [
        {
            name: "SL",
            width: "60px",
            selector: (row, index) => (index + 1) < 10 ? `0${index + 1}` : `${index + 1}`
        },
        {
            name: "Name",
            wrap: true,
            grow: 3,
            selector: co => co.full_name
        },
        {
            name: "Code",
            selector: co => co.code
        },
        {
            name: "Mobile",
            wrap: true,
            grow: 3,
            selector: co => co.phone
        },
        {
            name: "Status",
            selector: co => co.is_active ? (<Badge pill color="primary">Active</Badge>) : (<Badge color="warning">Inactive</Badge>)
        },
        {
            name: "Address",
            wrap: true,
            grow: 3,
            selector: co => co.address
        },
        {
            name: "Action",
            selector: co => {
                return ( 
                    <DropDown text={<BiGridAlt/>}>
                        <DropdownItem tag={Link} to={`/co/${co.id}/edit`} >
                            <BiPencil/> Edit
                        </DropdownItem>                                        
                        <DropdownItem onClick={() => coDelete(co.id)} className="text-danger">
                            <BiTrash/> Delete
                        </DropdownItem>
                    </DropDown>
                );
            }
        }
    ];

    return (
        <React.Fragment>
        <ContentLayout>
                        
            <div className="row">
            <div className='col-8 col-md-8 col-sm-12 border rounded shadow position-relative'>
                {users.length > 0 && (<DataTable columns={columns} customStyles={customStyle} data={users} pagination />)}
                {users.length === 0 && (<Preloader/>)}
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