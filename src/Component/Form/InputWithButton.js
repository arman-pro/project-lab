import React from 'react';
import { FormFeedback, Input, InputGroup, Label } from 'reactstrap';

function InputWithButton(props) {
    const {formik, input, leftButton} = props;
    return (
        <>
            {input.label && (<Label htmlFor={input.id}>{input.label}</Label>) }
            <InputGroup>
                <Input 
                    {...input}
                    onBlur={formik.getFieldProps(input.name).onBlur}
                    onChange={formik.getFieldProps(input.name).onChange}
                    value={formik.getFieldProps(input.name).value !== null ? formik.getFieldProps(input.name).value : ''}
                    invalid={formik.touched[input.name] && formik.errors[input.name] ? true : false}
                    />
                {leftButton}
                {
                    formik.touched[input.name] && formik.errors[input.name] ? (
                        <FormFeedback>
                            {formik.errors[input.name]}
                        </FormFeedback>
                    ) : null
                }
            </InputGroup>
        </>
    )
};

export default React.memo(InputWithButton);