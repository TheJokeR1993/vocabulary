import { useState } from "react";
import LookGame from "./LookGame";


const RezultItem =({number,check,smile})=>{
    
    const [show,setShow]=useState(false)
    
  const count= number*10
    return <div className="rezultItem">
        <div className="answer">
            <img alt="" src={smile} />
           <h2>{number} / 10</h2>
           <button onClick={()=>{setShow(!show)}}>{show?'Hide':'Show'}</button>
        </div>
           
           <div className="show_answer">{show&&<LookGame arr={check} />}</div>
         </div>
       
    
}

export default RezultItem 