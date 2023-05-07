import Cookies from 'js-cookie';

const getAccessToken = () => {
  const token = Cookies.get('token');
  if (token) {
    return `Bearer ${token}`;
  }
  return null;
};

export const tokenService = {
  getAccessToken,
};
