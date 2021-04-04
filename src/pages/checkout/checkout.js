import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { Button, Grid, Paper } from "@material-ui/core";
import { Content, OrderInfo, Title as UiTitle } from "ui";
import FooterCheckout from "./footer-checkout";
import FormAddress from "./form-address";
import PhoneField from "./phone-field";
import { CHECKOUT_CONFIRMATION, HOME } from "routes";
import { useOrder } from "hooks";

const Checkout = () => {
    const { order, addAddress, addPhone } = useOrder();
    const [checkForm, setCheckForm] = useState(true);

    useEffect(() => {
        console.log(order);
        if (
            order &&
            order.address.code &&
            order.address.address !== "" &&
            order.address.number !== "" &&
            order.address.city !== "" &&
            order.address.state !== "" &&
            order.phone.length > 13
        ) {
            setCheckForm(false);
            console.log(checkForm);
        }
    }, [checkForm, order]);

    if (!order.pizzas.length) {
        return <Redirect to={HOME} />;
    }

    return (
        <>
            <Content>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
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
                    component={Link}
                    to={CHECKOUT_CONFIRMATION}
                    disabled={checkForm}
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
