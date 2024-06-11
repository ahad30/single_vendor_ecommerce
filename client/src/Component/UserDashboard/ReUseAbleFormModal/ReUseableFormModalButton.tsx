

const ReUseableFormModalButton = ({ handleOpen }) => {
    return (
        <div className="flex justify-end items-center my-3">
            <div className="flex justify-center items-center gap-2">
                <button
                    onClick={handleOpen}
                    className="mr-1 bg-[#feeceb] py-2 px-5 rounded-md"
                >
                    <span className="text-[#f44336]">Cancel</span>
                </button>
                <button className="bg-[#52ac56] text-white py-2 px-5 rounded-md" onClick={handleOpen}>
                    <span>Confirm</span>
                </button>
            </div>
        </div>
    );
};

export default ReUseableFormModalButton;