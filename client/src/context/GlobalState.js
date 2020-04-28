import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

//initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

// create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions
  const getTransactions = () => {
    console.log('getting transactions...');
    axios
      .get('/api/v1/transactions')
      .then((res) => {
        dispatch({
          type: 'GET_TRANSACTIONS',
          payload: res.data.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'TRANSACTION_ERROR',
          payload: err.resposne.data.error,
        });
      });
  };

  const deleteTransaction = (id) => {
    axios
      .delete(`/api/v1/transactions/${id}`)
      .then((res) => {
        dispatch({
          type: 'DELETE_TRANSACTION',
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'TRANSACTION_ERROR',
          payload: err.resposne.data.error,
        });
      });
  };

  const addTransaction = (transaction) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .post('/api/v1/transactions', transaction, config)
      .then((res) => {
        dispatch({
          type: 'ADD_TRANSACTION',
          payload: res.data.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'TRANSACTION_ERROR',
          payload: err.resposne.data.error,
        });
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
