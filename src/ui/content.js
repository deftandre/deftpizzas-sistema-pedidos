import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container } from "@material-ui/core";

const Content = ({ children, ...props }) => {
    const [heightFooter, setHeightFooter] = useState(0);

    useEffect(() => {
        const heightSize = document.getElementsByTagName("footer")[0]
            ?.clientHeight;
        setHeightFooter(heightSize);
    }, [setHeightFooter]);

    return (
        <Main {...props} style={{ marginBottom: `${heightFooter}px` }}>
            <Container>{children}</Container>
        </Main>
    );
};

Content.propTypes = {
    children: PropTypes.node.isRequired,
};

const Main = styled.main`
    flex-grow: 1;
    padding: ${({ theme }) => theme.spacing(3)}px;
`;

export default Content;
