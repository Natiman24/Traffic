import React from "react";
import "./../css/Home.css";

const data = (props) => {
    return (
        <div className="card">
            <img src={props.img}/>
            <h3>{props.header}</h3>
            <div className="info">
                <p>{props.content}</p>
            </div>
        </div>
    )
}
export default data;