const ReUseableButton = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-end items-center">
      <div className="bg-[#265eda] hover:cursor-pointer text-white py-3 px-6 rounded-sm hover:bg-[#1e4eb7] transition duration-300 ease-in-out">
        <span> {title}</span>
      </div>
    </div>
  );
};

export default ReUseableButton;
