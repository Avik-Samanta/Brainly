import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

interface CardProps{
    link: string;
    title: string;
    type: "youtube" | "twitter"; 
}

export function Card({link, title, type}: CardProps){
    return (
        <div className="p-4 bg-[var(--color-card-bg)] rounded-lg max-w-72 border-gray-300 border min-w-72 min-h-48">
            <div className="flex justify-between ">
                <div className="flex items-center text-lg font-medium">
                    <div className="pr-2 text-black">
                        {type === "twitter" && <TwitterIcon />}
                        {type === "youtube" && <YoutubeIcon />}
                    </div>
                    {title}
                </div>
                <div className="flex items-center ">
                    <div className="pr-3 text-black">
                        <a href={link} target="_blank">
                            <ShareIcon />
                        </a>
                    </div>
                    <div className="pr-2 text-black cursor-pointer">
                        <TrashIcon />
                    </div>
                </div>
            </div>
            <div className="pt-4">
                {type === "youtube" &&
                    <iframe className="w-full rounded-lg" src={link.replace("watch", "embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                }
                {type === "twitter" &&
                    <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com", "twitter.com")}></a> 
                    </blockquote>
                }
            </div>
        </div>
    )
}