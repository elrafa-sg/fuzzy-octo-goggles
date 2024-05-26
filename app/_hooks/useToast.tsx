import React, { useState, useCallback, useContext, createContext } from 'react';
import { Toast } from '../_components/Toast';
import { AlertProps } from '@mui/material';

const ToastContext = createContext({
  showToast: () => { },
  hideToast: () => { },
  setToastData: (data: AlertProps) => { },
});

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }: any) => {
  const [_toastData, _setToastData] = useState<AlertProps>();
  const [visible, setVisible] = useState(false);

  const showToast = useCallback(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, []);

  const hideToast = useCallback(() => {
    setVisible(false);
  }, []);

  const setToastData = useCallback((data: any) => {
    _setToastData((prevData) => ({ ...prevData, ...data }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast, setToastData }}>
      {visible && <Toast severity={_toastData?.severity}>{_toastData?.children}</Toast>}
      {children}
    </ToastContext.Provider >
  );
};
