import { Logo } from "../icons/Logo";

export function TitleComponent(){
    return(
        <div className="flex justify-center items-center p-2">
            <div>
                <Logo />
            </div>
            <div className="font-bold text-xl text-[var(--color-button-primary)]">
                Second Brain
            </div>
        </div>
    )
}