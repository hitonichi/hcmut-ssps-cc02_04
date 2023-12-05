import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CasClient from 'react-cas-client';
import PropTypes from 'prop-types';

export const CasUserContext = createContext();
export const CasUserContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  return (
    <CasUserContext.Provider value={{ user, setUser }}>
      {children}
    </CasUserContext.Provider>
  );
};

CasUserContextProvider.propTypes = {
  children: PropTypes.element,
};

const useCas = () => {
  const navigate = useNavigate();
  const casUserContext = useContext(CasUserContext);
  const [isLoading, setIsLoading] = useState(false);

  const casClient = new CasClient('https://sso.hcmut.edu.vn/cas');

  const attemptCasLogin = (gateway) => {
    return new Promise((resolve, reject) => {
      casClient
        .auth(gateway)
        .then((successRes) => {
          casUserContext.setUser(successRes.user);

          setIsLoading(false);
          navigate(successRes.currentPath);
        })
        .catch((err) => {
          setIsLoading(false);
          navigate(err.currentPath);
          reject(err);
        });
    });
  };

  // useEffect(() => {
  //   if (!casUserContext.user) {
  //     (async function () {
  //       try {
  //         await attemptCasLogin(loginWithGateway);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     })();
  //   }
  // }, []);

  const logout = () => {
    casClient.logout('/');
  };

  return { isLoading, attemptCasLogin, logout };
};

export default useCas;
