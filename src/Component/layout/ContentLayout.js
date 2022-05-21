import React from "react";

const ContentLayout = ({children}) => {
    return <div className="p-3 position-relative" style={{ minHeight: "100vh" }}>
        {children}
    </div>
}

export default React.memo(ContentLayout)