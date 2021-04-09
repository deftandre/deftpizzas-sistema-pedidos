import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button as MaterialButton, Container, Grid } from "@material-ui/core";

function SimpleFooter({ buttons }) {
    return (
        <FooterContent>
            <Container>
                <Grid container>
                    <SpaceContainer></SpaceContainer>
                    <ButtonsContainer>
                        <Button
                            {...buttons.action}
                            color="primary"
                            component={Link}
                        />
                    </ButtonsContainer>
                </Grid>
            </Container>
        </FooterContent>
    );
}

SimpleFooter.propTypes = {
    buttons: PropTypes.object.isRequired,
};

const SpaceContainer = styled(Grid).attrs({ item: true })`
    flex-grow: 1;
`;

const ButtonsContainer = styled(Grid).attrs({ item: true })`
    align-items: center;
    display: flex;
`;

const Button = styled(MaterialButton).attrs({
    variant: "contained",
})`
    margin-left: ${({ theme }) => theme.spacing(2)}px;
`;

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

export default SimpleFooter;
