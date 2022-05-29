import { toast } from "react-toastify";

function useToast() {
    const notify = (promise) => {
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
    }
    return notify;
}

export default useToast;