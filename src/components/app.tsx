import { MINI_APP_ID } from "@constants/common";
import Routes from "@pages";
import { useStore } from "@store";
import React, { useEffect } from "react";
import { App } from "zmp-ui";
import SnackbarProvider from "zmp-ui/snackbar-provider";
import Auth from "./Auth";
import ErrorNotification from "./notifications/ErrorNotification";

const SnackbarProviderComponent = SnackbarProvider as unknown as React.FC<{
    children: React.ReactNode;
}>;

const MyApp = () => {
    const token = useStore(state => state.token);
    const organization = useStore(state => state.organization);

    const getOrganization = useStore(state => state.getOrganization);

    const getOrg = async () => {
        try {
            await getOrganization({ miniAppId: MINI_APP_ID });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // NOTE: Chỉ fetch organization khi chưa có cache để tránh nháy/loading lại sau khi quay về từ webview.
        if (token && (!organization || Object.keys(organization).length === 0)) {
            getOrg();
        }
    }, [token, organization]);

    return (
        <App>
            <SnackbarProviderComponent>
                <ErrorNotification />
                <Auth />
                <Routes />
            </SnackbarProviderComponent>
        </App>
    );
};
export default MyApp;
