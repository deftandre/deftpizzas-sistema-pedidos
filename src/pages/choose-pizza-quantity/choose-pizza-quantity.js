import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Input as MaterialInput } from "@material-ui/core";
import { Content, Footer, H4, HeaderContent } from "ui";
import { Link, Redirect } from "react-router-dom";
import { HOME, CHOOSE_PIZZA_FOLLOWS } from "routes";
import { useOrder } from "hooks";

const ChoosePizzaQuantity = ({ location }) => {
    const [quantity, setQuantity] = useState(1);
    const { addPizzaToOrder } = useOrder();

    if (!location.state) {
        return <Redirect to={HOME} />;
    }

    function handleChange(e) {
        const { value } = e.target;

        if (value >= 1 && value <= 50) {
            setQuantity(value);
        }
    }

    function addPizza() {
        addPizzaToOrder({
            ...location.state,
            quantity,
        });
    }

    return (
        <>
            <Content>
                <HeaderContent>
                    <H4 variant="h4">
                        Quantas pizzas você gostaria
                        <br />
                        de pedir, com esses sabores?
                    </H4>
                </HeaderContent>
                <MainContent>
                    <Input value={quantity} onChange={handleChange} autoFocus />
                    <ButtonAddPizza to={HOME} onClick={addPizza}>
                        Adicionar e<br />
                        montar outra
                    </ButtonAddPizza>
                </MainContent>
            </Content>
            <Footer
                buttons={{
                    back: {
                        children: "Mudar sabores",
                    },
                    action: {
                        to: CHOOSE_PIZZA_FOLLOWS,
                        onClick: addPizza,
                        children: "Finalizar escolha de pizzas",
                    },
                }}
            />
        </>
    );
};

ChoosePizzaQuantity.propTypes = {
    location: PropTypes.object.isRequired,
};

const MainContent = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-top: ${({ theme }) => theme.spacing(2)}px;
`;

const Input = styled(MaterialInput).attrs({
    type: "number",
})`
    margin-bottom: ${({ theme }) => theme.spacing(3)}px;

    & input {
        font-size: 80px;
        padding: 10px;
        text-align: center;
        width: 150px;
    }
`;

const ButtonAddPizza = styled(Button).attrs({
    color: "secondary",
    component: Link,
    variant: "contained",
})`
    text-align: center;
`;

export default ChoosePizzaQuantity;
