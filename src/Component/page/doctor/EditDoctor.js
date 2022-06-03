import { useFormik } from 'formik';
import React, {useMemo, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, FormGroup } from 'reactstrap';
import InputField from '../../Form/InputField';
import useGetLoader from '../../Hooks/useGetLoader';
import usePut from '../../Hooks/usePut';
import useToast from '../../Hooks/useToast';
import ContentLayout from "../../layout/ContentLayout";
import Preloader from '../../Loader/Preloader';
import InfoAlert from '../../OtherComp/InfoAlert';
import doctor_validation from './doctor_validation';

function EditDoctor() {
    const {sendPut} = usePut();
    const notify = useToast();
    let {id} = useParams();
    const { isLoading, isError, sendRequest } = useGetLoader();
    const {setValues, setErrors, getFieldProps, errors, touched, handleSubmit, resetForm} = useFormik({
        initialValues: {name: "",email:"",phone:"", description: ""},
        validationSchema: doctor_validation,
        onSubmit : (value, formProps) => notify(sendPut(`/doctors/${id}`, value, {error: setErrors}))
    });
    

    const formik = useMemo(() => {
        return {getFieldProps, errors, touched};
    }, [getFieldProps, errors, touched]);

    useEffect(() => {
        return sendRequest(`/doctors/${id}`, setValues);
    }, [sendRequest, id, setValues]);

    return (
        <ContentLayout>
            <div className="row" >
                <div className="col-8 col-md-8 m-auto col-sm-12 rounded border p-3 shadow position-relative" style={{ minHeight: "50vh" }}>
                    {
                        isLoading && <Preloader/>
                    }
                    {
                        isError && <InfoAlert message={isError} />
                    }
                    {
                    !isLoading && !isError && (<>
                    <h4>Edit Doctor Information</h4>
                    <Form onSubmit={handleSubmit}>
                    <FormGroup className='mb-2'>
                            <InputField
                                formik={formik}
                                input={{
                                    name: "name",
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
                                    name: "email",
                                    type: "email",
                                    label: "E-mail",
                                    id:"email",
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
                                    name: "description",
                                    type: "textarea",
                                    label: "Description",
                                    id: "description"
                                }}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                        <Button color="success" type="submit">
                            Save
                        </Button>
                        <Button color="danger" className="float-end" type="button" onClick={resetForm}>
                            Clear
                        </Button>
                        
                        </FormGroup>
                    </Form> </>)
                    }
                </div>
            </div>
        </ContentLayout>
    )
};

export default EditDoctor;