const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
exports.getTransactions = (req, res, next) => {
  Transaction.find()
    .then((result) => {
      return res.status(200).json({
        success: true,
        count: result.length,
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    });

  // try {
  //   const transactions = await Transaction.find();

  //   return res.status(200).json({
  //     success: true,
  //     count: transactions.length,
  //     data: transactions,
  //   });
  // } catch (e) {
  //   return res.status(500).json({
  //     success: false,
  //     error: 'Server Error',
  //   });
  // }
};
// @desc    ADD transactions
// @route   POST /api/v1/transactions
// exports.addTransactions = async (req, res, next) => {
exports.addTransactions = (req, res, next) => {
  const { text, amount } = req.body;
  Transaction.create(req.body)
    .then((result) => {
      return res.status(201).json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((val) => val.message);
        return res.status(400).json({
          success: false,
          error: messages,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: "Server Errror. Couldn't Create Transaction",
        });
      }
    });

  // try {
  // const { text, amount } = req.body;
  // const transaction = await Transaction.create(req.body);

  // return res.stats(201).json({
  //   success: true,
  //   data: transaction
  // })
  // } catch (e) {
  //   if (e.name === 'ValidationError')
  //   {
  //   const messages = Object.values(err.errors).map((val) => val.message);
  //     return res.status(400).json({
  //       success: false,
  //       error: messages,
  //     });
  //   }
  //   else {
  //     return res.status(500).json({
  //       success: false,
  //       error: "Server error"
  //     })
  //   }
  // }
};
// @desc    Delete transactions
// @route   DELETE /api/v1/transactions/:id
exports.deleteTransactions = (req, res, next) => {
  Transaction.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          error: 'No transaction found.',
        });
      } else {
        result.remove();
        res.status(200).json({
          success: true,
          data: result,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        error: 'Server Error, could not delete object.',
      });
    });
};
