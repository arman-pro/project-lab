import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import ContentLayout from '../../layout/ContentLayout';
import { patient_field, patient_validation } from './patientField';
import { useFormik } from "formik";
import InputField from '../../Form/InputField';
import Select from 'react-select';
import { BiTrash } from "react-icons/bi";
import useGetLoader from '../../Hooks/useGetLoader';
import Preloader from '../../Loader/Preloader';
import InfoAlert from '../../OtherComp/InfoAlert';
import usePost from '../../Hooks/usePost';
import useToast from '../../Hooks/useToast';

const AddPatient = () => {
    const discount_box = useRef(null);
    const {sendPost} = usePost();
    const notify = useToast();
    const {values, setValues, getFieldProps, errors, touched, handleSubmit, resetForm} = useFormik({
        initialValues: patient_field,
        validationSchema: patient_validation,
        onSubmit : (value, form) => notify(sendPost(`/patients`, value, {formik:form}))
    });
    const [testValue, setTestValue] = useState('');

    const [referncesPerson, setRefernces] = useState({
        ref_co: null, ref_doctors : null, all_tests: null
    });
    const {sendRequest, isLoading, isError} = useGetLoader();

    const formik ={getFieldProps, errors, touched};

    const {name, phone, age, gender, payment, discount, notes, reference_no, report_date, delivery_time} = useMemo(() => {
       return {
        name: {
            name: "name",
            type: "text",
            label: "Name",
            id: "name",
            placeholder: "Patient Name"
        },
        phone: {
            name: "phone",
            type: "tel",
            label: "Patient Phone",
            id: "phone",
            placeholder: "Patient Phone"
        },
        age: {
            name: "age",
            type: "number",
            label: "Patient Age",
            id: "age",
            placeholder: "Patient Age",
            step: "any",
            min: "0"
        }, 
        gender: {
            name: "gender",
            type: "select",
            label: "Gender",
            id: "gender"
        },
        payment: {
            name: "cash_payment",
            type: "number",
            label: "Payment",
            id: "payment",
            placeholder: "Payment Amount"
        },
        discount: {
            name: "discount",
            type: "number",
            id: "discount",
            label: "Discount (Amount)",
            placeholder: "Discount (Amount)"
        },
        notes: {
            name: "notes",
            type:"textarea",
            label: "Notes",
            id: "note",
            placeholder: "Notes"
        },
        reference_no: {
            name: "reference_no",
            type: "text",
            label: "Reference No.",
            id: "reference",
            placeholder: "Reference"
        },
        report_date: {
            name: "report_date",
            type: "date",
            label: "Report Date",
            id: "report_date"
        },
        delivery_time : {
            name: "delivery_time",
            type: "datetime-local",
            label: "Delivery Time",
            id: "datetime_local"
        }

       }
    }, []);

    useEffect(() => {
        return sendRequest(`/get-co-docotrs-list`, (data) => {
           if(data && data.cos && data.doctors) setRefernces(pre => {
                return {...pre, ref_co: data.cos, ref_doctors: data.doctors, all_tests: data.tests}
           });
        });
    }, [sendRequest]);

    const agentHandler = (props) => {
        touched['ref_co'] = true;
        if(props) {
            let {value} = props;
            setValues(preValues => {
                return {...preValues, ref_co: value};
            });
        } else {
            setValues(preValues => {
                return {...preValues, ref_co: ""};
            });
        }
        return;
    };

    const doctorHandler = (props) => {
        touched['ref_doctor'] = true;
        if(props) {
            let {value} = props;
            setValues(preValues => {
                return {...preValues, ref_doctor: value};
            });
        } else {
            setValues(preValues => {
                return {...preValues, ref_doctor: ""};
            });
        }
        return;
    };

    const handleDiscount = (e) => {
        let discount_percent = e.target.value;
        discount_box.current.value = discount_percent;
        let discount_amount = (values.total * discount_percent) / 100;
        setValues(preValues => {
            return {...preValues, discount:discount_amount,  grand_total: (preValues.total - discount_amount)};
        });
        return;
    };

    const ref_co_class = 'form-control p-0 border-0 '+touched['ref_co'] && errors['ref_co'] ? ' is-invalid' : '';
    const ref_doctor_class = 'form-control p-0 border-0 '+touched['ref_doctor'] && errors['ref_doctor'] ? ' is-invalid' : '';

    const handleTestSelect = (value) => {
        if(value) {
            setValues(preValues => {
                let pretest = preValues.tests;
                let newTest = [...pretest, value];
                let total = newTest.map(a => +a.price).reduce((a,b) => a+=b)
                return {...preValues, tests:newTest, total: total };
            });
            setTestValue('');
            return;
        };
        return;
    };

    const discount_formik = {
        getFieldProps : (name) => {
            // let {onChange} = getFieldProps(name);
            let customeOnChange = (e) => {
                let discount_amount = e.target.value;
                let discount_percent = (100 * discount_amount) / values.total;
                discount_box.current.value = Number(discount_percent).toFixed(2);
                setValues(preValues => {
                    return {...preValues, discount:discount_amount,  grand_total: (preValues.total - discount_amount)};
                });
                // onChange(e);
                return;
            }
            return {...getFieldProps(name), onChange:customeOnChange};
        },
        errors, touched
    };

    const saveDraftPatient = async (value, form) => {
        let draftList = localStorage.getItem('patient_draft') ? JSON.parse(localStorage.getItem('patient_draft')) : null;
        if(draftList) {
            let newDraft = [...draftList, value];
            localStorage.setItem("patient_draft",JSON.stringify(newDraft));
        } else {
            let newDraft = [value];
            localStorage.setItem("patient_draft",JSON.stringify(newDraft));
        }
        form.resetForm();
        return;
    }

    const handleDraftSubmit = () => {
        alert('working...');
        // setValues(preState => {
        //     return {...preState, isDraft: true};
        // });
        // handleSubmit();
        return;
    };

    const removeTest = (id) => {
        setValues(preTest => {
            let newTest = [...preTest.tests];
            let filter_test = newTest.filter(test => +test.value !== +id);
            return {...preTest, tests: filter_test};
        });

        return;
    }

    const draftItem = localStorage.getItem('patient_draft') ? JSON.parse(localStorage.getItem('patient_draft')) : null;

    const {tests} = values;
    const {ref_co, ref_doctors, all_tests} = referncesPerson;

    return (
        <ContentLayout>
            {
                !isLoading && draftItem && (<div className="row">
                <div className="col-12 col-md-12 col-sm-12 shadow p-2 mb-3">
                    <p className="p-0 text-muted text-center m-0"><small>Draft List</small></p>
                    {
                        draftItem && 
                        draftItem.map((draft) => (
                            <Button color="primary" className="m-1" size="sm" type="button" outline>{draft.name}</Button>)
                        )
                    }
                </div>
            </div>)
            }
            <div className="row">
                <div className='col-12 col-md-12 col-sm-12 border rounded shadow position-relative p-3 bg-light' style={{ minHeight: "100vh",fontSize:"15px" }}>
                    { isLoading && <Preloader /> }
                    {   isError && <InfoAlert message={isError} />}
                    { !isLoading &&!isError && (<><h5>Add New Patient</h5>
                    <Form method="POST" onSubmit={handleSubmit}>
                        <Row>
                            <Col lg="4" md="4" sm="12">
                                <FormGroup>
                                    <InputField
                                        formik={formik}
                                        input={reference_no}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="4" md="4" sm="12">
                                <FormGroup>
                                    <InputField
                                        formik={formik}
                                        input={report_date}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="4" md="4" sm="12">
                                <FormGroup>
                                    <InputField
                                        formik={formik}
                                        input={delivery_time}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="4" md="4" sm="12">
                                <FormGroup>
                                <InputField
                                    formik={formik}
                                    input={name}
                                />
                                </FormGroup>
                            </Col>
                            <Col lg="4" md="4" sm="12">
                                <FormGroup>
                                    <InputField
                                        formik={formik}
                                        input={phone}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="4" md="4" sm="12">
                                <FormGroup>
                                <InputField
                                        formik={formik}
                                        input={age}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="4" md="4" sm="12">
                                <FormGroup>
                                    <InputField
                                        formik={formik}
                                        input={gender}
                                    >
                                       <option value="" hidden>Select Gender</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="3">Other</option>
                                    </InputField>
                                </FormGroup>
                            </Col>
                            <Col lg="4" md="4" sm="12">
                                <FormGroup>
                                    <Label htmlFor="ref_co">Agent/CO</Label>
                                    <Select
                                        className={ref_co_class}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={true}
                                        onChange={agentHandler}
                                        name="ref_co"
                                        id="ref_co"
                                        options={ref_co}
                                        placeholder="Type Agent/CO..."
                                        style={{zIndex:"100"}}
                                    />
                                    {
                                        touched['ref_co'] && errors['ref_co'] && (<FormFeedback>{errors['ref_co']}</FormFeedback>) 
                                    }
                                </FormGroup>
                            </Col>
                            <Col lg="4" md="4" sm="12">
                                <FormGroup>
                                    <Label htmlFor='ref_doctor'>Ref. Doctor</Label>
                                    <Select
                                        className={ref_doctor_class}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={true}
                                        onChange={doctorHandler}
                                        name="ref_doctor"
                                        id="ref_doctor"
                                        options={ref_doctors}
                                        placeholder="Type Doctor..."
                                        style={{zIndex:"100"}}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12" sm="12">
                                <Label htmlFor='test'>Select Test</Label>
                                <Select
                                    className={"form-control p-0 border-0"}
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={true}
                                    onChange={handleTestSelect}
                                    name="search_test"
                                    id="search_test"
                                    options={all_tests}
                                    placeholder="Type test name..."
                                    style={{zIndex:"100"}}
                                    value={testValue}
                                />
                            </Col>
                            {
                                touched['tests'] && errors.tests && (
                                    <small className="text-danger">
                                        {errors.tests}
                                    </small>
                                )
                            }
                        </Row>
                        <Row>
                            <Col className="mt-3" lg="12" sm="12">
                                <table className="table">
                                    <thead className="bg-light text-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Code</th>
                                            <th>Category</th>
                                            <th>Net Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    {
                                        tests.length === 0 && (<tr><td colSpan="6" className="text-center">No Test Found</td></tr>)
                                    }
                                    {
                                        tests.length > 0 && tests.map((test, index) => (<tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{test.label}</td>
                                            <td>{test.code}</td>
                                            <td>{test.category}</td>
                                            <td>{test.price}</td>
                                            <td>
                                                <Button 
                                                    type="button"
                                                    className="btn-sm" 
                                                    color="danger"
                                                    onClick={() => removeTest(test.value)}
                                                ><BiTrash/></Button>
                                            </td>
                                        </tr>))
                                    }
                                    </tbody>
                                    <tfoot className="bg-light text-dark">
                                        <tr>
                                            <th colSpan="4">
                                                Total
                                            </th>
                                            <th colSpan="2">{values.total ? values.total : "0.00"}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="4" md="4" sm="12">
                                <FormGroup>
                                    <Label>Discount(%)</Label>
                                    <Input 
                                        ref={discount_box} 
                                        value={discount_box.current ? discount_box.current.value : ""} 
                                        onChange={handleDiscount} 
                                        min="0" 
                                        step="any"
                                        type="number" 
                                        placeholder="Discount(%)"
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="4" md="4" sm="12">
                                <FormGroup>
                                    <InputField
                                        formik={discount_formik}
                                        input={discount}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="4" md="4" sm="12">
                                <FormGroup>
                                    <InputField
                                        formik={formik}
                                        input={payment}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12">
                                <FormGroup>
                                    <InputField
                                        formik={formik}
                                        input={notes}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12">
                                <table className='table'>
                                    <tbody className="bg-secondary text-light">
                                        <tr>
                                            <td>Total ({values.total ?? 0})</td>
                                            <td>Discount ({values.discount ?? 0})</td>
                                            <td>Grand Total ({values.grand_total ?? 0})</td>
                                            <td>Payment Amount ({values.cash_payment ?? 0})</td>
                                            <td>Due Amount ({(values.grand_total - values.cash_payment) ?? 0})</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col lg="12">
                                <Button type="submit" color="success">Create</Button> {" "}
                                <Button type="button" color="primary" onClick={handleDraftSubmit}>Draft</Button> {" "}
                                <Button type="button" className="float-end" color="danger" onClick={resetForm}>Clear</Button> {" "}
                            </Col>
                        </Row>
                    </Form>
                    </>)
                }
                </div>
            </div>
        </ContentLayout>
    );
};

export default React.memo(AddPatient);