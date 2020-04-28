const transactionsRouter = require('express').Router();
const {
  getTransactions,
  addTransactions,
  deleteTransactions,
} = require('../controllers/transactionsController');

transactionsRouter.route('/').get(getTransactions).post(addTransactions);
transactionsRouter.route('/:id').delete(deleteTransactions);

module.exports = transactionsRouter;
