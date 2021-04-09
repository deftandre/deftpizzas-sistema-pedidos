import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import {
    Button as MaterialButton,
    Grid,
    Typography,
    useMediaQuery,
} from "@material-ui/core";

import { useAuth } from "hooks";
import { singularOrPlural } from "utils";

function FooterWithOrderAndButtons({ buttons, history, location }) {
    const { userInfo } = useAuth();

    const { pizzaSize, pizzaFlavours } = location.state;
    const { flavours, name, slices } = pizzaSize;

    return (
        <Grid container>
            <OrderContainer>
                <Text>
                    <b>{userInfo.user.firstName}, seu pedido é:</b>
                </Text>
                <Text>
                    Pizza <b>{name.toUpperCase()}</b> - ({slices}{" "}
                    {singularOrPlural(slices, "fatia", "fatias")}, {flavours}{" "}
                    {singularOrPlural(flavours, "sabor", "sabores")})
                </Text>
                {pizzaFlavours && (
                    <Typography>
                        {singularOrPlural(
                            pizzaFlavours.length,
                            "no sabor",
                            "nos sabores"
                        )}{" "}
                        <b>
                            {pizzaFlavours.map(({ name }) => name).join(", ")}
                        </b>
                    </Typography>
                )}
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
                <Button {...buttons.action} color="primary" component={Link} />
            </ButtonsContainer>
        </Grid>
    );
}

FooterWithOrderAndButtons.propTypes = {
    buttons: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

const Text = styled(Typography)`
    font-size: ${({ theme }) =>
        useMediaQuery(theme.breakpoints.down("xs")) ? "14px" : null};
`;

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
    font-size: ${({ theme }) =>
        useMediaQuery(theme.breakpoints.down("xs")) ? "11px" : null};
    margin-left: ${({ theme }) => theme.spacing(2)}px;
`;

export default withRouter(FooterWithOrderAndButtons);
