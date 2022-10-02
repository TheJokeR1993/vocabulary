

const LookGame =({arr})=>{
 
return arr.map((i,index)=>{
     return  <div className="show_item" key={index}>
            <h2>{i[0]}</h2>
            <div>
            <p>{i[1]}</p>
            {i[1].toLowerCase() ==i[2].toLowerCase()
            ?''
            : <p  className="errorSpan">{i[2]}</p> }
           
            </div>
          
        </div>
    })
       
    
}

export default LookGame