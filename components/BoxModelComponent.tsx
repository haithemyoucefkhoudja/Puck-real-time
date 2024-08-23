import React, { } from 'react';
import useBoxModel from '../hooks/useBoxModel'; // Import the hook
import Icons from '../svgs/Icons';
import { Button } from './ui/button';
import SizeChanger from './SizeChanger';
import { useRouter, useSearchParams } from 'next/navigation';

const ControlPanel = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  return (
    <section className="flex items-baseline flex-wrap justify-center space-x-1 space-y-2 p-4">
      <Button variant='iconText' size='iconText' onClick={()=>{
        router.push('/edit/?width',{scroll:false})

      }
      }
      className={`${searchParams.has('width') ? " bg-green-300 text-white": ""}`}
      >
        <Icons.WidthIcon className='h-5 w-5'></Icons.WidthIcon>
        <span>Width</span>
      </Button>
      
      <Button variant='iconText' size='iconText'  onClick={()=>{
        router.push('/edit/?height',{scroll:false})
      }}
      className={`${searchParams.has('height') ? " bg-green-300 text-white": ""}`}
      >
        <Icons.HeightIcon/>
        <span>Height</span>
      </Button>
    
    </section>
  );
};


const BoxModelComponent = () => {
  const {
    boxStyle,
    margin,
    setMargin,
    border,
    setBorder,
    padding,
    setPadding,
    contentWidth,
    setContentWidth,
    contentHeight,
    setContentHeight,
  } = useBoxModel({
    m: 0,
    b: 0,
    p: 0,
    w: 0,
    h: 0,
  });

  return (
<section className='flex flex-col'>    
  <ControlPanel></ControlPanel>
  <SizeChanger></SizeChanger>
</section>
);
};

export default BoxModelComponent;
