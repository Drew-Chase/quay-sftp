import {createBrowserRouter, useNavigate} from "react-router-dom";
import {HeroUIProvider, ToastProvider} from "@heroui/react";
import {ConnectionGatewayProvider, RedirectIfActiveConnection, RequireActiveConnection} from "./ConnectionGateway";
import {ConnectionsPage} from "./pages/ConnectionsPage";
import {BrowsePage} from "./pages/BrowsePage";
import AppShell from "./components/shell/AppShell";

function RootLayout()
{
    const navigate = useNavigate();

    return (
        <HeroUIProvider navigate={navigate}>
            <ToastProvider
                placement={"bottom-right"}
                toastProps={{
                    shouldShowTimeoutProgress: true,
                    timeout: 3000,
                    variant: "flat"
                }}
            />

            <AppShell/>
        </HeroUIProvider>
    );
}

export const router = createBrowserRouter([
    {
        element: <RootLayout/>,
        children: [
            {
                element: <ConnectionGatewayProvider/>,
                children: [
                    {
                        element: <RedirectIfActiveConnection/>,
                        children: [
                            {
                                path: "/",
                                element: <ConnectionsPage/>
                            }
                        ]
                    },
                    {
                        element: <RequireActiveConnection/>,
                        children: [
                            {
                                path: "/browser",
                                element: <BrowsePage/>
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);
