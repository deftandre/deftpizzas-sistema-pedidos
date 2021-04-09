import React, { createContext, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import firebase, { db } from "services/firebase";
import { useAuth } from "hooks";

const OrderContext = createContext();

function OrderProvider({ children }) {
    const [pizzas, addPizza] = useState([]);
    const [pizzaFollows, addPizzaFollows] = useState([]);
    const [pizzaDrinks, addPizzaDrinks] = useState([]);
    const [orderInProgress, setOrderInProgress] = useState(false);
    const [orderFollowsInProgress, setOrderFollowsInProgress] = useState(false);
    const [orderDrinksInProgress, setOrderDrinksInProgress] = useState(false);
    const [phone, addPhone] = useState("");
    const [address, addAddress] = useState({});
    const { userInfo } = useAuth();
    const [cep, setCep] = useState("");

    function addPizzaToOrder(pizza) {
        if (orderInProgress) {
            return addPizza((pizzas) => pizzas.concat(newItem(pizza)));
        }

        setOrderInProgress(true);
        addPizza([newItem(pizza)]);
    }

    function newItem(item) {
        return { id: uuidv4(), ...item };
    }

    function addFollowToOrder(pizzaFollow) {
        if (orderFollowsInProgress) {
            return addPizzaFollows((pizzaFollows) =>
                pizzaFollows.concat(newItem(pizzaFollow))
            );
        }

        setOrderFollowsInProgress(true);
        addPizzaFollows([newItem(pizzaFollow)]);
    }

    function addDrinkToOrder(pizzaDrink) {
        if (orderDrinksInProgress) {
            return addPizzaDrinks((pizzaDrinks) =>
                pizzaDrinks.concat(newItem(pizzaDrink))
            );
        }

        setOrderDrinksInProgress(true);
        addPizzaDrinks([newItem(pizzaDrink)]);
    }

    function clearFollows() {
        addPizzaFollows([]);
    }

    function clearDrinks() {
        addPizzaDrinks([]);
    }

    function removePizzaFromOrder(id) {
        addPizza((pizzas) => pizzas.filter((p) => p.id !== id));
    }

    function removeFollowFromOrder(id) {
        addPizzaFollows((pizzaFollows) =>
            pizzaFollows.filter((f) => f.id !== id)
        );
    }

    function removeDrinkFromOrder(id) {
        addPizzaDrinks((pizzaDrinks) => pizzaDrinks.filter((d) => d.id !== id));
    }

    async function sendOrder() {
        try {
            await db.collection("orders").add({
                userId: userInfo.user.uid,
                userName: userInfo.user.displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),

                address: {
                    ...address,
                    code: address.code === "" ? cep : address.code,
                },
                phone,
                pizzas: pizzas.map((pizza) => ({
                    size: pizza.pizzaSize,
                    flavours: pizza.pizzaFlavours,
                    quantity: pizza.quantity,
                })),
                follows: pizzaFollows.map((follow) => ({
                    ...follow,
                })),
                drinks: pizzaDrinks.map((drink) => ({ ...drink })),
            });
        } catch (e) {
            console.log("Erro ao salvar o pedido: ", e);
            alert("Erro ao salvar o pedido!");
        }

        setOrderInProgress(false);
        setOrderFollowsInProgress(false);
        setOrderDrinksInProgress(false);
    }

    const setViewOrder = useCallback(async ({ orderId, isView }) => {
        await db.collection("ordersRecused").doc(orderId).set(
            {
                isView,
            },
            { merge: true }
        );
    }, []);

    return (
        <OrderContext.Provider
            value={{
                order: {
                    pizzas,
                    address,
                    phone,
                    pizzaFollows,
                    pizzaDrinks,
                },
                addPizzaToOrder,
                removePizzaFromOrder,
                cep,
                setCep,
                sendOrder,
                addAddress,
                addPhone,
                addFollowToOrder,
                removeFollowFromOrder,
                clearFollows,
                addDrinkToOrder,
                removeDrinkFromOrder,
                clearDrinks,
                setViewOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

OrderProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { OrderProvider, OrderContext };
