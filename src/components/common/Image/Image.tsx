interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image = ({ ...props }: ImageProps) => {
  const { className, ...rest } = props;

  const defaults = 'rounded-md';

  return <img className={`${defaults} ${className}`} {...rest} />;
};

export default Image;
