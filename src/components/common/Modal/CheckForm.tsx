import { Button } from '../Buttons';

interface CheckFormProps {
  content: string;
  checkText?: string;
  handleCancel: () => void;
  handleAgree: () => void;
}

const CheckForm = ({
  content,
  handleCancel,
  handleAgree,
  checkText = '확인'
}: CheckFormProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-6 text-[0.875rem]">{content}</div>
      <div className="flex gap-6">
        <Button
          theme="main"
          size="sm"
          variant="outline"
          className="px-10 py-2"
          onClick={handleCancel}
        >
          취소
        </Button>
        <Button
          theme="main"
          size="sm"
          variant="solid"
          className="px-10 py-2"
          onClick={handleAgree}
        >
          {checkText}
        </Button>
      </div>
    </div>
  );
};

export default CheckForm;
