import "./favor.css";
import "../../index.css";
import {
  Paper,
  Box,
  Stack,
  Typography,
  Divider,
  Chip,
  Button,
  Link as MuiLink,
} from "@mui/material";
import postAppoint from "../../slices/AppointSlice";
import { fetchGet } from "../../slices/MasterSlise";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";

const DescFavor = () => {
  const { t, i18n } = useTranslation();
  const services = useSelector((state: RootState) => state.catalServ.favors);
  const masters = useSelector((state: RootState) => state.catMast.masters);
  const activeCat = useSelector(
    (state: RootState) => state.catalServ.activeCat,
  );
  const [selMastId, setSelmaster] = useState("");
  const [activeSign, setActive] = useState(false);
  const dispatch = useDispatch();
  console.log(services);
  const [appoint, setAppoint] = useState({
    clientName: "",
    clientPhone: "",
    data: "",
    master: "",
    favor: "",
  });
  function handleChange(name: string, value: string) {
    setAppoint((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <Paper
      elevation={1}
      sx={{
        bgcolor: "#010101",
        color: "#fff",
        p: 4,
        borderRadius: 3,
        flex: 1,
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{ textTransform: "uppercase", mb: 1, fontWeight: 600 }}
        >
          {activeCat}
        </Typography>
      </Box>
      {services?.map((service) => (
        <Stack spacing={2} sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">{service.title}</Typography>
            <Box sx={{ gap: 1, alignItems: "center" }}>
              <Button
                component={MuiLink}
                variant="contained"
                sx={{
                  fontSize: "0.75rem",
                  bgcolor: "transparent",
                  border: "1px solid #fff",
                  color: "#fff",
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                  "&:hover": { bgcolor: "#930270", borderColor: "#930270" },
                }}
                onClick={() => {
                  setActive(true);
                }}
              >
                {t("main.sign")}
              </Button>
              <Chip
                label={service.price}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              />
            </Box>
          </Box>
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />
        </Stack>
      ))}
      {/* <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{ textTransform: "uppercase", mb: 1, fontWeight: 600 }}
        >
          {t(favors[0].favor)}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.6 }}
        >
          {t(favors[0].description)}
        </Typography>
      </Box> */}

      {/* <Stack spacing={2} sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">{t("main.stach")}</Typography>
          <Chip
            label="999 ₽"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              fontWeight: "bold",
            }}
          />
        </Box>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">{t("main.mast")}</Typography>
          <Chip
            label="1899 ₽"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              fontWeight: "bold",
            }}
          />
        </Box>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">{t("main.pro")}</Typography>
          <Chip
            label="2799 ₽"
            sx={{ bgcolor: "#930270", color: "#fff", fontWeight: "bold" }}
          />
        </Box>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />
      </Stack> */}

      <Button
        component={MuiLink}
        href="#master"
        variant="contained"
        sx={{
          bgcolor: "transparent",
          border: "1px solid #fff",
          color: "#fff",
          borderRadius: 2,
          px: 3,
          py: 1,
          "&:hover": { bgcolor: "#930270", borderColor: "#930270" },
        }}
      >
        {t("main.masters_title")}
      </Button>
      {activeSign && (
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
              onClick={() => setActive(false)}
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
              // dispatch(postAppoint(appoint));

              alert("Запись успешно отправлена!");
              setActive(false);
            }}
          >
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.7)", display: "block", mb: 1 }}
              >
                Ваше имя
              </Typography>
              <Box
                component="input"
                required
                placeholder="Введите имя"
                name="clientName"
                value={appoint.clientName}
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
                sx={{
                  width: "100%",
                  bgcolor: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 2,
                  p: 1.5,
                  color: "#fff",
                  outline: "none",
                  "&:focus": { borderColor: "#930270" },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.7)", display: "block", mb: 1 }}
              >
                Номер телефона
              </Typography>
              <Box
                value={appoint.clientPhone}
                name="clientPhone"
                component="input"
                type="tel"
                required
                placeholder="+7 (___) ___-__-__"
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
                sx={{
                  width: "100%",
                  bgcolor: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 2,
                  p: 1.5,
                  color: "#fff",
                  outline: "none",
                  "&:focus": { borderColor: "#930270" },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.7)", display: "block", mb: 1 }}
              >
                Дата и время
              </Typography>
              <Box
                value={appoint.data}
                name="data"
                component="input"
                type="datetime-local"
                required
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
                sx={{
                  width: "100%",
                  bgcolor: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 2,
                  p: 1.5,
                  color: "#fff",
                  outline: "none",
                  colorScheme: "dark", // чтобы календарь в хроме был темным
                  "&:focus": { borderColor: "#930270" },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.7)", display: "block", mb: 1 }}
              >
                Выберите мастера
              </Typography>
              <Box
                component="select"
                required
                value={selMastId}
                onChange={(e) => setSelmaster(e.target.value)}
                sx={{
                  width: "100%",
                  bgcolor: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 2,
                  p: 1.5,
                  color: "#fff",
                  outline: "none",
                  cursor: "pointer",
                  "&:focus": { borderColor: "#930270" },
                  // Стилизуем выпадающие элементы внутри (опционально для темной темы)
                  "& option": {
                    bgcolor: "#1a1a1a",
                    color: "#fff",
                  },
                }}
              >
                <option value="" disabled selected>
                  -- Свободный мастер --
                </option>

                {masters?.map((master) => (
                  <option key={master.id} value={master.id}>
                    {master.name} ({master.specialization})
                  </option>
                ))}
              </Box>
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
    </Paper>
  );
};
export default DescFavor;
