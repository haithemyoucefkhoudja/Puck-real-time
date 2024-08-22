import { useState, useMemo } from 'react';
type Direction = {
  l:number,
  r:number,
  b:number,
  t:number,
}
type Value = Direction |  number;

type BoxValues = { m: Value; b: Value; p: Value; w: Value; h: Value; }
const isDirections = (param:Value):param is Direction  => {
  return (
    typeof param === 'object' &&
    param !== null &&
    'l' in param &&
    'r' in param &&
    'b' in param &&
    't' in param &&
    typeof (param as Direction).l === 'number' &&
    typeof (param as Direction).r === 'number' &&
    typeof (param as Direction).b === 'number' &&
    typeof (param as Direction).t === 'number'
  );
}
const useBoxModel = (initialValues:BoxValues) => {
  const [margin, setMargin] = useState(initialValues.m || 20);
  const [border, setBorder] = useState(initialValues.b || 10);
  const [padding, setPadding] = useState(initialValues.p || 30);
  const [contentWidth, setContentWidth] = useState(initialValues.w || 100);
  const [contentHeight, setContentHeight] = useState(initialValues.h || 50);
  
  const boxStyle = useMemo(() => ({
    m: `${margin}`,
    b: `${border}px solid #a0522d`,
    p: `${padding}px`,
    w: `${contentWidth}px`,
    h: `${contentHeight}px`,
  }), [margin, border, padding, contentWidth, contentHeight]);

  return {
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
  };
};

export default useBoxModel;
