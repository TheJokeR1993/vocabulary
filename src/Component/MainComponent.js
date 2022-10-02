import {  Route, Routes } from "react-router-dom"
import Adding from "./adding/Adding"
import RepeatContainer from "./repeat/RepeatContainer"
import Rezult from "./rezult/Rezult"
import Words from "./words/Words"

const MainComponent =()=>{
 return <div className="main">
    <Routes>
        <Route path="*" element={<Words />} />
        <Route path="adding" element={<Adding />}/>
        <Route path="repeat" element={<RepeatContainer />}/>
        <Route path="rezult" element={<Rezult />}/>
    </Routes>
 </div>
}

export default MainComponent