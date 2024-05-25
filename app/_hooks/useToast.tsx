import React, { useState, useCallback, useContext, createContext } from 'react';
import { Toast } from '../_components/Toast';

const ToastContext = createContext({
  showToast: () => { },
  hideToast: () => { },
  setToastData: (data: { color: string, message: string, timeout?: number }) => { },
});

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }: any) => {
  const [_toastData, _setToastData] = useState({
    color: '',
    message: '',
    timeout: 3000, // valor padrão
  });
  const [visible, setVisible] = useState(false);

  const showToast = useCallback(() => {
    setVisible(true);
    if (_toastData.timeout > 0) {
      setTimeout(() => {
        setVisible(false);
      }, _toastData.timeout);
    }
  }, [_toastData]);

  const hideToast = useCallback(() => {
    setVisible(false);
  }, []);

  const setToastData = useCallback((data: any) => {
    _setToastData((prevData) => ({ ...prevData, ...data }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast, setToastData }}>
      {children}
      {visible && <Toast color={_toastData.color} message={_toastData.message} />}
    </ToastContext.Provider>
  );
};
