import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import {
    Card as MaterialCard,
    Grid,
    LinearProgress,
    Typography,
} from "@material-ui/core";
import {
    CardLink,
    Content,
    Divider,
    SimpleFooter,
    H4,
    HeaderContent,
    PizzasGrid,
} from "ui";
import { toMoney } from "utils";
import { HOME, CHECKOUT, CHOOSE_PIZZA_DRINK_QUANTITY } from "routes";
import { useCollection, useOrder } from "hooks";

const ChoosePizzaDrinks = () => {
    const pizzasDrinks = useCollection("drinks");
    const { order, clearDrinks } = useOrder();

    if (order.pizzas.length === 0) {
        return <Redirect to={HOME} />;
    }

    if (!pizzasDrinks) {
        return <LinearProgress />;
    }

    if (pizzasDrinks.length === 0) {
        return "Não há dados!";
    }

    return (
        <>
            <Content>
                <HeaderContent>
                    <H4 variant="h4">Deseja levar uma bebida?</H4>
                </HeaderContent>
                <PizzasGrid>
                    {pizzasDrinks.map((drink) => (
                        <Grid item key={drink.id} xs>
                            <Card>
                                <CardLink
                                    to={{
                                        pathname: CHOOSE_PIZZA_DRINK_QUANTITY,
                                        state: { pizzaDrinks: drink },
                                    }}
                                >
                                    <Img src={drink.image} alt={drink.name} />

                                    <Divider />

                                    <Typography>{drink.name}</Typography>
                                    <Typography variant="h6">
                                        {toMoney(drink.value)}
                                    </Typography>
                                </CardLink>
                            </Card>
                        </Grid>
                    ))}
                </PizzasGrid>
            </Content>
            <SimpleFooter
                buttons={{
                    action: {
                        to: CHECKOUT,
                        children: "Não, obrigado",
                        onClick: clearDrinks,
                    },
                }}
            />
        </>
    );
};

const Card = styled(MaterialCard)`
    border: 2px solid transparent;
`;

const Img = styled.img`
    height: 150px;
    width: 150px;
`;

export default ChoosePizzaDrinks;
