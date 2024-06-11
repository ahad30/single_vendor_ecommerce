import { useState } from "react";


const ReUseableFormModalButton = ({ handleOpen, defaultKey }) => {
    const [isDisabled, setIsDisabled] = useState(true);
    return (
        <div className="flex justify-end items-center my-3">
            <div className="flex justify-center items-center gap-2">
                <button
                    onClick={handleOpen}
                    className="mr-1 bg-[#feeceb] py-2 px-5 rounded-md"
                >
                    <span className="text-[#f44336]">Cancel</span>
                </button>
                {
                    defaultKey === "addAddress" && (
                        <button className="bg-[#1e4bb8] text-white py-2 px-5 rounded-md" onClick={handleOpen}>
                            <span>Save</span>
                        </button>
                    )
                }

                {defaultKey === "deleteAccount" && (
                    <button
                        onClick={handleOpen}
                        className={`bg-gray-200 text-base text-[#d1242f] border-gray-400 border-[1px] 
                                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#d1242f] hover:text-white'} 
                                font-medium py-2 px-4 rounded`}
                        disabled={isDisabled}
                    >
                        <span>delete this account</span>
                    </button>
                )}

            </div>
        </div>
    );
};

export default ReUseableFormModalButton;