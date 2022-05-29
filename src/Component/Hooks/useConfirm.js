import React from "react";
import ConfirmBox from "../OtherComp/ConfirmBox";

function useConfirm() {
    const [confirm, setConfirm] = React.useState(false);
    const allowed = () => {
        return <ConfirmBox confirmHandler={setConfirm} />
    }

    return {allowed, confirm};
};

export default useConfirm;