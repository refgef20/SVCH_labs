import { Card, Stack, Container } from "@mui/material";
import CardProduct from "../components/Cart&Favourite/CardProduct";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

const Cart = () => {
  const products = useSelector((state: RootState) => state.cartProd.items);
  return (
    <Container content="section">
      <Stack direction="row" sx={{ gap: 10 }}>
        <CardProduct products={products} />
      </Stack>
    </Container>
  );
};
export default Cart;
