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

const ReUseAbleFormModal = ({ defaultKey, title, open, handleOpen }) => {

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

                <h1 className="p-4 font-semibold">{title}</h1>

                <div className="px-6 py-2">
                    {
                        defaultKey === "addessAdd" && (
                            <div>
                                <ZForm>
                                    <ZInput defaultKey="addessAdd"  label={"Title"} name={"title"} type={"text"}></ZInput>
                                    <ZInput defaultKey="addessAdd" label={"Address"} name={"address"} type={"text"}></ZInput>
                                </ZForm>
                            </div>
                        )
                    }
                    {
                        defaultKey === "deleteAccount" && (
                            <div>
                                <ZForm>
                                    <ZInput defaultKey="deleteAccount" label={"Your email :"} name={"username"} type={"text"}></ZInput>
                                    <ZInput defaultKey="deleteAccount"  label={"To verify, type confirm below :"} name={"delete"} type={"text"}></ZInput>
                                    <ZInput  defaultKey="deleteAccount"  label={"Confirm your password :"} name={"address"} type={"password"}></ZInput>
                                </ZForm>
                            </div>
                        )
                    }
                    {
                        defaultKey === "addessAdd" && (
                            <div>
                                <ReUseableFormModalButton defaultKey={"addAddress"} handleOpen={handleOpen} />
                            </div>
                        )
                    }
                     {
                        defaultKey === "deleteAccount" && (
                            <div>
                                <ReUseableFormModalButton defaultKey={"deleteAccount"} handleOpen={handleOpen} />
                            </div>
                        )
                    }

                </div>
            </Dialog>
        </div>
    );
};

export default ReUseAbleFormModal;