import type { ReactElement } from "react"

export function SidebarItem({startIcon, text}: {
    startIcon: ReactElement;
    text: string;
}){
    return(
        <div className="flex items-center text-stone-600 font-bold text-md cursor-pointer hover:bg-indigo-100 rounded transition-all durantion-200">
            <div className="p-2 m-2 pl-13">
                {startIcon}
            </div>
            <div className="p-2">
                {text}
            </div>
        </div>
    )
}