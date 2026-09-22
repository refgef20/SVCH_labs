import { Products } from "../../App";
import {
  Stack,
  Button,
  Card,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";

const CardProduct = ({ products, OnDelete }: Products) => {
  console.log(products);
  return products.map((product) => (
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
      <Button
        variant="contained"
        size="small"
        sx={{
          position: "absolute",
          top: 24,
          left: 24,
          bgcolor: "#5a0346",
          zIndex: 1,
          "&:hover": { bgcolor: "#50013e" },
        }}
      >
        Купить
      </Button>

      <CardMedia
        component="img"
        image={product.photo}
        alt="Dyson Airwrap"
        sx={{ borderRadius: 2, objectFit: "cover", maxHeight: "270px" }}
      />

      <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
        {product.name_en}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "rgba(255, 255, 255, 0.6)", my: 1 }}
      >
        {product.description_en}
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
            OnDelete(product.id);
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

export default CardProduct;
