import React, { useCallback } from "react";
import styled from "styled-components";
import { Redirect, useHistory } from "react-router-dom";
import { Button, Grid, Paper } from "@material-ui/core";
import { Content, OrderInfo, Title as UiTitle } from "ui";
import FooterCheckout from "./footer-checkout";
import FormAddress from "./form-address";
import PhoneField from "./phone-field";
import { CHECKOUT_CONFIRMATION, HOME } from "routes";
import { useOrder } from "hooks";

const Checkout = () => {
    const { order, addAddress, addPhone } = useOrder();

    const history = useHistory();

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            history.push(CHECKOUT_CONFIRMATION);
        },
        [history]
    );

    if (!order.pizzas.length) {
        return <Redirect to={HOME} />;
    }

    return (
        <>
            <Content>
                <Grid container spacing={4}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        component="form"
                        id="form-order"
                        onSubmit={handleSubmit}
                    >
                        <Title>Qual o endereço para entrega?</Title>
                        <PaperContainer>
                            <FormAddress onUpdate={addAddress} />
                        </PaperContainer>

                        <Title>Qual o seu telefone?</Title>
                        <PaperContainer>
                            <PhoneField onUpdate={addPhone} />
                        </PaperContainer>
                    </Grid>
                    <Grid container item xs={12} md={6} direction="column">
                        <Title>Informações do seu pedido:</Title>
                        <PaperContainer>
                            <OrderInfo showOptions />
                        </PaperContainer>
                    </Grid>
                </Grid>
            </Content>
            <FooterCheckout>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    form="form-order"
                >
                    Confirmar pedido
                </Button>
            </FooterCheckout>
        </>
    );
};

const Title = styled(UiTitle).attrs({ variant: "h6" })`
    text-align: left;
`;

const PaperContainer = styled(Paper)`
    flex-grow: 1;
    margin-bottom: ${({ theme }) => theme.spacing(5)}px;
    padding: ${({ theme }) => theme.spacing(2)}px;
`;

export default Checkout;
