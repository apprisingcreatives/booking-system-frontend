import React, { createContext, useState, ReactNode } from 'react';
import clsx from 'clsx';

import {
  CheckCircleIcon,
  CloseIcon,
  CloseIconAlt,
  InformationCircleOutlineIcon,
  WarningOutlineIcon,
} from '../components/common/icons';

import { initialState } from './snackbar/initialState';
import { SeverityType } from '../constants/snackbar';
import Button from '../components/common/Button';

interface SnackbarContextType {
  snack: {
    message: string | undefined;
    open: boolean;
    severity: string;
    autoHideDuration?: number | null;
  };
  snackbar: (
    message: string | undefined,
    severity: string,
    autoHide: boolean,
    autoHideDuration?: number | null
  ) => void;
  snackbarClose: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext<SnackbarContextType>(initialState);

interface SnackbarProviderProps {
  children: ReactNode;
}

interface SnackType {
  message: string | undefined;
  open: boolean;
  severity: string;
  autoHideDuration?: number | null;
}

const AUTO_HIDE_DURATION = 3000;

const getAutoHideDuration = (
  autoHide: boolean | undefined,
  autoHideDuration: number | null | undefined
) => {
  return autoHide === false ? null : autoHideDuration || AUTO_HIDE_DURATION;
};

export const Provider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snack, setSnack] = useState<SnackType>({
    message: '',
    open: false,
    severity: '',
    autoHideDuration: AUTO_HIDE_DURATION,
  });

  const snackbarClose = () => {
    setSnack({
      open: false,
      message: '',
      severity: '',
      autoHideDuration: AUTO_HIDE_DURATION,
    });
  };

  const snackbar = (
    message: string | undefined,
    severity: string,
    autoHide: boolean,
    autoHideDuration?: number | null
  ) => {
    setSnack({
      open: true,
      message,
      severity,
      autoHideDuration: getAutoHideDuration(autoHide, autoHideDuration),
    });

    if (autoHide) {
      setTimeout(() => {
        snackbarClose();
      }, autoHideDuration || AUTO_HIDE_DURATION);
    }
  };

  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };

  return (
    <Context.Provider value={{ snack, snackbar, snackbarClose }}>
      {children}
      {snack.open && (
        <div
          className={clsx({
            'fixed top-0 left-1/2 transform -translate-x-1/2 mt-8 p-2 px-4 text-center rounded-md shadow-md z-50 w-[calc(100vw-50px)] sm:w-fit min-w-min max-w-max  md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg':
              true,
            'bg-green-500': snack.severity === SeverityType.SUCCESS,
            'bg-red-600': snack.severity === SeverityType.ERROR,
            'bg-blue-300': snack.severity === SeverityType.INFO,
            'bg-orange-300': snack.severity === SeverityType.WARNING,
          })}
          role='alert'
        >
          <div className='text-white flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
              {snack.severity === SeverityType.ERROR && (
                <CloseIconAlt size='20px' className='shrink-0' />
              )}
              {snack.severity === SeverityType.SUCCESS && (
                <CheckCircleIcon size='15px' className='shrink-0' />
              )}
              {snack.severity === SeverityType.INFO && (
                <InformationCircleOutlineIcon
                  size='20px'
                  className='shrink-0'
                />
              )}
              {snack.severity === SeverityType.WARNING && (
                <WarningOutlineIcon size='20px' className='shrink-0' />
              )}
              {snack.message}
            </div>
            <Button
              onClick={handleClose}
              // paddingClassName="ml-2 pl-1 py-1"
              className='hover:opacity-50'
            >
              <CloseIcon size='1.5em' />
            </Button>
          </div>
        </div>
      )}
    </Context.Provider>
  );
};
