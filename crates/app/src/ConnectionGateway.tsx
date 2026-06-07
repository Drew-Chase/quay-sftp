import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Connection} from "./ts/connection.ts";
import {Workspace} from "./ts/workspace.ts";

type ConnectionGatewayContextType = {
    activeConnection: Connection | undefined;
    setActiveConnection: Dispatch<SetStateAction<Connection | undefined>>;
    selectedWorkspace: Workspace | undefined;
    setSelectedWorkspace: Dispatch<SetStateAction<Workspace | undefined>>;
}

const ConnectionGatewayContext = createContext<ConnectionGatewayContextType | undefined>(undefined);

export function ConnectionGatewayProvider()
{
    const [activeConnection, setActiveConnection] = useState<Connection | undefined>(undefined);
    const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | undefined>(undefined);

    return (
        <ConnectionGatewayContext.Provider
            value={{
                activeConnection,
                setActiveConnection,
                selectedWorkspace,
                setSelectedWorkspace,
            }}
        >
            <Outlet/>
        </ConnectionGatewayContext.Provider>
    );
}

export function RequireActiveConnection()
{
    const {activeConnection} = useConnectionGateway();

    if (!activeConnection)
    {
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;
}

export function RedirectIfActiveConnection()
{
    const {activeConnection} = useConnectionGateway();

    if (activeConnection)
    {
        return <Navigate to="/browser" replace/>;
    }

    return <Outlet/>;
}

export function useConnectionGateway(): ConnectionGatewayContextType
{
    const context = useContext(ConnectionGatewayContext);
    if (!context)
    {
        throw new Error("useConnectionGateway must be used within a ConnectionGatewayProvider");
    }
    return context;
}