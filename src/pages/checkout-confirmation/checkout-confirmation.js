import React from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import {
    Button,
    Container,
    Divider as MaterialDivider,
    Paper,
    Typography,
} from "@material-ui/core";
import { Content, H4, H6, OrderInfo } from "ui";
import FooterCheckout from "pages/checkout/footer-checkout";
import { useAuth, useOrder } from "hooks";
import { CHECKOUT, CHECKOUT_SUCCESS, HOME } from "routes";

const CheckoutConfirmation = () => {
    const { userName, userInfo } = useAuth();
    const { order, sendOrder } = useOrder();

    if (!order.pizzas.length) {
        return <Redirect to={HOME} />;
    }

    if (!order.address.address || !order.phone) {
        return <Redirect to={CHECKOUT} />;
    }

    return (
        <>
            <Content>
                <Header>
                    <H4>
                        Oi{" "}
                        {userInfo.user.firstName === "" ||
                        userInfo.user.firstName
                            ? userName
                            : userInfo.user.firstName}
                        !
                    </H4>
                    <Typography>
                        Confere, por favor, se está tudo certo com o seu pedido
                        antes de finalizar?
                    </Typography>
                </Header>
                <Container maxWidth="sm">
                    <PaperContainer>
                        <H6>Seu pedido:</H6>
                        <OrderInfo />

                        <Divider />

                        <H6>Endereço para entrega:</H6>
                        <Typography>
                            {order.address.address},{" n "}
                            {order.address.number}, {order.address.complement}
                            <br />
                            Bairro: {order.address.district} <br />
                            CEP: {order.address.code} <br />
                            {order.address.city}/{order.address.state}
                        </Typography>

                        <Divider />

                        <H6>Telefone para contato</H6>
                        <Typography>{order.phone}</Typography>
                    </PaperContainer>
                </Container>
            </Content>

            <FooterCheckout justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={Link}
                    to={CHECKOUT_SUCCESS}
                    onClick={sendOrder}
                >
                    Tudo certo!
                </Button>
            </FooterCheckout>
        </>
    );
};

const Divider = styled(MaterialDivider)`
    margin: ${({ theme }) => theme.spacing(3, 0)};
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing(3)}px;
    text-align: center;
`;

const PaperContainer = styled(Paper)`
    padding: ${({ theme }) => theme.spacing(3)}px;
`;

export default CheckoutConfirmation;
