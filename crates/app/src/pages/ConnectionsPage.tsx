import {useNavigate} from "react-router-dom";
import {useConnectionGateway} from "../ConnectionGateway.tsx";
import {Connection} from "../ts/connection.ts";
import {Divider} from "@heroui/react";
import {ApplicationSplash} from "../components/connection_list/ApplicationSplash.tsx";
import {NewConnectionForm} from "../components/connection_list/NewConnectionForm.tsx";
import {SavedConnectionsList} from "../components/connection_list/SavedConnectionsList.tsx";

export function ConnectionsPage()
{
    const navigate = useNavigate();
    const {setActiveConnection} = useConnectionGateway();

    // @ts-ignore
    function handleSelectConnection(connection: Connection)
    {
        setActiveConnection(connection);
        navigate("/browser");
    }

    return (
        <div className={"flex flex-row h-screen w-full relative start"}>

            {/* Branding and new connection form */}
            <div className={"flex flex-col grow w-full start-left relative"}>
                <ApplicationSplash/>
                {/* Spacer */}
                <div className={"my-auto"}/>
                <NewConnectionForm/>
            </div>

            <Divider orientation={"vertical"}/>

            {/* Connections List */}
            <div className={"flex flex-col grow w-full"}>
                <SavedConnectionsList/>
            </div>
        </div>
    );
}