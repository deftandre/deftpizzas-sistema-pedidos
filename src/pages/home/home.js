import React, { useMemo } from "react";
import { singularOrPlural } from "utils";
import { useAuth, useCollection } from "hooks";
import { ChoosePizzaSize } from "pages/choose-pizza-size";
import { OrderView } from "pages/order-view";

const Home = () => {
    const orders = useCollection("orders");
    const { userInfo } = useAuth();

    const pageConfig = useMemo(
        () => ({
            title: orders
                ? `Você tem ${singularOrPlural(
                      orders.length,
                      "um pedido",
                      "pedidos"
                  )} em andamento, acompanhe:`
                : `O que vai ser hoje, ${userInfo.user.firstName}?`,
            subTitle: orders ? "" : "Escolha o tamanho da pizza:",
        }),
        [orders, userInfo]
    );

    return (
        <>
            {orders?.length !== 0 && (
                <OrderView pageConfig={pageConfig} orders={orders} />
            )}
            {(orders || orders?.length === 0) && (
                <ChoosePizzaSize pageConfig={pageConfig} />
            )}
        </>
    );
};

export default Home;
