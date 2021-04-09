import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container } from "@material-ui/core";
import FooterWithOrderAndButtons from "./footer-with-order-and-buttons";

const Footer = ({ children, ...props }) => (
    <FooterContent>
        <Container>
            {children || <FooterWithOrderAndButtons {...props} />}
        </Container>
    </FooterContent>
);

Footer.propTypes = {
    children: PropTypes.node,
};

const FooterContent = styled.footer`
    box-shadow: 0 0 3px ${({ theme }) => theme.palette.grey.A400};
    padding: ${({ theme }) => theme.spacing(3)}px;
    width: 100%;
    background-color: #fafafa;
    background-image: none;
    background-repeat: repeat;
    background-attachment: scroll;
    background-position: 0% 0%;
    position: fixed;
    bottom: 0pt;
    left: 0pt;
`;

export default Footer;
