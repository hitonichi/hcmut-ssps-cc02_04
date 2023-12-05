import axios from 'axios';

const fetchUser = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/current_user`,
      {
        withCredentials: true,
      },
    );
    // false means user hasn't logged in
    return data.user || false;
  } catch (e) {
    throw new Error(e);
  }
};

export const authService = { fetchUser };
