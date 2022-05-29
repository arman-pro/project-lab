import { confirm as confirm_action } from "react-confirm-box";
import { Button } from "reactstrap";

function useConfirm() {
    const option = {
        closeOnOverlayClick: true,
        render : (message, onConfirm, onCancel) => {
            return (
                <>
                    <div className="p-3 rounded border bg-light shadow-sm">
                        <h5 className={'text-danger'}>{message}</h5>
                        <Button color="primary" onClick={onConfirm}>Confirm</Button> &nbsp;
                        <Button color="danger" outline onClick={onCancel}>Cancel</Button>
                    </div>
                </>
            );
        }
    }

    async function confirm(message) {
        return await confirm_action(message, option);
    }

    return {confirm};
}

export default useConfirm;