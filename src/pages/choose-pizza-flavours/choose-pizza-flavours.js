import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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
    Footer,
    H4,
    HeaderContent,
    PizzasGrid,
} from "ui";
import { singularOrPlural, toMoney } from "utils";
import { HOME, CHOOSE_PIZZA_QUANTITY } from "routes";
import { useCollection } from "hooks";

const ChoosePizzaFlavours = ({ location }) => {
    const [checkboxes, setCheckboxes] = useState(() => ({}));
    const pizzasFlavours = useCollection("pizzasFlavours");

    if (!location.state) {
        return <Redirect to={HOME} />;
    }

    if (!pizzasFlavours) {
        return <LinearProgress />;
    }

    if (pizzasFlavours.length === 0) {
        return "Não há dados!";
    }

    const { flavours, id } = location.state.pizzaSize;

    const handleChangeCheckbox = (pizzaId) => (e) => {
        if (
            checkboxesChecked(checkboxes).length === flavours &&
            e.target.checked === true
        ) {
            return;
        }
        setCheckboxes((checkboxes) => {
            return {
                ...checkboxes,
                [pizzaId]: e.target.checked,
            };
        });
    };

    return (
        <>
            <Content>
                <HeaderContent>
                    <H4 variant="h4">
                        Escolha até {flavours}{" "}
                        {singularOrPlural(flavours, "sabor", "sabores")}:
                    </H4>
                </HeaderContent>

                <PizzasGrid>
                    {pizzasFlavours
                        .sort((a, b) => {
                            if (a.value[id] > b.value[id]) {
                                return 1;
                            }
                            if (a.value[id] < b.value[id]) {
                                return -1;
                            }
                            return 0;
                        })
                        .map(
                            (pizza) =>
                                (pizza.value[id] || pizza.value[id] !== 0) && (
                                    <Grid item key={pizza.id} xs>
                                        <Card checked={!!checkboxes[pizza.id]}>
                                            <Label>
                                                <Checkbox
                                                    checked={
                                                        !!checkboxes[pizza.id]
                                                    }
                                                    onChange={handleChangeCheckbox(
                                                        pizza.id
                                                    )}
                                                />
                                                <Img
                                                    src={pizza.image}
                                                    alt={pizza.name}
                                                />

                                                <Divider />

                                                <Typography align="center">
                                                    {pizza.name}
                                                </Typography>
                                                <Typography variant="h6">
                                                    {toMoney(pizza.value[id])}
                                                </Typography>
                                            </Label>
                                        </Card>
                                    </Grid>
                                )
                        )}
                </PizzasGrid>
            </Content>
            <Footer
                buttons={{
                    back: { children: "Mudar tamanho" },
                    action: {
                        to: {
                            pathname: CHOOSE_PIZZA_QUANTITY,
                            state: {
                                ...location.state,
                                pizzaFlavours: getFlavoursNameAndId({
                                    checkboxes,
                                    pizzasFlavours,
                                }),
                            },
                        },
                        children: "Quantas pizzas?",
                        disabled: checkboxesChecked(checkboxes).length === 0,
                    },
                }}
            />
        </>
    );
};

ChoosePizzaFlavours.propTypes = {
    location: PropTypes.object.isRequired,
};

function checkboxesChecked(checkboxes) {
    return Object.values(checkboxes).filter(Boolean);
}

function getFlavoursNameAndId({ checkboxes, pizzasFlavours }) {
    return Object.entries(checkboxes)
        .filter(([, value]) => !!value)
        .map(([id]) => ({
            id,
            name: pizzasFlavours.find((flavour) => flavour.id === id).name,
        }));
}

const Card = styled(MaterialCard)`
    border: 2px solid transparent;
    border-color: ${({ theme, checked }) =>
        checked ? theme.palette.secondary.light : ""};
`;

const Label = styled(CardLink).attrs({
    component: "label",
})``;

const Checkbox = styled.input.attrs({
    type: "checkbox",
})`
    display: none;
`;

const Img = styled.img`
    height: 150px;
    width: 150px;
`;

export default ChoosePizzaFlavours;
