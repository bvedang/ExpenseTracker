import axios from 'axios';

const signin = async (user) => {
  try {
    let response = await axios({
      method: 'post',
      mode: 'cors',
      url: 'http://127.0.0.1:5000/user/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    return response;
  } catch (error) {
    return error.response
  }
};

const isAuthenticated = () => {
  if (localStorage.getItem('jwt')) {
    return true;
  }
  return false;
};

const signOut = () => {
  localStorage.clear();
};

export { signin,isAuthenticated, signOut };
