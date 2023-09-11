import { Badge } from '.';

interface BlankBadgeProps {
  className?: string;
}

const BlankBadge = ({ className }: BlankBadgeProps) => {
  return <Badge className={`absolute aspect-square w-2 ${className}`} />;
};

export default BlankBadge;
