import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
    IconButton,
    List,
    ListItem as MaterialListItem,
    Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useOrder } from "hooks";
import { singularOrPlural } from "utils";

const OrderInfo = ({ showOptions }) => {
    const {
        order,
        removePizzaFromOrder,
        removeFollowFromOrder,
        removeDrinkFromOrder,
    } = useOrder();
    return (
        <List>
            {order.pizzas.map((pizza) => {
                const { pizzaFlavours, pizzaSize, quantity } = pizza;
                const { name, slices, flavours } = pizzaSize;
                return (
                    <ListItem key={pizza.id}>
                        <Typography>
                            <b>{quantity}</b>{" "}
                            {singularOrPlural(quantity, "pizza", "pizzas")}{" "}
                            <b>
                                {singularOrPlural(
                                    quantity,
                                    name,
                                    name + "s"
                                ).toUpperCase()}
                            </b>{" "}
                            - ({slices}{" "}
                            {singularOrPlural(slices, "fatia", "fatias")},{" "}
                            {flavours}{" "}
                            {singularOrPlural(flavours, "sabor", "sabores")}
                            )
                            <br />
                            {singularOrPlural(
                                pizzaFlavours.length,
                                "no sabor",
                                "nos sabores"
                            )}{" "}
                            <b>
                                {pizzaFlavours
                                    .map(({ name }) => name)
                                    .reduce((acc, flavour, index, array) => {
                                        if (index === 0) {
                                            return flavour;
                                        }

                                        if (index === array.length - 1) {
                                            return `${acc} e ${flavour}`;
                                        }

                                        return `${acc}, ${flavour}`;
                                    }, "")}
                            </b>
                        </Typography>
                        {showOptions && (
                            <IconButton
                                title="Remover"
                                color="secondary"
                                onClick={() => removePizzaFromOrder(pizza.id)}
                            >
                                <Close />
                            </IconButton>
                        )}
                    </ListItem>
                );
            })}
            {order.pizzaFollows?.map((follow) => {
                const { pizzaFollows, quantity } = follow;
                const { name } = pizzaFollows;
                return (
                    <ListItem key={follow.id}>
                        <Typography>
                            <b>{quantity}</b>{" "}
                            {singularOrPlural(
                                quantity,
                                "acompanhamento",
                                "acompanhamentos"
                            )}{" "}
                            <b>{name.toUpperCase()}</b>
                        </Typography>
                        {showOptions && (
                            <IconButton
                                title="Remover"
                                color="secondary"
                                onClick={() => removeFollowFromOrder(follow.id)}
                            >
                                <Close />
                            </IconButton>
                        )}
                    </ListItem>
                );
            })}
            {order.pizzaDrinks?.map((drink) => {
                const { pizzaDrinks, quantity } = drink;
                const { name } = pizzaDrinks;
                return (
                    <ListItem key={drink.id}>
                        <Typography>
                            <b>{quantity}</b>{" "}
                            {singularOrPlural(quantity, "bebida", "bebidas")}{" "}
                            <b>{name.toUpperCase()}</b>
                        </Typography>
                        {showOptions && (
                            <IconButton
                                title="Remover"
                                color="secondary"
                                onClick={() => removeDrinkFromOrder(drink.id)}
                            >
                                <Close />
                            </IconButton>
                        )}
                    </ListItem>
                );
            })}
        </List>
    );
};

OrderInfo.propTypes = {
    showOptions: PropTypes.bool,
};

const ListItem = styled(MaterialListItem)`
    display: flex;
    justify-content: space-between;
`;

export default OrderInfo;
