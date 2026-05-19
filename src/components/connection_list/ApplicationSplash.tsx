import {FloatingLogo} from "./FloatingLogo.tsx";
import {useEffect, useState} from "react";
import {getVersion} from "@tauri-apps/api/app";
import {Spinner, Tooltip} from "@heroui/react";

export function ApplicationSplash()
{
    const [version, setVersion] = useState("");
    // @ts-ignore
    const [hasUpdateAvailable, setHasUpdateAvailable] = useState(false);
    const [checkingForUpdates, setCheckingForUpdates] = useState(false);

    useEffect(() =>
    {
        getVersion().then(setVersion).catch(() =>
        {
        });
    }, []);

    const checkForUpdates = async () =>
    {
        setCheckingForUpdates(true);
        // TODO: Implement update checking logic
        setTimeout(() => setCheckingForUpdates(false), 5000);
    };

    return (
        <div className={"max-w-[19.5rem] flex flex-col gap-4"}>
            <FloatingLogo/>
            <h1 className={"text-display inline-flex items-end"}>Quay
                <div className={"bg-primary w-2 h-2 rounded-full"}/>
            </h1>
            <p className={"text-lg tracking-wide text-ink-3"}>A modern SFTP, FTP, and cloud storage explorer with a built-in shell and code editor — designed for keyboards, made for the dark.</p>
            <div className={"inline-flex items-center gap-2 font-mono"}>
                <div className={"data-[has-update=true]:bg-warn bg-success w-1 h-1 rounded-full"} data-has-update={hasUpdateAvailable}/>
                <Tooltip content={"Check for Updates"} delay={1000}>
                    <span className={"text-sm text-ink-3 data-[has-update=true]:text-warn cursor-pointer"} onClick={checkForUpdates} data-has-update={hasUpdateAvailable}>
                        {checkingForUpdates ? <div className={"flex flex-row items-center gap-2"}>
                            <Spinner size={"sm"}/>
                            Checking for updates...
                        </div> : <>
                            {hasUpdateAvailable ? "Update Available" : "No Updates"}
                        </>}
                    </span>
                </Tooltip>
                <div className={"bg-accent-glow w-1 h-1 rounded-full"}/>
                <span className={"text-sm text-ink-3"}>v{version}</span>
            </div>
        </div>
    );
}