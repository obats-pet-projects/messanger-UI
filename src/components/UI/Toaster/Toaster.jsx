import React from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const successToaster = msg => toast.success(msg);
export const infoToaster = msg => toast.info(msg);
export const errorToaster = msg => toast.error(msg);

export const Toaster = () => (
  <ToastContainer
    position="bottom-left"
    autoClose={4000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnVisibilityChange
    draggable
    preventDuplicates
    transition={Zoom}
  />
);
