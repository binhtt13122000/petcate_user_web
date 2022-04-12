import { Box, Drawer } from "@mui/material";
import ListRoutes from "components/ListRoutes";
import React from "react";

export interface IDrawerBase {
    window?: () => Window;
    mobileOpen: boolean;
    drawerWidth: number;
    appbarHeight: number;
    handleDrawerToggle: () => void;
}
const DrawerBase: React.FC<IDrawerBase> = (props: IDrawerBase) => {
    const { window } = props;

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            component="nav"
            sx={{ width: { md: props.drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                container={container}
                variant="temporary"
                open={props.mobileOpen}
                onClose={props.handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", md: "none" },
                    marginTop: "50px",
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: props.drawerWidth },
                }}
            >
                <ListRoutes appbarHeight={props.appbarHeight} />
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: props.drawerWidth },
                }}
                open
            >
                <ListRoutes appbarHeight={props.appbarHeight} />
            </Drawer>
        </Box>
    );
};

export default DrawerBase;
