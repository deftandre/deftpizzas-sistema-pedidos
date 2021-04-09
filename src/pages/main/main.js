import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { LinearProgress, withStyles } from "@material-ui/core";
import Header from "./header";

import * as routes from "routes";

const Home = lazy(() => import("pages/home"));
const ChoosePizzaFlavours = lazy(() => import("pages/choose-pizza-flavours"));
const ChoosePizzaQuantity = lazy(() => import("pages/choose-pizza-quantity"));
const ChoosePizzaFollows = lazy(() => import("pages/choose-pizza-follows"));
const ChoosePizzaFollowQuantity = lazy(() =>
    import("pages/choose-pizza-follow-quantity")
);
const ChoosePizzaDrinks = lazy(() => import("pages/choose-pizza-drinks"));
const ChoosePizzaDrinkQuantity = lazy(() =>
    import("pages/choose-pizza-drink-quantity")
);
const Checkout = lazy(() => import("pages/checkout"));
const CheckoutConfirmation = lazy(() => import("pages/checkout-confirmation"));
const CheckoutSuccess = lazy(() => import("pages/checkout-success"));

const Main = () => {
    useScrollToTop();

    return (
        <>
            <Header />

            <Spacer />

            <Suspense fallback={<LinearProgress />}>
                <Switch>
                    <Route path={routes.HOME} exact component={Home} />
                    <Route
                        path={routes.CHOOSE_PIZZA_FLAVOURS}
                        component={ChoosePizzaFlavours}
                    />
                    <Route
                        path={routes.CHOOSE_PIZZA_QUANTITY}
                        component={ChoosePizzaQuantity}
                    />
                    <Route
                        path={routes.CHOOSE_PIZZA_FOLLOWS}
                        component={ChoosePizzaFollows}
                    />
                    <Route
                        path={routes.CHOOSE_PIZZA_FOLLOW_QUANTITY}
                        component={ChoosePizzaFollowQuantity}
                    />
                    <Route
                        path={routes.CHOOSE_PIZZA_DRINKS}
                        component={ChoosePizzaDrinks}
                    />
                    <Route
                        path={routes.CHOOSE_PIZZA_DRINK_QUANTITY}
                        component={ChoosePizzaDrinkQuantity}
                    />
                    <Route path={routes.CHECKOUT} exact component={Checkout} />
                    <Route
                        path={routes.CHECKOUT_CONFIRMATION}
                        component={CheckoutConfirmation}
                    />
                    <Route
                        path={routes.CHECKOUT_SUCCESS}
                        component={CheckoutSuccess}
                    />
                </Switch>
            </Suspense>
        </>
    );
};

function useScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}

const style = (theme) => ({
    main: theme.mixins.toolbar,
});

const Spacer = withStyles(style)(({ classes }) => (
    <div className={classes.main} />
));

export default Main;
