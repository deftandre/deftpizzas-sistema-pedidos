import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Input as MaterialInput } from "@material-ui/core";
import { Content, FooterFollowQuantity, H4, HeaderContent } from "ui";
import { Link, Redirect } from "react-router-dom";
import { HOME, CHOOSE_PIZZA_FOLLOWS, CHOOSE_PIZZA_DRINKS } from "routes";
import { useOrder } from "hooks";

const ChoosePizzaFollowQuantity = ({ location }) => {
    const [quantity, setQuantity] = useState(1);
    const { addFollowToOrder } = useOrder();

    if (!location.state) {
        return <Redirect to={HOME} />;
    }

    function handleChange(e) {
        const { value } = e.target;

        if (value >= 1 && value <= 50) {
            setQuantity(parseInt(value));
        }
    }

    function addPizzaFollow() {
        addFollowToOrder({
            ...location.state,
            quantity,
        });
    }

    return (
        <>
            <Content>
                <HeaderContent>
                    <H4 variant="h4">
                        Quanto desse acompanhamento
                        <br />
                        você gostaria de pedir?
                    </H4>
                </HeaderContent>
                <MainContent>
                    <Input value={quantity} onChange={handleChange} />
                    <ButtonAddPizza
                        to={CHOOSE_PIZZA_FOLLOWS}
                        onClick={addPizzaFollow}
                    >
                        Adicionar e<br />
                        escolher outro
                    </ButtonAddPizza>
                </MainContent>
            </Content>
            <FooterFollowQuantity
                buttons={{
                    back: {
                        children: "Mudar acompanhamento",
                    },
                    action: {
                        to: CHOOSE_PIZZA_DRINKS,
                        onClick: addPizzaFollow,
                        children: "Finalizar escolha de acompanhamentos",
                    },
                }}
            />
        </>
    );
};

ChoosePizzaFollowQuantity.propTypes = {
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

export default ChoosePizzaFollowQuantity;
