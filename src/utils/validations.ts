const isValidEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailPattern.test(email.toLowerCase());
};

const isValidPassword = (password: string) => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;

  return passwordPattern.test(password);
};

const isValidFullname = (fullname: string) => {
  const fullNamePattern = /^[A-Za-z0-9_\uAC00-\uD7A3]+$/;

  return (
    fullNamePattern.test(fullname) &&
    fullname.length >= 1 &&
    fullname.length <= 8
  );
};

export { isValidEmail, isValidPassword, isValidFullname };
