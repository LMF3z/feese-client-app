import { useState } from 'react';
import AutoSuggestComponent from 'react-autosuggest';

const AutoSuggest = (props) => {
  const {
    inputProps,
    onFetchFunction,
    renderFetchFunction,
    onCallbackFunction,
    renderItem,
  } = props;

  const [initialQuery, setInitialQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  return (
    <AutoSuggestComponent
      inputProps={{
        placeholder: inputProps.placeholder || 'placeholder',
        autoComplete: inputProps.autoComplete || 'abcd',
        name: inputProps.name || 'ausuggest',
        id: inputProps.id || 'ausuggest',
        value: initialQuery,
        onChange: (_event, { newValue }) => {
          setInitialQuery(newValue);
        },
        className: 'min-w-full h-10 input outline-none text-base z-0',
        autocomplete: 'off',
      }}
      suggestions={suggestions}
      onSuggestionsFetchRequested={async ({ value }) => {
        if (!value) {
          return setSuggestions([]);
        }
        const response = await onFetchFunction(value);
        setSuggestions(response.map((item) => renderFetchFunction(item)));
      }}
      onSuggestionsClearRequested={() => {
        setSuggestions([]);
      }}
      getSuggestionValue={(suggestion) => suggestion.name}
      renderSuggestion={(suggestion) => renderItem(suggestion)}
      onSuggestionSelected={(event, { suggestion, method }) => {
        if (method === 'enter') {
          event.preventDefault();
        }
        onCallbackFunction(suggestion);
      }}
      theme={{
        suggestionsContainer:
          'max-h-80 bg-primaryColor z-10 overflow-x-hidden overflow-y-visible',
      }}
    />
  );
};

export default AutoSuggest;
