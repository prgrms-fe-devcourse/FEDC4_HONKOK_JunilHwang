import { useForm } from '../../../hooks';

function usePassword() {
  const [password, handlePassword] = useForm();
  const [confirmPassword, handleConfirmPassword] = useForm();

  const isPasswordValid = password.length >= 4 && password === confirmPassword;

  return {
    password,
    handlePassword,
    confirmPassword,
    handleConfirmPassword,
    isPasswordValid
  };
}

export default usePassword;
