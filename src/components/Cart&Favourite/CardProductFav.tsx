import { Product } from "../Catalog/IProduct";
import {
  Stack,
  Button,
  Card,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { deleteFavourite, deleteProductFav } from "../../slices/FavouriteSlice";
import { AppDispatch, RootState } from "../../store";
import { useTranslation } from "react-i18next";
import { Delget } from "../../slices/CartsSlice";

export interface PropsCartFav {
  products: Product[];

  deleteFav: (id: number) => Promise<void>;
}

const CardProductFav = ({ products, deleteFav }: PropsCartFav) => {
  const dispatch = useDispatch<AppDispatch>();

  console.log(products);
  const { t, i18n } = useTranslation();
  return products?.map((product) => (
    <Card
      key={product.id}
      sx={{
        maxWidth: 320,
        bgcolor: "#111111",
        color: "#ffffff",
        borderRadius: 3,
        p: 2,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        image={product.photo}
        alt="Dyson Airwrap"
        sx={{ borderRadius: 2, objectFit: "cover", maxHeight: "270px" }}
      />

      <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
        {product.name}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "rgba(255, 255, 255, 0.6)", my: 1 }}
      >
        {product.description}
      </Typography>

      <Stack
        sx={{
          mt: 2,
          pt: 1,
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          size="small"
          sx={{ color: "#fff" }}
          onClick={(e) => {
            //
            const userId = 1;

            deleteFav(product.id);
          }}
        >
          🗑️
        </IconButton>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {product.price}
        </Typography>
      </Stack>
    </Card>
  ));
};

export default CardProductFav;
