import React, {  useState } from "react";
import Autosuggest from "react-autosuggest";
import { useClassName } from "../../providers/classNameProvider";
type TAutoSuggestComponent = {
  values:string[],
  presecsessor:string,
  unit: string,
  cssRule:string;
};
function getStyleForRule(rule) {
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(rule));
  return styleElement;
}

function AutoSuggestComponent ({values, presecsessor, unit, cssRule}:TAutoSuggestComponent) {
  
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const {appendClassName, injectRuleCss, removeRuleCss, removeClassName, OldValue} = useClassName()
  
  
  const onChange = (event, { newValue }) => {
    const Key = `${cssRule}`
    setValue(newValue);
    if(!newValue) {
      //removeRuleCss(Key); 
      removeClassName(presecsessor); return;
    }
    
    if(!values.includes(newValue)) {
      const unitValue = `${newValue}${unit}`;
      console.log('newValue:', newValue);
      injectRuleCss(`
      .${presecsessor}\\[${unitValue}\\] {
        ${cssRule}: ${unitValue};
      }
      `)

      appendClassName(presecsessor, `[${unitValue}]`)
      return;
    }

    appendClassName(presecsessor, newValue)
  };
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(() => getSuggestions(value));
  };
  

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: cssRule,
    value,
    onChange: onChange
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : values.filter(
          (val) => val.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div className="p-3  border border-1 cursor-pointer">{suggestion}</div>
  );
  
  return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={{
            
          suggestionsList:' max-h-48 overflow-auto absolute bg-white w-48 ',
          //container:'absolute bg-white',
          input: "w-full p-2 border border-gray-300 rounded-lg"
        }}
      />
  );
}
export default AutoSuggestComponent;
