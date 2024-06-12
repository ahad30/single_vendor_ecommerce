import ReUseAbleFormModal from "../../../../Component/UserDashboard/ReUseAbleFormModal/ReUseAbleFormModal";
import React from "react";
const DeleteAccount = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <div className="p-6 md:p-10 bg-white h-fit">
            <h1 className="text-[#d1242f] text-[20px] font-medium">Delete Your Account</h1>
            <hr className="border-gray-200 my-4" />
            <p className="mb-4 text-sm">Are you sure you want to delete your account? This action cannot be undone.</p>
            <button onClick={handleOpen} className="bg-gray-200 text-base text-[#d1242f] border-gray-400 border-[1px] hover:bg-[#d1242f] hover:text-white font-medium py-2 px-4 rounded">
                Delete your Account
            </button>

            <div>
                <ReUseAbleFormModal defaultKey={"deleteAccount"} title={"Delete Confirmation"} open={open} handleOpen={handleOpen} />
            </div>
        </div>
    );
};

export default DeleteAccount;
