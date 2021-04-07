import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
    Grid,
    Typography,
    Stepper as MaterialStepper,
    Step,
    StepLabel,
} from "@material-ui/core";
import { Content, Divider, H4, HeaderContent } from "ui";
import { singularOrPlural } from "utils";

const OrderView = ({ pageConfig, orders, changeView }) => {
    const statusText = useMemo(
        () => ({
            pending: "pending",
            inProgress: "inProgress",
            outForDelivery: "outForDelivery",
        }),
        []
    );

    function getOrderStatus(status) {
        return !status
            ? 0
            : status === statusText.pending
            ? 0
            : status === statusText.inProgress
            ? 1
            : 2;
    }

    function getHour(date) {
        const options = {
            hour: "numeric",
            minute: "numeric",
        };
        return Intl.DateTimeFormat("pt-BR", options).format(date);
    }

    const ordersSteps = [
        "Pendente de aprovação",
        "Em andamento",
        "Saiu para entrega",
    ];

    return (
        <>
            <Content>
                <HeaderContent>
                    <H4>{pageConfig.title}</H4>
                </HeaderContent>
                <Divider />
                <Grid container>
                    {orders?.map((order) => {
                        const {
                            address,
                            number,
                            complement,
                            district,
                            code: cep,
                            city,
                            state,
                        } = order.address;
                        return (
                            <Grid item container key={order.id}>
                                <Grid
                                    container
                                    item
                                    xs={12}
                                    spacing={1}
                                    justify="center"
                                >
                                    <Stepper
                                        activeStep={getOrderStatus(
                                            order.status
                                        )}
                                    >
                                        {ordersSteps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Subtitle>
                                        Horário do pedido:{" "}
                                        {getHour(order.createdAt.toDate())}
                                    </Subtitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <Subtitle>Pedido:</Subtitle>

                                    <ul>
                                        {order.pizzas.map((pizza, index) => (
                                            <li key={index}>
                                                <Typography>
                                                    {pizza.quantity}{" "}
                                                    {singularOrPlural(
                                                        pizza.quantity,
                                                        "pizza",
                                                        "pizzas"
                                                    )}{" "}
                                                    {singularOrPlural(
                                                        pizza.quantity,
                                                        pizza.size.name,
                                                        pizza.size.name + "s"
                                                    ).toUpperCase()}{" "}
                                                    de{" "}
                                                    {pizza.flavours
                                                        .map(
                                                            (flavour) =>
                                                                flavour.name
                                                        )
                                                        .reduce(
                                                            (
                                                                acc,
                                                                flavour,
                                                                index,
                                                                array
                                                            ) => {
                                                                if (
                                                                    index === 0
                                                                ) {
                                                                    return flavour;
                                                                }

                                                                if (
                                                                    index ===
                                                                    array.length -
                                                                        1
                                                                ) {
                                                                    return `${acc} e ${flavour}`;
                                                                }

                                                                return `${acc}, ${flavour}`;
                                                            },
                                                            ""
                                                        )}
                                                </Typography>
                                            </li>
                                        ))}
                                    </ul>

                                    {order.follows.length !== 0 && (
                                        <Subtitle>Acompanhamentos:</Subtitle>
                                    )}

                                    {order.follows.length !== 0 && (
                                        <ul>
                                            {order.follows.map(
                                                (follow, index) => (
                                                    <li key={index}>
                                                        <Typography>
                                                            {follow.quantity}{" "}
                                                            {singularOrPlural(
                                                                follow.quantity,
                                                                "acompanhamento",
                                                                "acompanhamentos"
                                                            )}{" "}
                                                            {
                                                                follow
                                                                    .pizzaFollows
                                                                    .name
                                                            }
                                                        </Typography>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    )}

                                    {order.drinks.length !== 0 && (
                                        <Subtitle>Bebidas:</Subtitle>
                                    )}
                                    {order.drinks.length !== 0 && (
                                        <ul>
                                            {order.drinks.map(
                                                (drink, index) => (
                                                    <li key={index}>
                                                        <Typography>
                                                            {drink.quantity}{" "}
                                                            {singularOrPlural(
                                                                drink.quantity,
                                                                "acompanhamento",
                                                                "acompanhamentos"
                                                            )}{" "}
                                                            {
                                                                drink
                                                                    .pizzaDrinks
                                                                    .name
                                                            }
                                                        </Typography>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Subtitle>Endereço de entrega:</Subtitle>
                                    <Typography>
                                        {address}, {number && `nº ${number}`}{" "}
                                        {complement && `, ${complement}`}
                                        <br />
                                        Bairro: {district} - CEP: {cep}
                                        <br />
                                        {city} / {state}
                                    </Typography>
                                </Grid>
                                <Divider />
                            </Grid>
                        );
                    })}
                </Grid>
            </Content>
        </>
    );
};

OrderView.propTypes = {
    pageConfig: PropTypes.object.isRequired,
    orders: PropTypes.array.isRequired,
};

const Subtitle = styled(Typography).attrs({
    variant: "button",
})`
    font-weight: bold;
`;

const Stepper = styled(MaterialStepper).attrs({
    alternativeLabel: true,
})`
    background: ${({ theme }) => theme.palette.common.white};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    margin-bottom: 30px;
    width: 760px;
`;

export default OrderView;
