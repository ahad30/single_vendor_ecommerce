

const ReUseableButton = ({ title }) => {
    return (
        <div className="flex justify-end items-center">
            <div className="bg-[#265eda]  text-white py-2 px-4 md:py-3 md:px-6 rounded-sm">
                {title}
            </div>
        </div>
    );
};

export default ReUseableButton;