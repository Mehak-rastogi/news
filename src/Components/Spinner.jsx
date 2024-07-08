import React from "react";
import spinner from "./spinner.gif";

const Spinner=()=>{
    return (
      <div className="text-center ">
        <img src={spinner} style={{height:"50px",width:"50px",backgroundColor:"black"}} alt="" />
      </div>
    ); 
}
export default Spinner;