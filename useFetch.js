import { useState, useReducer, useEffect, useCallback } from 'react';

import axios from 'axios';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

export const useFetch = ({ method, headers, payload, urlApi }) => {
  const [url, setUrl] = useState(urlApi);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: {}
  });

  const fetchData = useCallback(async () => {
    dispatch({ type: 'FETCH_INIT' });

    try {
      let result = {};

      switch (method) {
        case 'GET':
          result = await axios(url);

          break;

        case 'POST':
          result = await axios.post(url, payload, { headers });
          break;
        default:
          break;
      }

      dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE' });
    }
  }, [method, headers, payload, url]);

  return [state, fetchData, setUrl];
};
