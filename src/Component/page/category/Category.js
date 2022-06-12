import React, {useState, useEffect, useCallback} from 'react';
import { Badge } from "reactstrap";
import useToast from '../../Hooks/useToast';
import useGetLoader from '../../Hooks/useGetLoader';
import ContentLayout from "../../layout/ContentLayout";
import AddCategory from "./AddCategory";
import Preloader from '../../Loader/Preloader';
import InfoAlert from '../../OtherComp/InfoAlert';
import { BiGridAlt,BiPencil,BiTrash } from "react-icons/bi";
import { DropdownItem } from 'reactstrap';
import DropDown from '../../OtherComp/DropDown';
import { Link } from 'react-router-dom';
import useConfirm from '../../Hooks/useConfirm';
import useDelete from '../../Hooks/useDelete';
import DataTable from 'react-data-table-component';
import customStyle from '../../../dataTableStyle';

function Category() {
    const [categories, setCategories] = useState(null);
    const notify = useToast();
    const {sendRequest, isLoading, isError} = useGetLoader();
    const {confirm} = useConfirm();
    const { sendDelete } = useDelete();

    useEffect(() => {
        return sendRequest(`/categories`, setCategories);
    }, [sendRequest, setCategories]);

    function deleteCategory(id) {
        confirm('Are you sure to delete?').then(function(res){
            if(res) {
                notify(sendDelete(`/categories/${id}`, function(){
                    setCategories(preCategories => preCategories.filter(category=>category.id !== id));
                }))
                return;
            }else {
                return;
            }
        })
    }

    const addNewCategries = useCallback(({data})=> {
        setCategories(function(preCategories) {
            if(preCategories) {
                return [data, ...preCategories];
            };
            return [data];
        });
    }, []);

    const columns = [
        {
            name: "SL",
            width: "60px",
            selector: (row, index) => (index + 1) < 10 ? `0${index + 1}` : `${index + 1}`
        },
        {
            name: "Category",
            wrap: true,
            grow: 3,
            selector: category => category.name
        },
        {
            name: "Code",
            center: true,
            selector: category => category.code
        },
        {
            name: "Pathology",
            center: true,
            selector: category => category.is_pathology ? (<Badge color="success">Yes</Badge>) : (<Badge color="info">No</Badge>)
        },
        {
            name: "Action",
            center: true,
            selector: (category) => {
                return (<>
                    <DropDown text={<BiGridAlt/>}>
                        <DropdownItem tag={Link} to={`/categories/${category.id}/edit`}>
                            <BiPencil/> Edit
                        </DropdownItem>                                        
                        <DropdownItem className="text-danger" onClick={()=>deleteCategory(category.id)}>
                            <BiTrash/> Delete
                        </DropdownItem>
                    </DropDown>
                </>);
            }
        }
    ];

    return (
        <ContentLayout>
            <div className="row">
                <div className='col-8 col-md-8 col-sm-12 border rounded shadow position-relative'>
                {
                    isLoading && (<Preloader/>)
                }
                {
                    isError && (<InfoAlert message={isError} />)
                }
                {
                    categories && ( <DataTable columns={columns} customStyles={customStyle} data={categories} pagination /> )
                }
               
                </div>
                <div className="col-4 col-md-4 col-sm-12">
                    <AddCategory addCallback={addNewCategries} />
                </div>
            </div>
        </ContentLayout>
    );
};

export default Category;