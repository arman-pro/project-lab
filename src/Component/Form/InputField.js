import React from 'react';
import { FormFeedback, Input, Label } from 'reactstrap';

const InputField = ({formik, input}) => {
// {...formik.getFieldProps(input.name)}
    return (
        <React.Fragment>
            <Label htmlFor={input.id}>{input.label}</Label>
            <Input 
                {...input}
                onBlur={formik.getFieldProps(input.name).onBlur}
                onChange={formik.getFieldProps(input.name).onChange}
                value={formik.getFieldProps(input.name).value !== null ? formik.getFieldProps(input.name).value : ' '}
                invalid={formik.touched[input.name] && formik.errors[input.name] ? true : false}
                />
            {
                formik.touched[input.name] && formik.errors[input.name] ? (
                    <FormFeedback>
                        {formik.errors[input.name]}
                    </FormFeedback>
                ) : null
            }
            
        </React.Fragment>
    )
}

export default React.memo(InputField);