import { useState } from 'react';

const useForm = () => {
  const [value, setValue] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.currentTarget.value);
  };

  return [value, handleChange] as const;
};

export default useForm;
