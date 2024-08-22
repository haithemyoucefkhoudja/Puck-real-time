import { useState } from "react";
import AutoSuggestComponent from "./ui/AutoComplete";
import SelectionOptions from "./ui/SelectionOptions";
type TSizePicker = {
  options:Array<string>,
  TailwindMap:Record<symbol ,Array<string>>,
  presecsessor:string;
  inline:string;
}
export default function SizePicker({TailwindMap, options, presecsessor, inline}:TSizePicker) {
    const [values, setValues] = useState<Array<string>>(TailwindMap[options[0]])
    const [unit, setUnit] = useState(options[0]);
  return (
    <div className='flex justify-between space-x-1'>
        <AutoSuggestComponent  unit={unit} cssRule={inline} presecsessor={presecsessor}  values={values} />
        <SelectionOptions onChange={(current)=>{
            setValues(TailwindMap[current])
            setUnit(current);
        }} status={options}/>
    </div>
  )
}
