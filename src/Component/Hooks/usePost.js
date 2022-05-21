import axios from "axios";

export default function usePost(){
    const sendPost = function(url, data, formikProps = null) {
        return axios.post(url, data).then(res => {
            // created successfully message
            if(res.status === 201) {
                if(formikProps) {
                    const {resetForm} = formikProps;
                    resetForm();
                }
                return res.data.message;
            }
        }).catch(err => {
            if (err.response) {
                if(err.response.status === 422) {
                    /**
                     *  givent data is not valid and
                     * return error from serve
                     */
                    if(formikProps) {
                        const {setErrors} = formikProps;
                        const errors = err.response.data.errors;
                        setErrors(errors)
                    }
                }
                throw new Error(err.response.data.message ? err.response.data.message: err.response.statusText);
            }else if(err.request) {
                throw new Error(err.request.data.message);
            } else {
                throw new Error(err.message);
            }
        });
    } 

    return {sendPost};
};