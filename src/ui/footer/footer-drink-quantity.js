import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import {
    Button as MaterialButton,
    Container,
    Grid,
    Typography,
} from "@material-ui/core";

import { useAuth } from "hooks";

function FooterDrinkQuantity({ buttons, history, location }) {
    const { userInfo } = useAuth();

    const { pizzaDrinks } = location.state;
    const { name } = pizzaDrinks;

    return (
        <FooterContent>
            <Container>
                <Grid container>
                    <OrderContainer>
                        <Typography>
                            <b>{userInfo.user.firstName}, sua bebida é:</b>
                        </Typography>
                        <Typography>
                            Bebida <b>{name.toUpperCase()}</b>
                        </Typography>
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

FooterDrinkQuantity.propTypes = {
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

const Button = styled(MaterialButton).attrs({
    variant: "contained",
})`
    margin-left: ${({ theme }) => theme.spacing(2)}px;
`;

const FooterContent = styled.footer`
    box-shadow: 0 0 3px ${({ theme }) => theme.palette.grey.A400};
    padding: ${({ theme }) => theme.spacing(3)}px;
    width: 100%;
`;

export default withRouter(FooterDrinkQuantity);
