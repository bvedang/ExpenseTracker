import axios from 'axios';

const getCurrentUser = async (token) => {
  try {
    let response = await axios({
      method: 'get',
      mode: 'cors',
      url: 'http://127.0.0.1:5000/user/get_current_user',
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

const signup = async (user) => {
  try {
    let response = await axios({
      method: 'post',
      mode: 'cors',
      url: 'http://127.0.0.1:5000/user/create_user',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email: user.email,
        password: user.password,
        name: user.name,
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
        Authorization: localStorage.getItem('jwt'),
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async () => {
  try {
    let response = await axios({
      method: 'delete',
      mode: 'cors',
      url: 'http://127.0.0.1:5000/user/get_current_user',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('jwt'),
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (user) => {
  try {
    let response = await axios({
      method: 'put',
      mode: 'cors',
      url: 'http://127.0.0.1:5000/user/get_current_user',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('jwt'),
      },
      data: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
        id: user.id
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getCurrentUser, signup, getallUsers, deleteUser,updateUser };
