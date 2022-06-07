import { useFormik } from "formik";
import React, {useMemo, useEffect} from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import InputField from "../../Form/InputField";
import InputWithButton from "../../Form/InputWithButton";
import ContentLayout from "../../layout/ContentLayout";
import { category_initial, category_validation } from "./cateogry_field";
import useGetLoader from '../../Hooks/useGetLoader';
import usePut from '../../Hooks/usePut';
import { useParams } from "react-router-dom";
import Preloader from "../../Loader/Preloader";
import InfoAlert from "../../OtherComp/InfoAlert";
import useToast from "../../Hooks/useToast";

function GenerateButton({onClickHandler}) {
    return (
        <Button type="button" color="dark" onClick={onClickHandler}>Generate</Button>
    )
}

const CategoryEdit = () => {
    const {sendRequest, isLoading, isError} = useGetLoader();
    const notify = useToast();
    const {sendPut} = usePut();
    const {id} = useParams();
    const {setValues, getFieldProps, errors, touched, handleSubmit, resetForm} = useFormik({
        initialValues: category_initial,
        validationSchema: category_validation,
        onSubmit: (value) => notify(sendPut(`/categories/${id}`, value, {error:errors,success:setValues}))
    });

    useEffect(()=> {
        return sendRequest(`/categories/${id}`, setValues);
    }, [sendRequest, id, setValues]);

    const formik = useMemo(() => {
        return {getFieldProps, errors, touched};
    }, [getFieldProps, errors, touched]);

    const {name_input, code_input} = useMemo(() => {
        return {
            name_input: {
                name: "name",
                type: "text",
                label: "Name",
                id: "name",
                placeholder: "write category"
            },
            code_input : {
                name: "code",
                type: "tel",
                label: "Code",
                id: "code",
                placeholder: "write code"
            }
        }
    }, []);

    function generateCode() {
        let gencode = `${new Date().valueOf()}`.substr(5);
        setValues(prevState => {
            return {...prevState, code: gencode }
        });
    }

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
                <Form onSubmit={handleSubmit}>
                    <h4>Category Edit</h4>
                    <FormGroup>
                        <InputField
                            formik={formik}
                            input={name_input}
                        />
                    </FormGroup>
                
                    <FormGroup>
                        <InputWithButton
                            formik={formik}
                            input={code_input}
                            leftButton={<GenerateButton onClickHandler={generateCode} />}
                        />
                    </FormGroup>
                    <FormGroup check inline>
                        <Input
                            type="checkbox"
                            onChange={getFieldProps('is_pathology').onChange}
                            value={true}
                            checked={getFieldProps('is_pathology').value ? true: false}
                            id="is_pathology"
                        />
                        <Label for="is_pathology" check>Set For Pathology</Label>
                    </FormGroup>
                    <FormGroup className="mb-2">
                        <Button type="submit" color="success">Save</Button>
                        <Button type="button" className="float-end" color="danger" onClick={resetForm}>Clear</Button>
                    </FormGroup>
                </Form>
                </>
                )
            }
        </div>
        </div>
        </ContentLayout>
    );
};

export default React.memo(CategoryEdit);