interface CardTitleProps {
  children: React.ReactNode;
}

const CardTitle = ({ children }: CardTitleProps) => {
  return <h1 className="font-medium">{children}</h1>;
};

export default CardTitle;
