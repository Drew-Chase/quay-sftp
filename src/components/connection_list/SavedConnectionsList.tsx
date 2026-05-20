import {WorkspaceSelect} from "./WorkspaceSelect.tsx";
import {Button, Chip, Divider, Kbd, ScrollShadow, Tab, Tabs, Tooltip} from "@heroui/react";
import {Icon} from "@iconify-icon/react";
import {Input} from "../extends/Input.tsx";
import {useEffect, useState} from "react";
import {getVersion} from "@tauri-apps/api/app";
import {openUrl} from "@tauri-apps/plugin-opener";
import {Connection} from "../../ts/connection.ts";

export function SavedConnectionsList()
{
    const [version, setVersion] = useState("");
    const [connections, setConnections] = useState<Connection[]>([]);
    useEffect(() =>
    {
        getVersion().then(setVersion).catch(() =>
        {
        });
        Connection.fetch().then(setConnections).catch(() =>
        {
        });
    }, []);
    return (
        <div className={"flex flex-col gap-4 p-8 max-h-screen"}>
            <WorkspaceSelect/>
            <div className={"flex flex-row justify-between w-full"}>
                <h2 className={"text-3xl"}>Saved connections</h2>
                <div className={"flex flex-row gap-2"}>
                    <Button size={"sm"} startContent={<Icon icon={"lucide:upload"}/>}>Import</Button>
                    <Button size={"sm"} startContent={<Icon icon={"lucide:plus"}/>} color={"primary"}>New connection</Button>
                </div>
            </div>
            <div className={"flex flex-row gap-2"}>
                <Input
                    placeholder={"Search connections, hosts, paths...."}
                    startContent={<Icon icon={"lucide:search"} className={"text-ink-3 text-sm"}/>}
                    endContent={<Kbd keys={["command"]} className={"text-ink- text-sm"}>K</Kbd>}
                    fullWidth
                />
                <Tooltip content={"Sort by name"} delay={1000} closeDelay={0}>
                    <Button size={"md"} variant={"ghost"} isIconOnly><Icon icon={"lucide:sort-desc"}/></Button>
                </Tooltip>
                <Tooltip content={"Filter list"} delay={1000} closeDelay={0}>
                    <Button size={"md"} variant={"ghost"} isIconOnly><Icon icon={"lucide:filter"}/></Button>
                </Tooltip>
            </div>
            <Tabs
                variant={"underlined"}
                color={"primary"}
            >
                <Tab key={"all"} title={<>All<Chip className={"ml-3"} variant={"faded"} size={"sm"}>10</Chip></>}/>
                <Tab key={"sftp"} title={<>SFTP<Chip className={"ml-3"} variant={"faded"} size={"sm"}>5</Chip></>}/>
                <Tab key={"ftp"} title={<>FTP<Chip className={"ml-3"} variant={"faded"} size={"sm"}>3</Chip></>}/>
                <Tab key={"cloud"} title={<>Cloud<Chip className={"ml-3"} variant={"faded"} size={"sm"}>2</Chip></>}/>
                <Tab key={"recent"} title={<>Recent<Chip className={"ml-3"} variant={"faded"} size={"sm"}>1</Chip></>}/>
            </Tabs>

            <ScrollShadow>
                <div className={"flex flex-col gap-2 max-h-[calc(100dvh-370px)] overflow-y-auto h-screen"}>
                    {connections.map((connection) => <ConnectionItem key={connection.id} connection={connection}/>)}
                </div>
            </ScrollShadow>

            <Divider orientation={"horizontal"}/>
            <div className={"flex flex-row gap-2 text-xs font-mono text-ink-3"}>
                <p className={"mr-auto"}>Quay v{version} - Build 2026.5.17</p>
                <div className={"flex flex-row text-ink-4"}>
                    <Button variant={"light"} size={"sm"} className={"text-ink-3 hover:text-ink-2"} onPress={() => openUrl(`https://quayapp.com/changes/${version}`)}>What's new</Button>
                    <Button variant={"light"} size={"sm"} className={"text-ink-3 hover:text-ink-2"} onPress={() => openUrl(`https://quayapp.com/docs/${version}`)}>Docs</Button>
                    <Button variant={"light"} size={"sm"} className={"text-ink-3 hover:text-ink-2"} onPress={() => openUrl(`https://quayapp.com/devices`)}>Manage devices</Button>
                    <Button variant={"light"} size={"sm"} className={"text-ink-3 hover:text-ink-2"} onPress={() => openUrl(`https://quayapp.com/login`)}>Login</Button>
                </div>
            </div>
        </div>
    );
}

function ConnectionItem({ connection }: { connection: Connection }) {
    return (
        <div className={"flex flex-row gap-2"}>
            <div className={"flex flex-col gap-1"}>
                <p className={"font-bold"}>{connection.connectionName}</p>
                <p className={"text-ink-3"}>{connection.host}</p>
            </div>
        </div>
    );
}