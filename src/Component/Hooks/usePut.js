import {useCallback} from "react";
import axios from "axios";

/**
 * usePut is custom hook for sent put request using axios
 * @returns {Object}
 */
function usePut() {
    const sendPut = useCallback(function(url, data, cbObj={}) {
        const {success= null, error= null} = cbObj;
        return axios.put(url, data).then(function(res){
            // http status code 200 for successfully updte operation
            if(res.status === 200) {
                if(success) {
                    // if operation will success then trigger this @success callback func
                    success(res.data.data);
                }
                return res.data.message;
            }
        }).catch(function(err){
            if (err.response) {
                if(err.response.status === 422) {
                    /**
                     *  givent data is not valid and
                     * return error from serve
                     */
                    if(error) {
                        /**
                         * error is error callback function 
                         * when occurs error then trigger this callback
                         * @callback
                         */
                        error(err.response.data.errors)
                    }
                }
                throw new Error(err.response.data.message ? err.response.data.message: err.response.statusText);
            }else if(err.request) {
                throw new Error(err.request.data.message);
            } else {
                throw new Error(err.message);
            }
        });
    }, []);
    return {sendPut};
};

export default usePut;