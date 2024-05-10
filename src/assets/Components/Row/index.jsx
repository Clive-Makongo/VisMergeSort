import React from "react";

function Row(props) {
    return <div id={props.id} className="row d-flex flex-row">{props.children}</div>;

}

export default Row;
