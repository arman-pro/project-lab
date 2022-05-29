import React from "react";
import { useFormik } from "formik";
import { Button, Form, FormGroup} from "reactstrap";
import InputField from "../../Form/InputField";
import co_validation from "./co_validation";
import usePost from "../../Hooks/usePost";
import useToast from "../../Hooks/useToast";

const AddForm = ({storeState}) => {
    const {sendPost} = usePost();
    const notify = useToast();
    const formik = useFormik({
        initialValues : {full_name: '', code: '', phone: '', address: ''},
        validationSchema : co_validation,
        onSubmit : (value, formProps) => notify(sendPost('/cos', value, {formik:formProps, storeState: storeState}))
    });
    
    return (
            <Form inline className="border rounded p-3 shadow" onSubmit={formik.handleSubmit}>
                <h5 className="text-center">Create New CO</h5>
                <FormGroup className="mb-2">
                    <InputField 
                        formik={formik}
                        input={{
                            name: "full_name",
                            type: "text",
                            label: "Name",
                            id: "name"
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
                            id:"code"
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
                <Button color="success" type="submit">
                    Save
                </Button>
                <Button color="danger" className="float-end" type="button" onClick={formik.resetForm}>
                    Clear
                </Button>
                
                </FormGroup>
            </Form>
    );
};

export default React.memo(AddForm);