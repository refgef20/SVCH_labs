import "./favor.css";
import "../../index.css";
import Menu from "./Menu";
import DescFavor from "./DescFavor";
import { Container, Box, Typography, Divider, CardMedia } from "@mui/material";
import { useTranslation } from "react-i18next";

const Favor = ({ favors }) => {
  const { t, i18n } = useTranslation();
  return (
    <Box
      component="section"
      id="favor"
      sx={{ bgcolor: "#111111", py: 8, color: "#fff" }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          sx={{ mb: 5, textTransform: "uppercase", fontFamily: "Vera Humana" }}
        >
          {t("main.services_prices_title")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 4,
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          <Menu favors={favors} />

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
          />

          <DescFavor favors={favors} />

          <CardMedia
            component="img"
            image="src/assets/images/work3.jpg"
            alt="Пример работы"
            sx={{
              maxWidth: 320,
              borderRadius: 3,
              display: { xs: "none", lg: "block" },
              objectFit: "cover",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Favor;
