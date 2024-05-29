const HomeTitle = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <h2 className={`${className} font-Poppins font-semibold text-[32px] text-center`}>
      {text ? text : "Something"}
    </h2>
  );
};

export default HomeTitle;
