import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Footer } from "ui";

const FooterCheckout = ({ children, justifyContent }) => {
    return (
        <Footer>
            <FooterContent justifyContent={justifyContent}>
                {children}
            </FooterContent>
        </Footer>
    );
};

FooterCheckout.propTypes = {
    children: PropTypes.node.isRequired,
    justifyContent: PropTypes.string,
};

const FooterContent = styled.div`
    display: flex;
    justify-content: ${({ justifyContent }) => justifyContent || "flex-end"};
    align-items: center;
`;

export default FooterCheckout;
