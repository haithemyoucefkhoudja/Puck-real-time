import React, { createContext, useContext, useState, ReactNode, useEffect, useInsertionEffect } from 'react';
import { cn } from '../lib/utils';
import { CssWorkers } from '../lib/CssWorker';

interface ClassNameContextType {
  className: Array<string>;
  appendClassName: (presecsessor: string, value:string) => void;
  injectRuleCss: (newCssClass:string) => void;
  removeRuleCss:(cssProperty: string) => void;
  removeClassName:(presecsessor: string) => void;
  OldValue:CssWorkers
}
type Model = {onChange: (value: CssWorkers) => void, value: CssWorkers}

const ClassNameContext = createContext<ClassNameContextType | undefined>(undefined);

export const ClassNameProvider: React.FC<{ children: ReactNode } & Model> = ({ children, onChange, value }) => {
  const [_Blobobj, setBlob] = useState<Blob | null>(null);
  const [Blob_Url, setBlobUrl] = useState<string | null>(null);
  const [className, setClassName] = useState<Array<string>>([]);
  const [Rules, setRules] = useState<Set<string>>(new Set());
  const removeOldStylesheet = (linkId: string) => {
    const oldLink = document.getElementById(linkId);
    if (oldLink) {
      oldLink.parentNode.removeChild(oldLink);
    }
  };
  useEffect(() => {
    if (_Blobobj) {
      URL.revokeObjectURL(Blob_Url);
    }

    const _str = Array.from(Rules).join('\n');
    const newBlob = new Blob([_str], { type: 'text/css' });
    const newBlobUrl = window.URL.createObjectURL(newBlob);

    setBlob(newBlob);
    setBlobUrl(newBlobUrl);

  }, [Rules]);

  // Step 2: Perform the DOM manipulation in useInsertionEffect
  useInsertionEffect(() => {
    if (Blob_Url) {
      removeOldStylesheet('dynamic-stylesheet');

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = Blob_Url;
      link.id = 'dynamic-stylesheet';
      document.head.appendChild(link);
    }
  }, [Blob_Url]);

  
  const injectRuleCss = (newCssRule:string) => {
      if (!Rules.has(newCssRule)) {
        setRules(prevSet => new Set(Array.from(prevSet).concat(newCssRule)));
      }
  }

  const removeRuleCss = (cssProperty: string) => {
    setRules(prevSet => {
      const newSet = new Set(prevSet);
      newSet.delete(cssProperty);
      return newSet;
  });
  };
  const appendClassName = (presecsessor: string, value:string) => {
    setClassName(prev =>{ 
      const filtered = prev.filter(ele=>(
        !ele.startsWith(presecsessor)
    ))
      return [...filtered, `${presecsessor}${value}`]});
  };
  
  const removeClassName = (presecsessor: string) => {
    setClassName(prev =>{ 
      const filtered = prev.filter(ele=>(
        !ele.startsWith(presecsessor)
    ))
        return [...filtered];
      
    });
  };
  
  useEffect(()=>{
    onChange(new CssWorkers({className:cn(className)}))
  },[className, Rules])

  return (
    <ClassNameContext.Provider value={{ className, appendClassName, injectRuleCss, removeRuleCss, removeClassName, OldValue:value  }}>
      {children}
    </ClassNameContext.Provider>
  );
};

export const useClassName = () => {
  const context = useContext(ClassNameContext);
  if (context === undefined) {
    throw new Error('useClassName must be used within a ClassNameProvider');
  }
  return context;
};
