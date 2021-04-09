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
import { CHECKOUT, HOME } from "routes";

const CheckoutSuccess = () => {
    const { userName, userInfo } = useAuth();
    const { order } = useOrder();

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
                    <H4>Prontinho {userInfo.user.firstName}!</H4>
                    <Typography>
                        Seu pedido será entregue no endereço abaixo em até
                    </Typography>
                    <H6>40 minutos =)</H6>
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
                    color="secondary"
                    size="large"
                    component={Link}
                    to={HOME}
                >
                    {"<"} Voltar para a Página Inicial
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

export default CheckoutSuccess;
