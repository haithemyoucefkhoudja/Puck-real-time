
import { useRef, useState } from "react";


export default function SelectionOptions({status, onChange}:{status:Array<string>, onChange:(current:string)=>void}) {
  const Dropref = useRef<null | HTMLDivElement>(null)
  const Buttonref = useRef<null |HTMLButtonElement>(null);
  const [selectedOption, setselectedOption] = useState<string>(status[0]) 
  function DropMenuEvent() {
    
    if(Dropref.current && Buttonref.current) {
      if (Dropref.current.style.display === 'none') {
        
        Dropref.current.style.display = 'block'
      } else {
        Dropref.current.style.display = 'none'; // Hide the dropdown
      }
      }
  }
  return(<>
  <button onClick={()=> DropMenuEvent()} type="button" 
  ref={Buttonref}
  className="flex min-w-20 max-w-20 items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
      <span className="text-ellipsis whitespace-nowrap overflow-hidden">
        {selectedOption}
      </span>
      <svg className=" h-4 w-4 flex-shrink-0" fill="currentColor" strokeWidth="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
</button>
<div ref={Dropref} className=" hidden absolute z-50 max-h-48 overflow-y-auto  mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
{status.map(ele => {
  if(ele == selectedOption)
    return null;
  return(
    <button   type="button" onClick={()=> {
    if(Dropref.current)
      Dropref.current.style.display = 'none'; // Hide the dropdown
    setselectedOption(ele)
    onChange(ele)
  }
  } key={ele} value={ele}  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md hover:text-gray-900" role="menuitem">{ele}</button>
)

})}
  
</div>
</>
      
      
)
}
