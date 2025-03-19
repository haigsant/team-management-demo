import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 3500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showSuccess = (message: string, options = {}) => {
  toast.success(message, { ...defaultOptions, ...options });
};

export const showError = (message: string, options = {}) => {
  toast.error(message, { ...defaultOptions, ...options });
};

export const showWarning = (message: string, options = {}) => {
  toast.warning(message, { ...defaultOptions, ...options });
};

export const showInfo = (message: string, options = {}) => {
  toast.info(message, { ...defaultOptions, ...options });
};

export const handleApiError = (error: any, fallbackMessage = 'An unexpected error occurred'): string => {
  console.error('API Error:', error);
  
  if (error?.response?.data) {
    const { data } = error.response;
  
    if (typeof data === 'string') return data;
    if (data.detail) return data.detail;
    if (data.message) return data.message;
    if (data.error) return data.error;
  
    const fieldErrors = Object.entries(data)
      .find(([_, value]) => Array.isArray(value) && value.length > 0);
  
    if (fieldErrors) {
      const [field, messages] = fieldErrors as [string, string[]];
      return `${field}: ${messages[0]}`;
    }
  }
  
  if (error?.message === 'Network Error') {
    return 'Connection failed. Please check your internet and try again.';
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return fallbackMessage;
};
