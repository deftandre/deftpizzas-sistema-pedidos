import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import {
    Button as MaterialButton,
    Container,
    Grid,
    Typography,
    useMediaQuery,
} from "@material-ui/core";

import { useAuth } from "hooks";

function FooterFollowQuantity({ buttons, history, location }) {
    const { userInfo } = useAuth();

    const { pizzaFollows } = location.state;
    const { name } = pizzaFollows;

    return (
        <FooterContent>
            <Container>
                <Grid container>
                    <OrderContainer>
                        <Text>
                            <b>
                                {userInfo.user.firstName}, seu acompanhamento é:
                            </b>
                        </Text>
                        <Text>
                            Acompanhamento <b>{name.toUpperCase()}</b>
                        </Text>
                    </OrderContainer>
                    <ButtonsContainer>
                        <Button
                            {...buttons.back}
                            component="a"
                            onClick={(e) => {
                                e.preventDefault();
                                history.goBack();
                            }}
                        />
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

FooterFollowQuantity.propTypes = {
    buttons: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

const OrderContainer = styled(Grid).attrs({ item: true })`
    flex-grow: 1;
`;

const ButtonsContainer = styled(Grid).attrs({ item: true })`
    align-items: center;
    display: flex;
`;

const Text = styled(Typography)`
    font-size: ${({ theme }) =>
        useMediaQuery(theme.breakpoints.down("xs")) ? "14px" : null};
`;

const Button = styled(MaterialButton).attrs({
    variant: "contained",
})`
    font-size: ${({ theme }) =>
        useMediaQuery(theme.breakpoints.down("xs")) ? "11px" : null};
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

export default withRouter(FooterFollowQuantity);
