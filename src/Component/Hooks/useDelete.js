import {useCallback} from "react";
import axios from "axios";

function useDelete(){
    const sendDelete = useCallback((url, cb=null) => {
        return axios.delete(url).then(function(res){
            // 200 status code for success operation
            if(res.status === 200) {
                if(cb) {
                    cb();
                }
                return res.data.message;
            }
        }).catch(function(err){
            if (err.response) {
                if(err.response.status === 404) {
                    throw new Error('Data not found');
                }
                throw new Error(err.response.data.message ? err.response.data.message: err.response.statusText);
            }else if(err.request) {
                throw new Error(err.request.data.message ? err.request.data.message: err.response.statusText ? err.response.statusText : "Network error");
            } else {
                throw new Error("Something went worng");
            }
        });
    }, []);
    
    return {sendDelete};
};

export default useDelete;