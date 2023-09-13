interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  className?: string;
}

const Image = ({ src, className, ...props }: ImageProps) => {
  return <img src={src} {...props} className={`rounded-md ${className}`} />;
};

export default Image;
