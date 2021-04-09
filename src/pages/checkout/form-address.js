import React, { useState, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { CircularProgress, Grid } from "@material-ui/core";
import TextField from "./text-field";
import { useOrder } from "hooks";

const FormAddress = ({ onUpdate = () => {} }) => {
    const { cep, setCep } = useOrder();
    const [fetchingCep, setFetchingCep] = useState(false);
    const [addressState, dispatch] = useReducer(reducer, initialState);
    const numberField = useRef();
    const addressField = useRef();

    useEffect(() => {
        onUpdate(addressState);
    }, [addressState, onUpdate]);

    useEffect(() => {
        async function fetchAddress() {
            if (cep.length < 9) return;

            setFetchingCep(true);
            const data = await fetch(`https://ws.apicep.com/cep/${cep}.json`);
            setFetchingCep(false);

            if (!data.ok) {
                dispatch({ type: "RESET" });
                addressField.current.focus();
                return;
            }

            const result = await data.json();

            if (!result.ok) {
                dispatch({
                    type: "FAIL",
                    payload: {
                        error: result.message,
                    },
                });

                return;
            }

            dispatch({
                type: "UPDATE_FULL_ADDRESS",
                payload: result,
            });

            numberField.current.focus();
        }

        fetchAddress();
    }, [cep]);

    function handleChangeCep(e) {
        setCep(cepMask(e.target.value));
    }

    function cepMask(value) {
        return value
            .replace(/\D+/g, "")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{3})\d+?$/, "$1");
    }

    function handleChangeField(e) {
        const { name, value } = e.target;

        dispatch({
            type: "UPDATE_FIELD",
            payload: { name, value },
        });
    }

    return (
        <Grid container spacing={2} alignItems="center">
            <TextField
                label="CEP"
                sm={4}
                xs={8}
                autoFocus
                value={cep}
                onChange={handleChangeCep}
                error={!!addressState.error}
                required
            />
            <Grid item sm={8} xs={4}>
                {fetchingCep && <CircularProgress size={20} />}
            </Grid>
            {[
                {
                    label: "Rua",
                    xs: 12,
                    sm: 9,
                    name: "address",
                    inputRef: addressField,
                    textLength: 200,
                },
                {
                    label: "Número",
                    xs: 12,
                    sm: 3,
                    name: "number",
                    inputRef: numberField,
                    textLength: 7,
                },
                {
                    label: "Complemento",
                    xs: 12,
                    sm: 12,
                    name: "complement",
                    textLength: 60,
                },
                {
                    label: "Cidade",
                    xs: 12,
                    sm: 9,
                    name: "city",
                    textLength: 60,
                },
                {
                    label: "Estado",
                    xs: 12,
                    sm: 3,
                    name: "state",
                    textLength: 30,
                },
            ].map((field) => (
                <TextField
                    {...field}
                    key={field.name}
                    value={addressState[field.name]}
                    onChange={handleChangeField}
                    inputProps={{ maxLength: field.textLength }}
                    disabled={fetchingCep}
                    required={field.name !== "complement" ? true : false}
                />
            ))}
        </Grid>
    );
};

FormAddress.propTypes = {
    onUpdate: PropTypes.func,
};

function reducer(state, action) {
    if (action.type === "UPDATE_FULL_ADDRESS") {
        return {
            ...state,
            ...action.payload,
            error: null,
        };
    }

    if (action.type === "UPDATE_FIELD") {
        return {
            ...state,
            [action.payload.name]:
                action.payload.name === "number"
                    ? action.payload.value.replace(/\D/g, "")
                    : action.payload.value,
        };
    }

    if (action.type === "FAIL") {
        return {
            ...initialState,
            error: action.payload.error,
        };
    }

    if (action.type === "RESET") {
        return initialState;
    }

    return state;
}

const initialState = {
    code: "",
    address: "",
    number: "",
    district: "",
    complement: "",
    city: "",
    state: "",
    error: null,
};

export default FormAddress;
