import React from "react";

import "../assets/scss/style_content.scss";

const ContentWrapper = ({ children }: any) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
