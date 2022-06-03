import {useState, useCallback} from "react";
import axios from "axios";

function useGetLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState('');

    const sendRequest = useCallback((url, state=null) => {
        setIsLoading(true);
        setIsError('');
        if(state)
            state(null);
        const controller = new AbortController();
        axios.get(url, {signal: controller.signal}).then(res => {
            if(res.status === 200) {
                setIsLoading(false);
                setIsError('');
                if(state)
                    state(res.data.data);
            }else if(res.status === 204){
                setIsLoading(false);
                setIsError('Data not found');
            }
        }).catch(err => {
            setIsLoading(false);
            if(err.response) {
                if(err.response.status === 404) {
                    setIsError('Not found');
                }
                else if(err.response.status === 500) {
                    setIsError('Internal server error');
                }else if(err.response.status === 403) {
                    setIsError(err.response.data.message);
                }else
                    setIsError(err.response.data.message ? err.response.data.message: err.response.statusText);
            } else if(err.request) {
                setIsError(err.request.message ? err.request.message: err.request.statusText);
            } else {
                setIsError("Something went worng");
            }
        });
        return () => {
            setIsLoading(false);
            setIsError('');
            controller.abort();
        }
    }, [setIsError, setIsLoading]);

    return {sendRequest,isLoading,isError};
}

export default useGetLoader;