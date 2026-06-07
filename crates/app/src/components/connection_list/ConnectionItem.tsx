import {Connection, ConnectionType} from "../../ts/connection.ts";
import {Icon} from "@iconify-icon/react";
import {useState} from "react";

export function ConnectionItem({connection}: { connection: Connection })
{
    const [hover, setHover] = useState(false);
    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={"flex flex-row gap-2 cursor-pointer hover:bg-surface-1 border-1 border-transparent hover:border-hairline p-2 rounded-md transition-all duration-250 items-center"}>
            <div
                className={"aspect-square max-w-8 max-h-8 min-w-8 min-h-8 rounded-md text-lg font-mono flex justify-center items-center text-center"}
                style={{
                    background: connection.type === ConnectionType.SFTP ? "linear-gradient(-45deg, #001828, #003858)" : connection.type === ConnectionType.S3 ? "linear-gradient(-45deg, #280606, #610000)" : "linear-gradient(-45deg, #260a00, #540f00)",
                    border: connection.type === ConnectionType.SFTP ? "1px solid #0f3a55" : connection.type === ConnectionType.S3 ? "1px solid #5d0f10" : "1px solid #4e1c0f",
                    color: connection.type === ConnectionType.SFTP ? "#46dcfd" : connection.type === ConnectionType.S3 ? "#fda299" : "#d08754"
                }}
            >
                {connection.type == ConnectionType.SFTP ? "S" : connection.type == ConnectionType.FTP ? "F" : connection.type == ConnectionType.S3 ? "S3" : "U"}
            </div>
            <div className={"flex flex-col w-full"}>
                <p className={"font-bold text-lg"}>{connection.connectionName}</p>
                <p className={"text-ink-3 text-sm font-mono"}>
                    {connection.username}@{connection.host}:{connection.port} - {connection.remotePath}
                </p>
            </div>
            {connection.tag == null ? null :
                <div className={"font-mono text-sm uppercase h-6 w-14 text-center flex justify-center items-center font-bold rounded-sm"}
                     style={{
                         backgroundColor: connection.tag?.darkColor,
                         border: `1px solid ${connection.tag?.selectedColor}`,
                         color: connection.tag?.color
                     }}
                >
                    {connection.tag?.code}
                </div>
            }
            <Icon icon={"lucide:chevron-right"} className={"text-lg text-ink-4 data-[hover=true]:text-ink-1 data-[hover=true]:scale-125 transition-all duration-250"} data-hover={hover}/>
        </div>
    );
}