import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/formatAmount';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';
  const border = transaction.amount < 0 ? 'minus' : 'plus';

  return (
    <li className={border}>
      {transaction.text}{' '}
      <span>
        {sign}${numberWithCommas(Math.abs(transaction.amount))}
      </span>
      <button
        className="delete-btn"
        onClick={() => deleteTransaction(transaction._id)}>
        x
      </button>
    </li>
  );
};
