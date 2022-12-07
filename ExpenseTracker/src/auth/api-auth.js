import axios from 'axios';

const signin = async (user) => {
  try {
    let response = await axios({
      withCredentials:true,
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
    console.log(error);
  }
};

const getallUsers = async () => {
  try {
    let response = await axios({
      method: 'get',
      mode: 'cors',
      url: 'http://127.0.0.1:5000/user/allUsers',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { signin, getallUsers };
