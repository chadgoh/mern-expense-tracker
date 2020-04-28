import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/formatAmount';

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amountsArray = transactions.map((transaction) => transaction.amount);

  const income = amountsArray
    .filter((amount) => amount > 0)
    .reduce((acc, amount) => (acc += amount), 0)
    .toFixed(2);
  const expense = Math.abs(
    amountsArray
      .filter((amount) => amount < 0)
      .reduce((acc, amount) => (acc += amount), 0)
  ).toFixed(2);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">+${numberWithCommas(income)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">-${numberWithCommas(expense)}</p>
      </div>
    </div>
  );
};
