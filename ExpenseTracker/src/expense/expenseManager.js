import axios from 'axios';

const newExpense = async (expense, token) => {
  try {
    let response = await axios({
      method: 'post',
      mode: 'cors',
      url: 'http://127.0.0.1:5000/user/expenses',
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
      url: 'http://127.0.0.1:5000/user/filteredExpenses',
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
      url: 'http://127.0.0.1:5000/user/expenses',
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
      url: 'http://127.0.0.1:5000/user/expenses',
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

export { newExpense, getUserExpenses, updateUserExpense, deleteUserExpense };
