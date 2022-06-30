import React,{memo} from 'react';
import { FormFeedback, Input, Label } from 'reactstrap';

const InputField = (props) => {
    const {formik, input, children} = props;
    
    return (
        <React.Fragment>
            <Label htmlFor={input.id}>{input.label}</Label>
            {input.type !== 'select' && (<Input 
                {...input}
                onBlur={formik.getFieldProps(input.name).onBlur}
                onChange={formik.getFieldProps(input.name).onChange}
                value={formik.getFieldProps(input.name).value !== null ? formik.getFieldProps(input.name).value : ''}
                invalid={formik.touched[input.name] && formik.errors[input.name] ? true : false}
                />) 
            }
            {input.type === 'select' && (
                <Input 
                    {...input}
                    onBlur={formik.getFieldProps(input.name).onBlur}
                    onChange={formik.getFieldProps(input.name).onChange}
                    invalid={formik.touched[input.name] && formik.errors[input.name] ? true : false}
                >
                    {children}
                </Input>
                ) 
            }
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

export default memo(InputField);