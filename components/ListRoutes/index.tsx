import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import RoutesCollapse from "./components/RoutesCollapse";

import { routes } from "./data";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItem, Divider, ListItemIcon, Box, Typography, ListItemText } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export type ChildrenType = {
    fatherIndex: number;
    selectedChildIndex: number;
    isOpen: boolean;
};

type ListRoutesType = {
    appbarHeight: number;
};

const ListRoutes: React.FC<ListRoutesType> = ({ appbarHeight }) => {
    const itemSelected = null;
    const { t } = useTranslation();
    const router = useRouter();
    const [openChildren, setOpenChildren] = useState<ChildrenType>(
        itemSelected == null
            ? {
                  fatherIndex: -1,
                  selectedChildIndex: -1,
                  isOpen: false,
              }
            : JSON.parse(itemSelected)
    );

    useEffect(() => {
        sessionStorage.setItem("itemSelected", JSON.stringify(openChildren));
    }, [openChildren]);
    const handleListItemClick = (
        index: number,
        path: string | undefined,
        hasChildren: boolean,
        fatherIndex: number
    ) => {
        if (path) {
            router.push(path);
        }
        if (hasChildren) {
            setOpenChildren((prev) => {
                return {
                    ...prev,
                    fatherIndex: fatherIndex,
                    selectedChildIndex: index,
                    isOpen: prev.fatherIndex != fatherIndex ? true : !prev.isOpen,
                };
            });
        } else {
            setOpenChildren((prev) => {
                return {
                    ...prev,
                    selectedChildIndex: index,
                    fatherIndex: fatherIndex,
                    isOpen: true,
                };
            });
        }
    };

    return (
        <React.Fragment>
            {/* <Toolbar /> */}
            <Box
                sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "nowrap",
                    columnGap: "10px",
                    alignItems: "center",
                    height: appbarHeight,
                }}
                display="none"
            >
                <Image src="/images/dog-logo.png" alt="petapp-logo" width={60} height={60} />
                <Typography
                    component="h3"
                    fontWeight="600"
                    fontSize="18px"
                    fontFamily="Poppins, sans-serif"
                    whiteSpace="normal"
                    lineHeight="1.5"
                >
                    Pet Store
                </Typography>
            </Box>
            <Divider />
            {routes.map((item) => (
                <React.Fragment key={item.name}>
                    <ListItem
                        button
                        key={item.name}
                        onClick={() =>
                            handleListItemClick(item.id, item.path, Boolean(item.children), item.id)
                        }
                        selected={openChildren.fatherIndex === item.id}
                    >
                        <ListItemIcon>
                            <Image src={item.icon} width={30} height={30} alt={"icon"} />
                        </ListItemIcon>
                        <ListItemText primary={t(`${item.name}`)} />
                        {item?.children ? (
                            openChildren.fatherIndex == item.id && openChildren.isOpen ? (
                                <ExpandLess />
                            ) : (
                                <ExpandMore />
                            )
                        ) : null}
                    </ListItem>
                    {item?.children ? (
                        <RoutesCollapse
                            item={item?.children}
                            fatherId={item?.id}
                            handleListItemClick={handleListItemClick}
                            openChildren={openChildren}
                        />
                    ) : null}
                </React.Fragment>
            ))}
        </React.Fragment>
    );
};

export default ListRoutes;
