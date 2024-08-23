"use client";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "../../../puck.config";
function fetchBlob(url:string) {
  return new Promise<Blob>((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
         })
  .then((response) => response.blob())
  .then((blob) => {
    resolve(blob);
  })
  });
}

export function Client({ path, data }: { path: string; data: Data }) {
  return (
    <Puck
      config={config}
      data={data}
      onPublish={async (data: Data) => {
        const dataCopy:Data = JSON.parse(JSON.stringify(data));
        data.content.map(async (ele) =>  {
          const url = ele.props.worker?.blob_url;
          const style_name = ele.props.worker?.style_name + '.css';
          if (url) {
                const  cssBlob = await fetchBlob(url);
                if(cssBlob){
                  const formData = new FormData();
                  formData.append('cssFile', cssBlob, style_name);
                  
                  fetch('/api/upload-css', {
                    method: 'POST',
                    body: formData,
                  }).then(va=>{
                    const elementToUpdate = dataCopy.content.find(
                      (e) => e.props.worker?.blob_url === url
                    );
                  })
                }
        } else {
          console.error('URL is undefined or null');
        }
        })
        await fetch("/puck/api", {
          method: "post",
          body: JSON.stringify({ data:dataCopy, path }),
        });
      }}
    />
  );
}
