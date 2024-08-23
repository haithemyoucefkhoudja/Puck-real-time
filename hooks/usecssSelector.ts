import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const useActivatedCssRule = (targetParams:string[][]) => {
  const [cssRule, setCssRule] = useState(targetParams[0]);
  const searchParams = useSearchParams();

  useEffect(() => {
    let activatedParam = null;
    for (const param of targetParams) {
      if (searchParams.has(param[0])) {
        activatedParam = param;
        break;
      }
    }
    if (activatedParam) {
      setCssRule(activatedParam);
    }
  }, [searchParams, targetParams]);

  return cssRule;
};

export default useActivatedCssRule;
