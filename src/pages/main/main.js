import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { LinearProgress, withStyles } from "@material-ui/core";
import Header from "./header";

import * as routes from "routes";

const ChoosePizzaSize = lazy(() => import("pages/choose-pizza-size"));
const ChoosePizzaFlavours = lazy(() => import("pages/choose-pizza-flavours"));
const ChoosePizzaQuantity = lazy(() => import("pages/choose-pizza-quantity"));
const Checkout = lazy(() => import("pages/checkout"));
const CheckoutConfirmation = lazy(() => import("pages/checkout-confirmation"));
const CheckoutSuccess = lazy(() => import("pages/checkout-success"));

const Main = () => {
    return (
        <>
            <Header />

            <Spacer />

            <Suspense fallback={<LinearProgress />}>
                <Switch>
                    <Route
                        path={routes.HOME}
                        exact
                        component={ChoosePizzaSize}
                    />
                    <Route
                        path={routes.CHOOSE_PIZZA_FLAVOURS}
                        component={ChoosePizzaFlavours}
                    />
                    <Route
                        path={routes.CHOOSE_PIZZA_QUANTITY}
                        component={ChoosePizzaQuantity}
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

const style = (theme) => ({
    main: theme.mixins.toolbar,
});

const Spacer = withStyles(style)(({ classes }) => (
    <div className={classes.main} />
));

export default Main;
