import { useState, useEffect, React } from "react";

function Col(props) {
    const [name, setName] = useState("");

    
    useEffect(() => {
        setName(props.name);
      
        
    });

    
    const size = props.size.split(" ").map(size => "col-" + size).join(" ");

    return <div style={props.style} id={`${props.id}`}
        className={`${size} ${name} d-flex flex-row justify-content-center align-items-center`} >{props.children}
    </div>;

}

export default Col;
