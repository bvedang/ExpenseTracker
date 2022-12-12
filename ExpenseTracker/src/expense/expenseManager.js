import axios from 'axios';

const newExpense = (expense, token) => {
  try {
    let response = axios({
      method: 'post',
      mode: 'cors',
      url: 'http://127.0.0.1:5000/user/expenses',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: JSON.stringify(expense),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { newExpense };
