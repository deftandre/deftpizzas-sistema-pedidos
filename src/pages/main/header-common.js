import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
    createMuiTheme,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    useMediaQuery,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { HOME } from "routes";
import { useAuth } from "hooks";
import Logo from "./logo";

const HeaderCommon = () => {
    const [anchorElement, setAnchorElement] = useState(null);
    const { userInfo, logout } = useAuth();

    let theme = createMuiTheme();

    const handleOpenMenu = (e) => {
        setAnchorElement(e.target);
    };

    const handleClose = () => {
        setAnchorElement(null);
    };
    return (
        <>
            <LogoContainer>
                <LinkLogo to={HOME}>
                    <Logo />
                </LinkLogo>
            </LogoContainer>
            <Typography color="inherit">
                {useMediaQuery(theme.breakpoints.down("xs"))
                    ? null
                    : `Olá ${userInfo.user.firstName} =)`}
            </Typography>
            <IconButton color="inherit" onClick={handleOpenMenu}>
                <AccountCircle />
            </IconButton>

            <Menu
                open={!!anchorElement}
                onClose={handleClose}
                anchorEl={anchorElement}
            >
                <MenuItem onClick={logout}>Sair</MenuItem>
            </Menu>
        </>
    );
};

const LogoContainer = styled.div`
    flex-grow: 1;
`;

const LinkLogo = styled(Link)`
    display: inline-block;
`;

export default HeaderCommon;
