import { Grid } from "@material-ui/core";
import styled from "styled-components";

const PizzasGrid = styled(Grid).attrs({
    container: true,
    spacing: 2,
})`
    padding: ${({ theme }) => theme.spacing(1)}px;
`;

export default PizzasGrid;
