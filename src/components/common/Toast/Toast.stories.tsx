import { useToast } from './ToastProvider';

const meta = {
  title: 'Components/Common/Toast'
};

export default meta;

export const Default = () => {
  const { addToast } = useToast();

  return (
    <button onClick={() => addToast({ content: 'Toast!' })}>Add Toast</button>
  );
};
