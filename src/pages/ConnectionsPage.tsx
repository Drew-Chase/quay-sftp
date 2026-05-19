import {useNavigate} from "react-router-dom";
import {useConnectionGateway} from "../ConnectionGateway";
import {Connection} from "../ts/connection";
import {Divider} from "@heroui/react";

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
            </div>

            <Divider orientation={"vertical"}/>

            {/* Connections List */}
            <div className={"flex flex-col grow w-full"}>

            </div>
        </div>
    );
}