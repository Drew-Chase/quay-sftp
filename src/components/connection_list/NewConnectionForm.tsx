import {Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Form, SelectItem, Tab, Tabs} from "@heroui/react";
import {useEffect, useState} from "react";
import {Icon} from "@iconify-icon/react";

import {Input} from "../extends/Input";
import {NumberInput} from "../extends/NumberInput";
import {TagGroupSelector, TagOption} from "../TagOptions.tsx";
import {FileInput} from "../extends/FileInput.tsx";
import {Select} from "../extends/Select.tsx";
import {Switch} from "../extends/Switch.tsx";

export function NewConnectionForm()
{
    const [selectedProtocol, setSelectedProtocol] = useState<"sftp" | "ftp" | "s3">("sftp");
    const [host, setHost] = useState("");
    const [username, setUsername] = useState("");
    const [port, setPort] = useState(22);
    const [remotePath, setRemotePath] = useState<string | undefined>(undefined);
    const [selectedTag, setSelectedTag] = useState<TagOption | undefined>();
    const [connectionName, setConnectionName] = useState<string | undefined>();

    // Key File Authentication
    const [keyFile, setKeyFile] = useState<string | undefined>();
    const [passphrase, setPassphrase] = useState<string | undefined>();

    // Password Authentication
    const [password, setPassword] = useState<string | undefined>();
    const [showPasswordText, setShowPasswordText] = useState(false);
    const [passwordSaveMethod, setPasswordSaveMethod] = useState<"Don't Save" | "This Session" | "Keychain">("This Session");

    // Connection Settings
    const [jumpHost, setJumpHost] = useState<string | undefined>();
    const [keepAlive, setKeepAlive] = useState(30);
    const [encoding, setEncoding] = useState("UTF-8");

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
        <Card
            className={"border-1 border-hairline-strong p-4"}
            classNames={{
                base: "max-h-screen"
            }}

        >
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
                <Form className={"flex flex-col gap-4"}>
                    <Input
                        label={"host"}
                        placeholder={"user@hostname or hostname"}
                        isRequired
                        value={host}
                        onValueChange={setHost}
                    />
                    <div className={"flex flex-row gap-2 w-full"}>
                        <Input
                            label={"username"}
                            placeholder={"root"}
                            isRequired
                            value={username}
                            onValueChange={setUsername}
                        />

                        <NumberInput
                            label={"host"}
                            placeholder={"22"}
                            formatOptions={{useGrouping: false}}
                            value={port}
                            onValueChange={setPort}
                        />
                    </div>
                    <Input
                        label={<>remote path <span className={"lowercase text-ink-4"}>- optional</span></>}
                        placeholder={"root"}
                        value={remotePath}
                        onValueChange={setRemotePath}
                    />

                    <Accordion
                        itemClasses={{
                            title: "uppercase text-2xs text-ink-2"
                        }}
                    >
                        <AccordionItem title={"ADVANCED"} className={"flex flex-col gap-2"}>
                            <div className={"flex flex-row gap-4"}>
                                <Input
                                    label={<>Connection Name <span className={"lowercase text-ink-4"}>- for saved list</span></>}
                                    placeholder={"e.g. Production - web-01"}
                                    className={"grow"}
                                    value={connectionName}
                                    onValueChange={setConnectionName}
                                />
                                <TagGroupSelector
                                    label={"COLOR TAG"}
                                    size={"sm"}
                                    className={"my-auto"}
                                    value={selectedTag}
                                    onChange={setSelectedTag}
                                />
                            </div>

                            <Card
                                classNames={{
                                    base: "bg-surface-0 border-1 border-hairline my-2",
                                    header: "text-ink-3 uppercase text-2xs gap-2"
                                }}
                            >
                                <CardHeader><Icon icon={"lucide:lock"}/> authentication</CardHeader>
                                <CardBody>
                                    <Tabs size={"sm"} variant={"bordered"} fullWidth className={"bg-surface-1"}>
                                        <Tab title={"Key file"} key={"key-file"} className={"flex flex-col gap-2"}>
                                            <FileInput
                                                label={"Private key file"}
                                                startContent={<Icon icon={"lucide:key"} className={"text-xs text-ink-3 mr-2"}/>}
                                                placeholder={"~/.ssh/id_ed25519"}
                                                size={"lg"}
                                                value={keyFile}
                                                onValueChange={setKeyFile}
                                                classNames={{
                                                    input: "text-sm font-mono text-ink-2"
                                                }}
                                                fileOpenProps={{
                                                    title: "Select Key File",
                                                    filters: [
                                                        {name: "All Files", extensions: ["*"]}
                                                    ]
                                                }}
                                            />
                                            <Input
                                                label={<>passphrase <span className={"lowercase text-ink-4"}>- optional</span></>}
                                                placeholder={"Leave blank if none"}
                                                type={"password"}
                                                value={passphrase}
                                                onValueChange={setPassphrase}
                                            />
                                        </Tab>
                                        <Tab title={"Password"} key={"password"}>
                                            <Input
                                                label={"password"}
                                                placeholder={"•••••••••"}
                                                type={showPasswordText ? "text" : "password"}
                                                value={password}
                                                onValueChange={setPassword}
                                                endContent={
                                                    <Button
                                                        variant="light"
                                                        size="sm"
                                                        className={"uppercase text-ink-3"}
                                                        onPress={() => setShowPasswordText(prev => !prev)}
                                                    >
                                                        {showPasswordText ? "Hide" : "Show"}
                                                    </Button>
                                                }
                                            />
                                            <div className={"flex flex-row gap-2 my-2"}>
                                                <p className={"uppercase text-xs text-ink-3 text-nowrap my-auto"}>Save password</p>
                                                <Tabs
                                                    fullWidth
                                                    color={"primary"}
                                                    size={"sm"}
                                                    variant={"bordered"}
                                                    className={"bg-surface-1"}
                                                    classNames={{
                                                        cursor: "bg-primary/20 border-1 border-primary/50",
                                                        tabContent: "group-data-[selected=true]:text-primary text-xs"
                                                    }}
                                                    onSelectionChange={(value) => setPasswordSaveMethod(value as "This Session" | "Keychain" | "Don't Save")}
                                                    selectedKey={passwordSaveMethod}
                                                >
                                                    <Tab title={"Don't Save"} key={"Don't Save"}/>
                                                    <Tab title={"This Session"} key={"This Session"}/>
                                                    <Tab title={"Keychain"} key={"Keychain"}/>
                                                </Tabs>
                                            </div>
                                        </Tab>
                                        <Tab title={"SSH agent"} key={"ssh-agent"}>

                                        </Tab>
                                    </Tabs>
                                </CardBody>

                            </Card>

                            <Card
                                classNames={{
                                    base: "bg-surface-0 border-1 border-hairline my-2",
                                    header: "text-ink-3 uppercase text-2xs gap-2"
                                }}
                            >
                                <CardHeader><Icon icon={"lucide:network"}/> connection</CardHeader>
                                <CardBody className={"flex flex-col gap-4"}>
                                    <div className={"flex flex-row gap-2"}>
                                        <Input
                                            label={<>jump host<span className={"lowercase text-ink-4"}>- optional</span></>}
                                            placeholder={"jumphost.example.com"}
                                            value={jumpHost}
                                            onValueChange={setJumpHost}
                                        />
                                        <NumberInput
                                            label={"keep alive"}
                                            placeholder={"30"}
                                            value={keepAlive}
                                            onValueChange={setKeepAlive}
                                            endContent={<span className={"uppercase text-sm text-ink-4 font-bold"}>sec</span>}
                                        />
                                        <Select
                                            label={"encoding"}
                                            defaultSelectedKeys={["UTF-8"]}
                                            value={encoding}
                                            onSelectionChange={keys => setEncoding([...keys][0] as string)}
                                            disallowEmptySelection
                                        >
                                            <SelectItem key={"UTF-8"} textValue={"UTF-8"}>UTF-8</SelectItem>
                                            <SelectItem key={"Latin-1"} textValue={"Latin-1"}>Latin-1</SelectItem>
                                            <SelectItem key={"Shift-JIS"} textValue={"Shift-JIS"}>Shift-JIS</SelectItem>
                                            <SelectItem key={"GBK"} textValue={"GBK"}>GBK</SelectItem>
                                        </Select>
                                    </div>

                                    <div className={"flex flex-row gap-4"}>
                                        <Switch size={"sm"} isSelected={true}>
                                            Strict host key check
                                        </Switch>
                                        <Switch size={"sm"}>
                                            Enable compression
                                        </Switch>
                                    </div>

                                </CardBody>

                            </Card>

                        </AccordionItem>
                    </Accordion>

                    <div className={"flex flex-row items-center justify-between w-full"}>
                        <div className={"flex flex-row gap-2"}>
                            <Button color={"primary"} size={"sm"} startContent={<Icon icon={"lucide:key"}/>} type={"submit"}>Connect</Button>
                            <Button variant={"faded"} size={"sm"} startContent={<Icon icon={"lucide:plus"}/>} type={"submit"}>Save &amp; Connect</Button>
                        </div>
                        <Button variant={"light"} startContent={<Icon icon={"lucide:upload"}/>} size={"sm"} className={"text-ink-2"}>Import .ssh/config</Button>
                    </div>
                </Form>
            </CardBody>
        </Card>
    );
}