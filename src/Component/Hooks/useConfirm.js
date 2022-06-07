import { confirm as confirm_action } from "react-confirm-box";
import { Button } from "reactstrap";
import React from "react";

function useConfirm() {
    const option = {
        closeOnOverlayClick: true,
        render : (message, onConfirm, onCancel) => {
            return (
                <>
                <div 
                    style={{
                        position: "fixed", 
                        top: 0,left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0,0,0,0.5)"
                    }}
                    onClick={onCancel}
                >
                    <div 
                        className="p-3 rounded border bg-light shadow-sm" 
                        style={{
                            width:"350px",
                            position:"relative",
                            top:"50%",
                            left:"50%",
                            transform: "translate(-50%, -50%)"
                        }}
                    >
                        <h5 className={'text-danger mb-3'}>{message}</h5>
                        <Button color="primary" onClick={onConfirm}>Confirm</Button> &nbsp;
                        <Button color="danger" outline onClick={onCancel}>Cancel</Button>
                    </div>
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