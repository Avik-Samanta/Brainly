import { CloseIcon } from "../icons/CloseIcon";
import { SubmitIcon } from "../icons/SubmitIcon";
import { Button } from "./Button";
import { InputBox } from "./InputBox";

export function CreateContentModal({open, onClose}){
    return(
        <div>
            {open && <div className="w-screen h-screen fixed top-0 left-0 bg-slate-600 opacity-80 flex justify-center ">
                <div className="flex flex-col justify-center ">
                    <span className="bg-white rounded-md p-4">
                        <div className="flex justify-end p-1">
                            <div onClick={onClose} className="cursor-pointer">
                                <CloseIcon />
                            </div>
                        </div>
                        <div>
                            <InputBox placeholder="Link" />
                            <InputBox placeholder="Title" />
                        </div>
                        <div className="flex justify-center p-1">
                            <Button variant="primary" text="Submit" startIcon={<SubmitIcon />} />
                        </div>
                    </span>
                </div>
            </div>}
        </div>
    )
}