import React from "react";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import ReactDOM from "react-dom/client";

import "./css/index.css";
import Home from "./pages/Home.tsx";
import {HeroUIProvider, ToastProvider} from "@heroui/react";
import AppShell from "./components/shell/AppShell.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <MainContentRenderer/>
        </BrowserRouter>
    </React.StrictMode>
);

export function MainContentRenderer()
{
    const navigate = useNavigate();
    window.addEventListener("contextmenu", e => e.preventDefault());
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

            <Routes>
                <Route element={<AppShell/>}>
                    <Route path="/" element={<Home/>}/>
                </Route>
            </Routes>
        </HeroUIProvider>
    );
}