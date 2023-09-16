interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const Image = ({ src, ...props }: ImageProps) => {
  const { className, ...rest } = props;

  return <img src={src} className={`rounded-md ${className}`} {...rest} />;
};

export default Image;
