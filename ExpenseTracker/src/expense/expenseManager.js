import axios from 'axios';

const newExpense = async (expense, token) => {
  try {
    let response = await axios({
      method: 'post',
      mode: 'cors',
      url: 'https://dolphin-app-95g38.ondigitalocean.app/user/expenses',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: expense,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getUserExpenses = async (token, firstDate, lastDate) => {
  try {
    let response = await axios({
      method: 'post',
      mode: 'cors',
      url: 'https://dolphin-app-95g38.ondigitalocean.app/user/filteredExpenses',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: {
        firstDate: firstDate,
        lastDate: lastDate,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateUserExpense = async (userId, token, expense) => {
  try {
    let response = await axios({
      method: 'put',
      mode: 'cors',
      url: 'https://dolphin-app-95g38.ondigitalocean.app/user/expenses',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: {
        id: expense.id,
        userId: userId,
        title: expense.title,
        category: expense.category,
        amount: expense.amount,
        incurred_on: expense.incurred_on,
        notes: expense.notes,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteUserExpense = async (token, expenseId) => {
  try {
    let response = await axios({
      method: 'delete',
      mode: 'cors',
      url: 'https://dolphin-app-95g38.ondigitalocean.app/user/expenses',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: {
        id: expenseId,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const currentMonthPreview = async (token) => {
  try {
    let response = await axios({
      method: 'get',
      mode: 'cors',
      url: 'https://dolphin-app-95g38.ondigitalocean.app/user/monthlyPreview',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const currentMonthCategoryExpensePreview = async (token) => {
  try {
    let response = await axios({
      method: 'get',
      mode: 'cors',
      url: 'https://dolphin-app-95g38.ondigitalocean.app/user/monthlyCategoryExpense',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const monthlyExpense = async (token, monthYear) => {
  try {
    let response = await axios({
      method: 'post',
      mode: 'cors',
      url: 'https://dolphin-app-95g38.ondigitalocean.app/user/monthlyScatter',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: {
        date: monthYear,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const yearlyExpense = async (token, year) => {
  try {
    let response = await axios({
      method: 'post',
      mode: 'cors',
      url: 'https://dolphin-app-95g38.ondigitalocean.app/user/yearlyBar',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: {
        date: year,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const pieChartExpense = async (token, startDate, endDate) => {
  try {
    let response = await axios({
      method: 'post',
      mode: 'cors',
      url: 'https://dolphin-app-95g38.ondigitalocean.app/user/pieChart',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: {
        startDate: startDate,
        endDate: endDate,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  newExpense,
  getUserExpenses,
  updateUserExpense,
  deleteUserExpense,
  currentMonthPreview,
  currentMonthCategoryExpensePreview,
  monthlyExpense,
  yearlyExpense,
  pieChartExpense,
};
