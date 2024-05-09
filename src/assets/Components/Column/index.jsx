import React from "react";

function Col(props) {
    const size = props.size.split(" ").map(size => "col-" + size).join(" ");

    return <div style={props.style} id={props.key}
        className={`${size} d-flex flex-row justify-content-between`}>{props.children}
    </div>;
}

export default Col;
