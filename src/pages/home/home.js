import React, { useCallback, useMemo, useState } from "react";
import { singularOrPlural } from "utils";
import { useAuth, useCollection } from "hooks";
import { ChoosePizzaSize } from "pages/choose-pizza-size";
import { OrderView } from "pages/order-view";

const Home = () => {
    const orders = useCollection("orders");
    const ordersRecused = useCollection("ordersRecused");
    const { userInfo } = useAuth();
    const [changeView, setChangeView] = useState(false);

    const pageConfig = useMemo(
        () => ({
            title:
                orders && orders?.length !== 0
                    ? `Você tem ${singularOrPlural(
                          orders.length,
                          "um pedido",
                          "pedidos"
                      )} em andamento, acompanhe:`
                    : ordersRecused &&
                      ordersRecused?.length !== 0 &&
                      !changeView
                    ? "Infelizmente não podemos concluir seu pedido :("
                    : `O que vai ser hoje, ${userInfo.user.firstName}?`,
            subTitle: "Escolha o tamanho da pizza:",
        }),
        [orders, ordersRecused, changeView, userInfo]
    );

    const handleView = useCallback(() => {
        setChangeView(true);
    }, []);

    return (
        <>
            {(((!orders || orders?.length === 0) &&
                (!ordersRecused ||
                    ordersRecused?.length === 0 ||
                    ordersRecused.isView)) ||
                changeView) && (
                <ChoosePizzaSize pageConfig={pageConfig} showSize />
            )}
            {orders &&
                ordersRecused &&
                (orders?.length !== 0 ||
                    (ordersRecused?.length !== 0 && !ordersRecused.isView)) &&
                !changeView && (
                    <OrderView
                        pageConfig={pageConfig}
                        orders={orders}
                        ordersRecused={ordersRecused}
                        handleView={handleView}
                    />
                )}
        </>
    );
};

export default Home;
