import {useEffect, useState} from "react";
import {Workspace} from "../../ts/workspace.ts";
import {Select} from "../extends/Select.tsx";
import {Avatar, SelectItem} from "@heroui/react";
import {useConnectionGateway} from "../../ConnectionGateway.tsx";

export function WorkspaceSelect()
{
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const {selectedWorkspace, setSelectedWorkspace} = useConnectionGateway();

    useEffect(() =>
    {
        Workspace.fetch().then(workspaces =>
        {
            setWorkspaces(workspaces);

            if (!selectedWorkspace && workspaces.length > 0)
            {
                setSelectedWorkspace(workspaces[0]);
                console.log("Selected workspace set to default", workspaces[0]);
            }
        });
    }, [selectedWorkspace]);

    return (
        <Select
            aria-label={"Workspace selection"}
            classNames={{
                trigger: "max-w-[200px] bg-surface-1 rounded-full text-ink-3",
                value: "!text-ink-3 text-sm mt-1"
            }}
            size={"sm"}
            selectedKeys={[selectedWorkspace?.id] as Iterable<any>}
            onSelectionChange={(value) => setSelectedWorkspace(workspaces.find(w => w.id === value))}
            disallowEmptySelection
            startContent={selectedWorkspace ? <WorkspaceAvatar workspace={selectedWorkspace}/> : undefined}
        >
            {
                workspaces.map(workspace =>
                    <SelectItem
                        key={workspace.id}
                        textValue={workspace.name}
                        startContent={<WorkspaceAvatar workspace={workspace}/>}
                    >
                        {workspace.name}
                    </SelectItem>
                )
            }
        </Select>
    );

}


function WorkspaceAvatar({workspace}: { workspace: Workspace })
{
    return (
        <Avatar
            size={"sm"}
            name={workspace.name[0]}
            className={"aspect-square max-w-5 max-h-5 rounded-sm text-2xs"}
            style={{backgroundColor: workspace.color}}
        />
    );
}