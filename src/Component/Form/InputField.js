import React from 'react';
import { FormFeedback, Input, Label } from 'reactstrap';

const InputField = ({formik, input}) => {

    return (
        <React.Fragment>
            <Label htmlFor={input.id}>{input.label}</Label>
            <Input 
                {...input}  
                {...formik.getFieldProps(input.name)}
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