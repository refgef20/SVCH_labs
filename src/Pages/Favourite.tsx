import { Card, Stack, Container } from "@mui/material";
import CardProduct from "../components/Cart&Favourite/CardProduct";
import { useEffect } from "react";
import CardProductFav from "../components/Cart&Favourite/CardProductFav";
import { useState } from "react";
import axios from "axios";
import { Product } from "../components/Catalog/IProduct";

const Favour = () => {
  const [products, setProd] = useState<Product[]>([]);
  const userId = 1;
  useEffect(() => {
    async function getFav() {
      const pr = await axios.get(
        `http://localhost:5000/api/user/${userId}/favourite`,
      );
      setProd(pr.data.usersFavour);
    }
    getFav();
  }, []);

  async function deleteFavourite(id: number) {
    await axios.delete(`http://localhost:5000/api/favourite/${id}`);
    const pr = await axios.get(
      `http://localhost:5000/api/user/${userId}/favourite`,
    );
    setProd(pr.data.usersFavour);
  }

  return (
    <Container content="section">
      <Stack direction="row" sx={{ gap: 10 }}>
        <CardProductFav
          products={products}
          deleteFavourite={deleteFavourite}
        />
      </Stack>
    </Container>
  );
};
export default Favour;
