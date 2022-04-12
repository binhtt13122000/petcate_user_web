import { Box, CssBaseline, Toolbar } from "@mui/material";
import AppBarWithDrawer from "components/AppBar";
import DrawerBase from "components/Drawer";
import React from "react";

const drawerWidth = 250;
const appbarHeight = 70;
const DefaultLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBarWithDrawer
                drawerWidth={drawerWidth}
                appbarHeight={appbarHeight}
                handleDrawerToggle={handleDrawerToggle}
            />
            <DrawerBase
                drawerWidth={drawerWidth}
                appbarHeight={appbarHeight}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        pt: 3,
                    }}
                >
                    <Box sx={{ width: "95%" }}>{children}</Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DefaultLayout;
