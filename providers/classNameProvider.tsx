import React, { createContext, useContext, useState, ReactNode, useEffect, useInsertionEffect } from 'react';
import { cn } from '../lib/utils';
import { CssWorker } from '../lib/CssWorker';

interface ClassNameContextType {
  classNames: Array<string>;
  appendClassName: (presecsessor: string, value:string) => void;
  injectRuleCss: (newCssClass:string) => void;
  removeRuleCss:(cssProperty: string) => void;
  removeClassName:(presecsessor: string) => void;
  OldValue:CssWorker,
}
type Model = {onChange: (value: CssWorker) => void, value: CssWorker, id: string}

const ClassNameContext = createContext<ClassNameContextType | undefined>(undefined);

export const ClassNameProvider: React.FC<{ children: ReactNode } & Model> = ({ children, onChange, value,   id }) => {
  const [styleBlobUrl, setStyleBlobUrl] = useState<string | null>(null);
  const [classNames, setClassNames] = useState<Array<string>>([]);
  const [cssRules, setCssRules] = useState<Set<string>>(() => new Set());

  const removeOldStylesheet = (linkId: string) => {
    const oldLink = document.getElementById(linkId);
    if (oldLink) {
      oldLink.parentNode.removeChild(oldLink);
    }
  };
  useEffect(() => {
    if (styleBlobUrl) {
      URL.revokeObjectURL(styleBlobUrl);
    }
    const _str = Array.from(cssRules).join('\n');
    const newBlob = new Blob([_str], { type: 'text/css' });
    const newBlobUrl = window.URL.createObjectURL(newBlob);

    setStyleBlobUrl(newBlobUrl);

  }, [cssRules]);

  useInsertionEffect(() => {
    if (styleBlobUrl) {
      removeOldStylesheet('dynamic-stylesheet');

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = styleBlobUrl;
      link.id = 'dynamic-stylesheet';
      document.head.appendChild(link);
    }
  }, [styleBlobUrl]);

  
  const injectRuleCss = (newCssRule:string) => {
      if (!cssRules.has(newCssRule)) {
        setCssRules(prev => new Set(prev).add(newCssRule));
      }
  }

  const removeRuleCss = (cssProperty: string) => {
    setCssRules(
      prev => {
        const next = new Set(prev);
        next.delete(cssProperty);
        return next;
      }
    );
  };
  const appendClassName = (presecsessor: string, value:string) => {
    setClassNames(prev =>{ 
      const filtered = prev.filter(ele=>(
        !ele.startsWith(presecsessor)
    ))
      return [...filtered, `${presecsessor}${value}`]});
  };
  
  const removeClassName = (presecsessor: string) => {
    setClassNames(prev =>{ 
      const filtered = prev.filter(ele=>(
        !ele.startsWith(presecsessor)
    ))
        return filtered;
      
    });
  };
  
  useEffect(()=>{
    onChange(new CssWorker({className:cn(classNames), blob_url:styleBlobUrl, style_name:`style-${id}`}))
  },[classNames, cssRules, styleBlobUrl])

  return (
    <ClassNameContext.Provider value={{ classNames, appendClassName, injectRuleCss, removeRuleCss, removeClassName, OldValue:value  }}>
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
