import React, {useEffect, useState, useCallback} from "react";
import { useFormik } from "formik";
import { Form, FormGroup,Button } from "reactstrap";
import InputField from "../../Form/InputField";
import co_validation from "./co_validation";
import ContentLayout from "../../layout/ContentLayout";
import {useParams} from "react-router-dom";
import useGet from "../../Hooks/useGet";
import useToast from "../../Hooks/useToast";
import usePut from "../../Hooks/usePut";

function EditCo() {
    const [isDisable, setIsDisable] = useState(true);
    const {sendRequest} = useGet();
    const {sendPut} = usePut();
    const notify = useToast();
    let params = useParams();
    const formik = useFormik({
        initialValues : {full_name: '', code: '', phone: '', address: ''},
        validationSchema : co_validation,
        onSubmit : (value, formProps) => notify(sendPut(`/cos/${params.id}`, value, {error}))
    });

    /**
     * this is a callback function when put data for updated and if occurs any error then trigger it
     * @param {object} err from server return
     */
    function error(err) {
        formik.setErrors(err);
    };

    const setData = useCallback((data) => {
        formik.setValues(data);
        setIsDisable(false);
    }, []);

    useEffect(()=> {
        return sendRequest(`/cos/${params.id}`, setData);
    }, [sendRequest, params, setData]);

    return (
        <ContentLayout>
            <div className="row">
                <div className="col-8 col-md-8 m-auto col-sm-12 rounded border p-3 shadow">
                    <h4>Edit CO Information</h4>
                    <Form onSubmit={formik.handleSubmit}>
                        <FormGroup className='mb-2'>
                            <InputField
                                formik={formik}
                                input={{
                                    name: "full_name",
                                    type: "text",
                                    label: "Name",
                                    id: "name",
                                }}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <InputField 
                                formik={formik}
                                input={{
                                    name: "code",
                                    type: "text",
                                    label: "Code",
                                    id:"code",
                                }}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <InputField 
                                formik={formik}
                                input={{
                                    name: "phone",
                                    type: "tel",
                                    label: "Phone",
                                    id:"phone"
                                }}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <InputField 
                                formik={formik}
                                input={{
                                    name: "address",
                                    type: "text",
                                    label: "Address",
                                    id:"address"
                                }}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                        <Button color="success" type="submit" disabled={isDisable}>
                            Save
                        </Button>
                        <Button color="danger" className="float-end" type="button" onClick={formik.resetForm}>
                            Clear
                        </Button>
                        
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </ContentLayout>
       
    );
};

export default EditCo;