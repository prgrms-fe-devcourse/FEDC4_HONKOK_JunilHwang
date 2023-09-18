interface SignUp {
  email: string;
  password: string;
  fullName: string;
  isPasswordValid: boolean;
}

const isValidEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailPattern.test(email.toLowerCase());
};

const isValidPassword = (password: string) => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;

  return passwordPattern.test(password);
};

const isValidFullName = (fullName: string) => {
  const fullNamePattern = /^[A-Za-z0-9_\uAC00-\uD7A3]+$/;

  return (
    fullNamePattern.test(fullName) &&
    fullName.length >= 1 &&
    fullName.length <= 8
  );
};

const isValidSignUp = ({
  email,
  password,
  fullName,
  isPasswordValid
}: SignUp) => {
  return (
    isValidFullName(fullName) &&
    isValidPassword(password) &&
    isValidEmail(email) &&
    isPasswordValid
  );
};

export { isValidEmail, isValidPassword, isValidFullName, isValidSignUp };
