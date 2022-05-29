import {useRef, useCallback} from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { BiLoader } from "react-icons/bi";

function useGet() {
    const toastId = useRef(null);
    const loadingToastify = () => toastId.current = toast.info('Please wait', {icon:<BiLoader/>, autoClose: false,theme:"dark"});
    const toastDismiss = () => toast.dismiss(toastId.current);
    const toastError = (message) => toast.update(toastId.current, {
        type: toast.TYPE.ERROR,
        autoClose: 5000, 
        render: message
    });

    const sendRequest = useCallback((url, state=null) => {
        loadingToastify();
        const controller = new AbortController();
        axios.get(url, {signal: controller.signal}).then(res => {
            if(res.status === 200) {
                toastDismiss();
                if(state)
                    state(res.data.data);
            }
        }).catch(err => {
            if(err.response) {
                toastError(err.response.data.message ? err.response.data.message: err.response.statusText);
            } else if(err.request) {
                toastError(err.request.message ? err.request.message: err.request.statusText);
            } else {
                toastError("Something went worng");
            }
        });
        return () => {
            toastDismiss();
            controller.abort();
        }
    }, []);

    return {sendRequest};
}

export default useGet;