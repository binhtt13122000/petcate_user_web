import { AccountCircle } from "@mui/icons-material";
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import React from "react";
import Image from "next/image";
import LanguageSwitcher from "components/LanguageSwitcher";

type IAppBarWithDrawer = {
    drawerWidth: number;
    appbarHeight: number;
    handleDrawerToggle: () => void;
};

const AppBarWithDrawer: React.FC<IAppBarWithDrawer> = ({
    drawerWidth,
    appbarHeight,
    handleDrawerToggle,
}) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar
            position="fixed"
            style={{
                zIndex: theme.zIndex.drawer + 1,
                height: appbarHeight,
            }}
            sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1, display: { md: "none" } }}>
                    <Image src="/images/dog-logo.png" alt="dog-logo" width={70} height={70} />
                </Box>
                <Box
                    sx={{
                        display: { md: "flex" },
                        flexGrow: { md: "1" },
                        justifyContent: { md: "flex-end" },
                    }}
                >
                    <Tooltip title="Notification">
                        <IconButton
                            size="large"
                            aria-label="notification"
                            aria-controls="noti-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <CircleNotificationsIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Account">
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem>Thông tin cá nhân</MenuItem>
                        <MenuItem>Đăng xuất</MenuItem>
                    </Menu>
                    <LanguageSwitcher />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarWithDrawer;
