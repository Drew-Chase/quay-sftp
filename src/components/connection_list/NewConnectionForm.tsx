import {Button, Card, CardBody, CardFooter, CardHeader, Form, Input, NumberInput, Tab, Tabs} from "@heroui/react";
import {useEffect, useRef, useState} from "react";
import {Icon} from "@iconify-icon/react";

export function NewConnectionForm()
{
    const [selectedProtocol, setSelectedProtocol] = useState<"sftp" | "ftp" | "s3">("sftp");
    const [host, setHost] = useState("");
    const [username, setUsername] = useState("");
    const [port, setPort] = useState(22);
    const [remotePath, setRemotePath] = useState<string | undefined>(undefined);
    const form = useRef<HTMLFormElement | undefined>(undefined);

    useEffect(() =>
    {
        console.log("Selected protocol changed:", selectedProtocol);
        switch (selectedProtocol)
        {
            case "sftp":
                setPort(22);
                break;
            case "ftp":
                setPort(21);
                break;
            case "s3":
                setPort(9000);
                break;
        }
    }, [selectedProtocol]);

    return (
        <Card className={"border-1 border-hairline-strong p-4"}>
            <CardHeader className={"flex flex-row items-center justify-between"}>
                <h4 className={"text-sm text-ink-3 uppercase"}>Quick Connect</h4>
                <Tabs
                    color={"primary"}
                    radius={"full"}
                    size={"sm"}
                    variant={"bordered"}
                    onSelectionChange={(value) => setSelectedProtocol(value as "sftp" | "ftp" | "s3")}
                >
                    <Tab title={"SFTP"} key={"sftp"}/>
                    <Tab title={"FTP"} key={"ftp"}/>
                    <Tab title={"S3"} key={"s3"}/>
                </Tabs>
            </CardHeader>
            <CardBody>
                <Form className={"flex flex-col gap-4"} ref={form}>
                    <Input
                        label={"host"}
                        placeholder={"user@hostname or hostname"}
                        isRequired
                        variant={"faded"}
                        labelPlacement={"outside-top"}
                        value={host}
                        onValueChange={setHost}
                        classNames={{
                            label: "uppercase text-2xs text-ink-3 -mb-1",
                            input: "placeholder:text-ink-4 placeholder:text-sm",
                            inputWrapper: "bg-surface-2 border-hairline border-1"
                        }}
                    />
                    <div className={"flex flex-row gap-2"}>
                        <Input
                            label={"username"}
                            placeholder={"root"}
                            isRequired
                            variant={"faded"}
                            labelPlacement={"outside-top"}
                            value={username}
                            onValueChange={setUsername}
                            classNames={{
                                label: "uppercase text-2xs text-ink-3 -mb-1",
                                input: "placeholder:text-ink-4 placeholder:text-sm",
                                inputWrapper: "bg-surface-2 border-hairline border-1"
                            }}
                        />

                        <NumberInput
                            label={"host"}
                            placeholder={"22"}
                            variant={"faded"}
                            labelPlacement={"outside-top"}
                            formatOptions={{useGrouping: false}}
                            value={port}
                            onValueChange={setPort}
                            classNames={{
                                label: "uppercase text-2xs text-ink-3 -mb-1",
                                input: "placeholder:text-ink-4 placeholder:text-sm",
                                inputWrapper: "bg-surface-2 border-hairline border-1"
                            }}
                        />
                    </div>
                    <Input
                        label={<>remote path <span className={"lowercase text-ink-4"}>optional</span></>}
                        placeholder={"root"}
                        variant={"faded"}
                        labelPlacement={"outside-top"}
                        value={remotePath}
                        onValueChange={setRemotePath}
                        classNames={{
                            label: "uppercase text-2xs text-ink-3 -mb-1",
                            input: "placeholder:text-ink-4 placeholder:text-sm",
                            inputWrapper: "bg-surface-2 border-hairline border-1"
                        }}
                    />
                </Form>
            </CardBody>
            <CardFooter className={"flex flex-row items-center justify-between"}>
                <div className={"flex flex-row gap-2"}>
                    <Button color={"primary"} size={"sm"} startContent={<Icon icon={"lucide:key"}/>}>Connect</Button>
                    <Button size={"sm"} startContent={<Icon icon={"lucide:plus"}/>}>Save &amp; Connect</Button>
                </div>
                <Button variant={"light"} startContent={<Icon icon={"lucide:upload"}/>} size={"sm"} className={"text-ink-2"}>Import .ssh/config</Button>
            </CardFooter>
        </Card>
    );
}