import React, {useState} from 'react';
export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [passwordVerifyVisibility, setVerifyPasswordVisibility] = useState(true);
  const [rightVerifyIcon, setVerifyRightIcon] = useState('eye');

  const handlePasswordVerifyVisibility = () => {
    if (rightVerifyIcon === 'eye') {
      setVerifyRightIcon('eye-off');
      setVerifyPasswordVisibility(!passwordVerifyVisibility);
    } else if (rightVerifyIcon === 'eye-off') {
      setVerifyRightIcon('eye');
      setVerifyPasswordVisibility(!passwordVerifyVisibility);
    }
  };
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
    passwordVerifyVisibility,
    rightVerifyIcon,
    handlePasswordVerifyVisibility
  };
};