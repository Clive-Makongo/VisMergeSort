import React from "react";

function Col(props) {
    const size = props.size.split(" ").map(size => "col-" + size).join(" ");

    return <div style={props.style} id={`${props.id}`}
        className={`${size} d-flex flex-row justify-content-center align-items-center`} >{props.children}
    </div>;
}

export default Col;
