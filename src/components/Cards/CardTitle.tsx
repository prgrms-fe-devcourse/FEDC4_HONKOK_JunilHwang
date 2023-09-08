interface CardHeaderProps {
  children: React.ReactNode;
}

const CardTitle = ({ children }: CardHeaderProps) => {
  return <h1 className="font-medium">{children}</h1>;
};

export default CardTitle;
