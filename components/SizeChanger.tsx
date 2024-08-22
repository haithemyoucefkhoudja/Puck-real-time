import { ChangeEvent, useState } from 'react';
import SizePicker from './SizePicker';
const tailwindsizeClasses = {
    default:{
    px: [],
    rem: [  
    ],
  
    
    '%': [
        
    ],
  
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
    px:['px'],

    rem: [
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
        '96'    
    ],
    constants:[
        'full',
        'screen',
        'none',
        'min',
        'max',
        'fit'
    ],
    dvh: [
        'dvh'  
    ],  
    lvh: [
          'lvh'
    ],
    svh: [
          'svh'
    ],


}
  };
const SizeChanger = () => {
    const [checked, setChecked] = useState(false);
    function changed(event: ChangeEvent<HTMLInputElement>): void {
        setChecked(event.target.checked)
    }

  return (
    <section className='flex flex-col mt-5 space-y-3'>
        <SizePicker  presecsessor='h-' inline={'height'}  TailwindMap={tailwindsizeClasses['default']} options={Object.keys(tailwindsizeClasses['default'])}/>
        <div className="flex items-center">
            <input onChange={changed} id="bordered-checkbox-1" type="checkbox"  name="bordered-checkbox" className="w-4 4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "/>
            <label  className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Max-Min Values</label>
        </div>
        <div className="space-y-2 transition-opacity duration-400 ease-in-out min-h-[5px]" hidden={!checked}>
            <SizePicker  presecsessor='min-h-' inline={'min-height'} TailwindMap={tailwindsizeClasses['maxmin']} options={Object.keys(tailwindsizeClasses['maxmin'])}/>
            <SizePicker presecsessor='max-h-' inline={'max-height'} TailwindMap={tailwindsizeClasses['maxmin']} options={Object.keys(tailwindsizeClasses['maxmin'])}/>
        </div>
    </section>
  );
};

export default SizeChanger;
