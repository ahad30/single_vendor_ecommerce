
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import ZForm from "../../Form/ZForm";
import ZInput from "../../Form/ZInput";
import ReUseableFormModalButton from "./ReUseableFormModalButton";

const ReUseAbleFormModal = ({ open, handleOpen }) => {

    return (
        <div className="">
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >

                <h1 className="p-4 font-semibold">Add New Address</h1>

                <div className="px-6 py-4">
                    <div>
                        <ZForm>
                            <ZInput label={"Title"} name={"title"} type={"text"}></ZInput>
                            <ZInput label={"Address"} name={"address"} type={"text"}></ZInput>
                        </ZForm>
                    </div>
                    <div>
                        <ReUseableFormModalButton handleOpen={handleOpen} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default ReUseAbleFormModal;