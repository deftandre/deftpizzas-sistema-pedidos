import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Card, Grid, LinearProgress, Typography } from "@material-ui/core";
import {
    CardLink,
    Content,
    Divider,
    H3,
    H4,
    HeaderContent,
    PizzasGrid,
} from "ui";
import { singularOrPlural } from "utils";
import { useCollection } from "hooks";

import { CHOOSE_PIZZA_FLAVOURS } from "routes";

const ChoosePizzaSize = ({ pageConfig }) => {
    const pizzasSizes = useCollection("pizzasSizes");

    if (!pizzasSizes) {
        return <LinearProgress />;
    }

    if (pizzasSizes.length === 0) {
        return "Não há dados!";
    }

    return (
        <Content>
            <HeaderContent>
                <H3 variant="h3">{pageConfig.title}</H3>
                <H4 variant="h4">{pageConfig.subTitle}</H4>
            </HeaderContent>
            <PizzasGrid>
                {pizzasSizes.map((pizza) => (
                    <Grid item key={pizza.id} xs>
                        <Card>
                            <CardLink
                                to={{
                                    pathname: CHOOSE_PIZZA_FLAVOURS,
                                    state: { pizzaSize: pizza },
                                }}
                            >
                                <Pizza>
                                    <PizzaText>{pizza.size} cm</PizzaText>
                                </Pizza>

                                <Divider />

                                <Typography variant="h5">
                                    {pizza.name}
                                </Typography>
                                <Typography>
                                    {pizza.slices} fatias, {pizza.flavours}{" "}
                                    {singularOrPlural(
                                        pizza.flavours,
                                        "sabor",
                                        "sabores"
                                    )}
                                </Typography>
                            </CardLink>
                        </Card>
                    </Grid>
                ))}
            </PizzasGrid>
        </Content>
    );
};

ChoosePizzaSize.propTypes = {
    pageConfig: PropTypes.object.isRequired,
};

const Pizza = styled.div`
    align-items: center;
    background: ${({ theme }) => theme.palette.common.white};
    border: 1px solid ${({ theme }) => theme.palette.grey.A100};
    border-radius: 50%;
    display: flex;
    height: 200px;
    justify-content: center;
    position: relative;
    width: 200px;
    z-index: 1;

    &::before,
    &::after {
        background: ${({ theme }) => theme.palette.grey.A100};
        content: "";
        position: absolute;
        transform: rotate(45deg);
    }

    &::before {
        height: 1px;
        width: 160px;
    }

    &::after {
        height: 160px;
        width: 1px;
    }
`;

const PizzaText = styled(Typography).attrs({
    variant: "h5",
})`
    align-items: center;
    background: ${({ theme }) => theme.palette.common.white};
    border-radius: 50%;
    display: flex;
    height: 80px;
    justify-content: center;
    position: relative;
    width: 80px;
    z-index: 1;
`;

export default ChoosePizzaSize;
