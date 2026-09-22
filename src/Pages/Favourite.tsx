import { Products } from "../App";
import { Card, Stack, Container } from "@mui/material";
import CardProduct from "../components/Cart&Favourite/CardProduct";

const Favour = ({ products, OnDelete }: Products) => {
  return (
    <Container content="section">
      <Stack direction="row" sx={{ gap: 10 }}>
        <CardProduct products={products} OnDelete={OnDelete} />
      </Stack>
    </Container>
  );
};
export default Favour;
