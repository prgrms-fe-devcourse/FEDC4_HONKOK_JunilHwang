import { useForm } from '.';

function usePassword() {
  const [password, handlePassword] = useForm();
  const [confirmPassword, handleConfirmPassword] = useForm();

  const isPasswordValid = password.length >= 8 && password === confirmPassword;

  return {
    password,
    handlePassword,
    confirmPassword,
    handleConfirmPassword,
    isPasswordValid
  };
}

export default usePassword;
