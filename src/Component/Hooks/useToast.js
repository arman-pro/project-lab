import { toast } from "react-toastify";
import {useCallback} from "react";

function useToast() {
    const notify = useCallback((promise) => {
        toast.promise(promise, {
            pending: "Pealse wait a  moment...",
            success: {
                render({data}) {
                    return `${data}`
                }
            },
            error: {
                render({data}) {
                    return `${data.message}`;
                }
            }
        });
    }, []);
    return notify;
}

export default useToast;