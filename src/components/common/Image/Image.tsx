interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image = ({ className, ...props }: ImageProps) => {
  const defaults = 'rounded-md';

  return <img className={`${defaults} ${className}`} {...props} />;
};

export default Image;
