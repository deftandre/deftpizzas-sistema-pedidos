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
import {
    HOME,
    CHOOSE_PIZZA_FOLLOW_QUANTITY,
    CHOOSE_PIZZA_DRINKS,
} from "routes";
import { useCollection, useOrder } from "hooks";

const ChoosePizzaFollows = () => {
    const pizzasFollows = useCollection("pizzasFollows");
    const { order, clearFollows } = useOrder();

    if (order.pizzas.length === 0) {
        return <Redirect to={HOME} />;
    }

    if (!pizzasFollows) {
        return <LinearProgress />;
    }

    if (pizzasFollows.length === 0) {
        return "Não há dados!";
    }

    return (
        <>
            <Content>
                <HeaderContent>
                    <H4 variant="h4">Deseja levar um acompanhamento?</H4>
                </HeaderContent>
                <PizzasGrid>
                    {pizzasFollows.map((follow) => (
                        <Grid item key={follow.id} xs>
                            <Card>
                                <CardLink
                                    to={{
                                        pathname: CHOOSE_PIZZA_FOLLOW_QUANTITY,
                                        state: { pizzaFollows: follow },
                                    }}
                                >
                                    <Img src={follow.image} alt={follow.name} />

                                    <Divider />

                                    <Typography align="center">
                                        {follow.name}
                                    </Typography>
                                    <Typography variant="h6">
                                        {toMoney(follow.value)}
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
                        to: CHOOSE_PIZZA_DRINKS,
                        children: "Pular para bebidas",
                        onClick: clearFollows,
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

export default ChoosePizzaFollows;
