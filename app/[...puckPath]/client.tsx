"use client";

import type { Data } from "@measured/puck";
import { Render } from "@measured/puck";
import config from "../../puck.config";
import { useInsertionEffect } from "react";

export function Client({ data }: { data: Data }) {
  useInsertionEffect(() => {
    if(data.content){
      data.content.map(ele=>{
        
        const style_name = ele.props.worker?.style_name + '.css';
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `/uploads/${style_name}`;
        link.id = 'dynamic-stylesheet';
        document.head.appendChild(link);
      })
    }
  }, []);
  return <Render  config={config} data={data} />;
}
