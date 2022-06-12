import React, {useCallback, useEffect, useState} from 'react';
import { Button, DropdownItem, Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import useGetLoader from '../../Hooks/useGetLoader';
import ContentLayout from "../../layout/ContentLayout";
import AddTest from './AddTest';
import useToast from '../../Hooks/useToast';
import usePost from '../../Hooks/usePost';
import useConfirm from '../../Hooks/useConfirm';
import useDelete from '../../Hooks/useDelete';
import Preloader from '../../Loader/Preloader';
import InfoAlert from '../../OtherComp/InfoAlert';
import DropDown from '../../OtherComp/DropDown';
import { BiGridAlt, BiPencil, BiTrash } from 'react-icons/bi';
import DataTable from 'react-data-table-component';
import customStyle from '../../../dataTableStyle';
import usePut from '../../Hooks/usePut';

const Test = () => {
    const [createNew, setCreateNew] = useState(false);
    const [categories, setCategories] = useState([]);
    const [editTest, setEditTest] = useState(null);
    const [tests, setTest] = useState([]);
    const {sendRequest, isLoading, isError} = useGetLoader();
    const {sendPost} = usePost();
    const notify = useToast();
    const {confirm} = useConfirm();
    const { sendDelete } = useDelete();
    const {sendPut} = usePut();

    const saveTest = useCallback((value, form) => {
        if(value.id) {
            return notify(sendPut(`tests/${value.id}`, value, {
                error: form.setErrors,
                success: (data) => {
                    setTest(preProp => {
                        let oldIndex = preProp.findIndex(item => item.id === data.id);
                        let newProp = [...preProp];
                        newProp[oldIndex] = data;
                        return newProp;
                    });
                    setEditTest(null);
                    setCreateNew(false);
                }
            }));
        } else 
            return notify(sendPost(`tests`, value, {formik:form,storeState:setTest}));
    }, [notify, sendPost, sendPut]);

    useEffect(() => {
        return sendRequest(`tests`, (data) => {
            if(data) {
                setCategories(data.categories);
                setTest(data.tests);
            }
        });
    }, [sendRequest]);

    const deleteTest = useCallback((id) => {
        confirm('Are you sure to delete?').then(res => {
            if(res) {
                notify(sendDelete(`/tests/${id}`, function(){
                    setTest(preTests => preTests.filter(test=>test.id !== id));
                }))
                return;
            }
            return;
        });
    }, [confirm, notify, sendDelete]);

    const editTestHanlder =  (id) => {
        setEditTest(tests[tests.findIndex(item => item.id === id)]);
        setCreateNew(true);
    };
    const columns = [
        {
            name: (<b>S.L.</b>),
            width: "auto",
            sortable: true,
            selector: (row, index) => (index + 1) < 10 ? `0${index + 1}` : `${index + 1}`
        },
        {
            name: (<b>Test</b>),
            wrap: true,
            grow: 2,
            selector: test => test.name
        },
        {
            name: (<b>Category</b>),
            wrap: true,
            grow: 2,
            sortable: true,
            selector: test => test.category_name
        },
        {
            name: (<b>Code</b>),
            selector: test => test.code
        },
        {
            name: (<b>Price</b>),
            sortable: true,
            selector: test => test.price
        },
        {
            name: (<b>Ref. Fee(%)</b>),
            sortable: true,
            selector: test => `${test.ref_percent}%`
        },
        {
            name: (<b>Ref. Amount</b>),
            sortable: true,
            selector: test => test.ref_amount
        },
        {
            name: (<b>Action</b>),
            width: "auto",
            selector: test => {
                return (
                    <DropDown text={<BiGridAlt/>}>
                        <DropdownItem onClick={() => editTestHanlder(test.id)}  >
                            <BiPencil/> Edit
                        </DropdownItem>                                        
                        <DropdownItem className="text-danger" onClick={() => deleteTest(test.id)}>
                            <BiTrash/> Delete
                        </DropdownItem>
                    </DropDown>
                );
            }
        }
    ];

    return (
        <ContentLayout>
            <div className="row">
                <div className="col-12 col-md-12 col-sm-12 shadow p-2 mb-3">
                    <Button color="success" type="button" onClick={() => setCreateNew(!createNew)}>Create New Test</Button>
                </div>
            </div>
            <div className="row">
                <div className='col-12 col-md-12 col-sm-12 border rounded shadow position-relative' style={{ minHeight: "80vh" }}>
                    { isLoading && <Preloader /> }
                    {isError && <InfoAlert message={isError} />}
                    {
                        !isLoading && !isError && tests && <DataTable columns={columns} data={tests} customStyles={customStyle} pagination />
                    }
                </div>
                <Offcanvas
                    direction="end"
                    isOpen={createNew}
                    fade={true}
                    toggle={()=> setCreateNew(!createNew)}
                >
                    <OffcanvasHeader toggle={()=> setCreateNew(!createNew)}>
                        {!editTest ? "Create New Test" : "Update Test Information" }
                    </OffcanvasHeader>
                    <OffcanvasBody>
                        <AddTest
                            editTest={editTest}
                            saveTest={saveTest}
                            categories={categories}
                        />
                    </OffcanvasBody>
                </Offcanvas>
            </div>
        </ContentLayout>
    );
};

export default React.memo(Test);