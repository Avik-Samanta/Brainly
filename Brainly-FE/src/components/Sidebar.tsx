import { InstaIcon } from "../icons/InstaIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { TitleComponent } from "./TitleComponent";

export function Sidebar(){
    return (
        <div className="h-screen bg-white border-r border-slate-200 fixed w-64 top-0 left-0">
            <div>
               <TitleComponent />
            </div>
            <div className="pt-4">
                <SidebarItem text="Twitter" startIcon={<TwitterIcon />} />
                <SidebarItem text="Youtube" startIcon={<YoutubeIcon />} />
                <SidebarItem text="Instagram" startIcon={<InstaIcon />} />
            </div>
        </div>
    )
}