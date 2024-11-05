import React from 'react';
import { Progress } from 'antd';

const Analytics = ({ allTransection }) => {

  // categories
  const Categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "shopping",
    "tax",
  ];

  // total transactions
  const totalTransection = allTransection.length;
  const totalIncomeTransections = allTransection.filter(transaction => transaction.type === 'income');
  const totalExpenseTransections = allTransection.filter(transaction => transaction.type === 'expense');
  const totalIncomePercent = (totalIncomeTransections.length / totalTransection) * 100 || 0;
  const totalExpensePercent = (totalExpenseTransections.length / totalTransection) * 100 || 0;

  // total turnover
  const totalTurnover = allTransection.reduce(
    (acc, transaction) => acc + transaction.amount, 0
  );

  const totalIncomeTurnover = totalIncomeTransections.reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = totalExpenseTransections.reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent = totalTurnover > 0 ? (totalIncomeTurnover / totalTurnover) * 100 : 0;
  const totalExpenseTurnoverPercent = totalTurnover > 0 ? (totalExpenseTurnover / totalTurnover) * 100 : 0;

  return (
    <>
      <div className="row justify-content-center">
        {/* Total Transactions Card */}
        <div className='col-12 col-md-5 card mb-4 mx-2'>
          <div className='card-header text-center'>
            Total Transactions: {totalTransection}
          </div>
          <div className='card-body text-center'>
            <h5 className="text-success">Income: {totalIncomeTransections.length}</h5>
            <h5 className="text-danger">Expense: {totalExpenseTransections.length}</h5>

            <div className="d-flex justify-content-center">
              <Progress
                type="circle"
                strokeColor={'green'}
                className="mx-2"
                percent={totalIncomePercent.toFixed(0)}
              />
              <Progress
                type="circle"
                strokeColor={'red'}
                className="mx-2"
                percent={totalExpensePercent.toFixed(0)}
              />
            </div>
          </div>
        </div>

        {/* Total Turnover Card */}
        <div className='col-12 col-md-5 card mb-4 mx-2'>
          <div className='card-header text-center'>
            Total Turnover: {totalTurnover}
          </div>
          <div className='card-body text-center'>
            <h5 className="text-success">Income: {totalIncomeTurnover}</h5>
            <h5 className="text-danger">Expense: {totalExpenseTurnover}</h5>

            <div className="d-flex justify-content-center">
              <Progress
                type="circle"
                strokeColor={'green'}
                className="mx-2"
                percent={totalIncomeTurnoverPercent.toFixed(0)}
              />
              <Progress
                type="circle"
                strokeColor={'red'}
                className="mx-2"
                percent={totalExpenseTurnoverPercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category-wise Income and Expense */}
      <div className="row">
        {Categories.map(category => {
          const incomeAmount = allTransection
            .filter(transaction => transaction.type === 'income' && transaction.category === category)
            .reduce((acc, transaction) => acc + transaction.amount, 0);

          const expenseAmount = allTransection
            .filter(transaction => transaction.type === 'expense' && transaction.category === category)
            .reduce((acc, transaction) => acc + transaction.amount, 0);

          return (
            <div className="col-md-4 mb-4" key={category}>
              <div className='card'>
                <div className="card-body">
                  <h5>{category}</h5>
                  <h6 className="text-success">Income</h6>
                  <Progress percent={totalIncomeTurnover > 0 ? ((incomeAmount / totalIncomeTurnover) * 100).toFixed(0) : 0} />
                  <h6 className="text-danger mt-3">Expense</h6>
                  <Progress percent={totalExpenseTurnover > 0 ? ((expenseAmount / totalExpenseTurnover) * 100).toFixed(0) : 0} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Analytics;
