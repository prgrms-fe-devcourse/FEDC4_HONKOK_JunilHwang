import { memo } from 'react';
import { BUTTON_LABELS } from '../constants';
import { Button } from '~/components/common';

interface SearchTypeButtonsProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SearchTypeButtons = memo(({ handleClick }: SearchTypeButtonsProps) => {
  return (
    <>
      {Object.keys(BUTTON_LABELS).map((key) => (
        <Button
          key={key}
          name={key}
          onClick={handleClick}
          className="h-full flex-1 py-3 text-gray-500"
        >
          {BUTTON_LABELS[key as keyof typeof BUTTON_LABELS]}
        </Button>
      ))}
    </>
  );
});

export default SearchTypeButtons;
