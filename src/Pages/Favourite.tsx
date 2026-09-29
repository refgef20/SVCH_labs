import { Products } from "../App";
import { Card, Stack, Container } from "@mui/material";
import CardProduct from "../components/Cart&Favourite/CardProduct";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Favour = () => {
  const products = useSelector((state: RootState) => state.favProd.items);
  return (
    <Container content="section">
      <Stack direction="row" sx={{ gap: 10 }}>
        <CardProduct products={products} />
      </Stack>
    </Container>
  );
};
export default Favour;
