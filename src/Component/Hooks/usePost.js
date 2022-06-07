import axios from "axios";

export default function usePost(){
    const sendPost = function(url, data, carryBag=null) {
        const {formik=null, storeState=null,cb=null} = carryBag;
        return axios.post(url, data).then(res => {
            // created successfully message
            if(res.status === 201) {
                if(formik) {
                    const {resetForm} = formik;
                    resetForm();
                }
                if(storeState) {
                    storeState(oldState => [res.data.data, ...oldState]);
                }
                if(cb){
                    cb(res.data);
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
                    if(formik) {
                        const {setErrors} = formik;
                        const errors = err.response.data.errors;
                        setErrors(errors)
                    }
                }
                if(err.response.status === 500) {
                    throw new Error('Server not found');
                }
                throw new Error(err.response.data.message ? err.response.data.message: err.response.statusText);
            }else if(err.request) {
                throw new Error(err.request.data.message);
            } else {
                throw new Error(err.message ? err.message:"Something went worng");
            }
        });
    };
    return {sendPost};
};