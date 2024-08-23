import { ChangeEvent, useEffect, useState } from 'react';
import SizePicker from './SizePicker';
import { useSearchParams } from 'next/navigation';
import useActivatedCssRule from '../hooks/usecssSelector';
const tailwindsizeClasses = {
    default:{
    px: [],
    rem: [  
    ],
    '%': [],
    dvh: [],
    lvh: [],
    svh: [],
    constants: [
      '0',    
      '0.5',  
      '1',    
      '1.5',  
      '2',    
      '2.5',  
      '3',    
      '3.5',  
      '4',    
      '5',    
      '6',    
      '7',    
      '8',    
      '9',    
      '10',   
      '11',   
      '12',   
      '14',   
      '16',   
      '20',   
      '24',   
      '28',   
      '32',   
      '36',   
      '40',   
      '44',   
      '48',   
      '52',   
      '56',   
      '60',   
      '64',   
      '72',   
      '80',   
      '96',
      'px',
      'auto',        
      'full',        
      'screen',      
      'fit',
      'svh',
      'lvh',
      'dvh',
      '1/2',  
      '1/3',  
      '2/3',  
      '1/4',  
      '2/4',  
      '3/4',  
      '1/5',  
      '2/5',  
      '3/5',  
      '4/5',  
      '1/6',  
      '2/6',  
      '3/6',  
      '4/6',  
      '5/6',  
      'full'
    ]
    
},
maxmin:{
    px:[],

    rem: [],
    constants:[
        'px',
        'full',
        'screen',
        'none',
        'min',
        'max',
        'fit',
        '0',    
        '0.5',  
        '1',    
        '1.5',  
        '2',    
        '2.5',  
        '3',    
        '3.5',  
        '4',    
        '5',    
        '6',    
        '7',    
        '8',    
        '9',    
        '10',   
        '11',   
        '12',   
        '14',   
        '16',   
        '20',   
        '24',   
        '28',   
        '32',   
        '36',   
        '40',   
        '44',   
        '48',   
        '52',   
        '56',   
        '60',   
        '64',   
        '72',   
        '80',   
        '96',
        'dvh',
        'svh',
        'lvh'
    ],
    dvh: [],  
    lvh: [],
    svh: [],


}
  };

const targetParams = [['height', 'h-'], ['width', 'w-']];

const SizeChanger = () => {
    const [checked, setChecked] = useState(false);
    const [dimensions, setDimensions] = useState({
      'height':{'min-height': '',
      'max-height': '',
      'height': ''},
      'width':
      {'min-width': '',
      'max-width': '',
      'width': ''}
    });
    const cssRule = useActivatedCssRule(targetParams);
    const handleDimensionChange = (dimension: string, value: string) => {
      setDimensions((prevDimensions) => ({
        ...prevDimensions,
        [cssRule[0]]: {
          ...prevDimensions[cssRule[0]],
          [dimension]: value,
        },
      }));
    };
    function changed(event: ChangeEvent<HTMLInputElement>): void {
        setChecked(event.target.checked)
    }

  return (
    <section className='flex flex-col mt-5 space-y-3'>
        <SizePicker dimensions={dimensions} handleDimensionChange={handleDimensionChange}  presecsessor={cssRule[1]} cssRule={cssRule[0]}  TailwindMap={tailwindsizeClasses['default']} options={Object.keys(tailwindsizeClasses['default'])}/>
        <div className="flex items-center">
            <input onChange={changed} id="bordered-checkbox-1" type="checkbox"  name="bordered-checkbox" className="w-4 4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "/>
            <label  className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Max-Min Values</label>
        </div>
        <div className="space-y-2 transition-opacity duration-400 ease-in-out min-h-[5px]" hidden={!checked}>
            <SizePicker dimensions={dimensions} handleDimensionChange={handleDimensionChange}  presecsessor={`min-${cssRule[1]}`} cssRule={`min-${cssRule[0]}`} TailwindMap={tailwindsizeClasses['maxmin']} options={Object.keys(tailwindsizeClasses['maxmin'])}/>
            <SizePicker dimensions={dimensions} handleDimensionChange={handleDimensionChange} presecsessor={`max-${cssRule[1]}`} cssRule={`max-${cssRule[0]}`} TailwindMap={tailwindsizeClasses['maxmin']} options={Object.keys(tailwindsizeClasses['maxmin'])}/>
        </div>
    </section>
  );
};

export default SizeChanger;
