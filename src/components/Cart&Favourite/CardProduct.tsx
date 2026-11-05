import { Product } from "../Catalog/IProduct";
import {
  TextField,
  Box,
  Stack,
  Button,
  Card,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useTranslation } from "react-i18next";
import axios from "axios";

export interface PropsCartFav {
  products: Product[];
  deleteCart: (id: number) => Promise<void>;
}

export interface UsProd {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  photo: string;
  Order: Order & { id: number };
}
export interface Order {
  amount: number;
  UserId: number;
  ProductId: number;
  address: string;
}

const CardProduct = ({ products, deleteCart }: PropsCartFav) => {
  const [buy, setBuy] = useState(false);

  const { t, i18n } = useTranslation();

  const [order, setOrder] = useState<Order>({
    amount: 1,
    UserId: 1,
    ProductId: NaN,
    address: "",
  });
  const handleChange = (key: string, value: string | number) => {
    setOrder((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const postOrder = async (order: Order) => {
    const ordr = await axios.post(`http://localhost:5000/api/order`, order);
    return ordr.data;
  };
  return (
    <>
      {products?.map((product) => (
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
            onClick={() => {
              setBuy(true);
              handleChange("ProductId", product.id);
            }}
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
            {i18n.language == "ru" ? "Купить" : "Buy"}
          </Button>

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
              onClick={() => {
                deleteCart(product.id);
              }}
            >
              🗑️
            </IconButton>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {product.price}
            </Typography>
          </Stack>
        </Card>
      ))}
      {buy && (
        <Box
          component="dialog"
          open
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#121212",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 3,
            p: 4,
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
            zIndex: 1300,
            "&::backdrop": {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(4px)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {t("main.sign") || "Запись на услугу"}
            </Typography>
            <Button
              onClick={() => setBuy(false)}
              sx={{ color: "#aaa", minWidth: "auto", p: 0, fontSize: "1.2rem" }}
            >
              ✕
            </Button>
          </Box>

          <Stack
            component="form"
            spacing={2.5}
            onSubmit={(e) => {
              e.preventDefault();
              postOrder(order);
              alert("Запись успешно отправлена!");
              setBuy(false);
            }}
          >
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.7)", display: "block", mb: 1 }}
              >
                Введите адресс
              </Typography>
              <TextField
                name="address"
                value={order.address || ""}
                required
                fullWidth
                onChange={(e) => {
                  const { name, value } = e.target;
                  handleChange(name, value);
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    bgcolor: "#1a1a1a",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 2,
                    color: "#fff",
                    p: 0.5,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    borderColor: "#930270",
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.7)", display: "block", mb: 1 }}
              >
                Введите количество
              </Typography>
              <TextField
                name="amount"
                value={order.amount || 1}
                required
                fullWidth
                onChange={(e) => {
                  const { name, value } = e.target;
                  handleChange(name, value);
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    bgcolor: "#1a1a1a",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 2,
                    color: "#fff",
                    p: 0.5,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    borderColor: "#930270",
                  },
                }}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#fff",
                color: "#000",
                fontWeight: "bold",
                borderRadius: 2,
                py: 1.5,
                mt: 2,
                "&:hover": { bgcolor: "#e0e0e0" },
              }}
            >
              Подтвердить запись
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default CardProduct;
