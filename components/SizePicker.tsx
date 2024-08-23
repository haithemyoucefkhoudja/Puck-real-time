import { useState } from "react";
import AutoSuggestComponent from "./ui/AutoComplete";
import SelectionOptions from "./ui/SelectionOptions";
type TSizePicker = {
  options:Array<string>,
  TailwindMap:Record<symbol ,Array<string>>,
  presecsessor:string;
  cssRule:string;
  handleDimensionChange:(dimension: string, value: string)=>void
  dimensions:Record<string, any>
}
export default function SizePicker({TailwindMap, options, presecsessor, cssRule, dimensions, handleDimensionChange}:TSizePicker) {
    const [values, setValues] = useState<Array<string>>(TailwindMap[options[0]])
    const [unit, setUnit] = useState(options[0]);
  return (
    <div className='flex justify-between space-x-1'>
        <AutoSuggestComponent dimensions={dimensions} handleDimensionChange={handleDimensionChange}  unit={unit} cssRule={cssRule} presecsessor={presecsessor}  values={values} />
        <SelectionOptions onChange={(current)=>{
            setValues(TailwindMap[current])
            setUnit(current);
        }} status={options}/>
    </div>
  )
}
