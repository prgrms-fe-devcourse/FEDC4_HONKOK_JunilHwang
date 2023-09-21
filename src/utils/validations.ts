interface SignUp {
  email: string;
  password: string;
  fullName: string;
  isPasswordValid: boolean;
}

interface CreatePost {
  title: string;
  content: string;
  channelId: string;
}

const isValidEmail = (email: string) => {
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailPattern.test(email.toLowerCase());
};

const isValidPassword = (password: string) => {
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9@$!%*?&]{8,}$/;

  return passwordPattern.test(password);
};

const isValidFullName = (fullName: string) => {
  const fullNamePattern = /^[A-Za-z0-9_\uAC00-\uD7A3\u3131-\u3163]{1,8}$/;

  return fullNamePattern.test(fullName);
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

const isValidCreatePost = ({ channelId, title, content }: CreatePost) => {
  return channelId && title.length >= 3 && content.length >= 10;
};

export {
  isValidEmail,
  isValidPassword,
  isValidFullName,
  isValidSignUp,
  isValidCreatePost
};
