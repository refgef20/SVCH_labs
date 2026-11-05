import "./favor.css";
import "../../index.css";
import {
  Paper,
  TextField,
  Box,
  Stack,
  Typography,
  Divider,
  Chip,
  Button,
  Link as MuiLink,
} from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { Appointments } from "./IAppoints";
import { Favor } from "./IFavor";
import { Master } from "../Masters/IMaster";

const DescFavor = () => {
  const userId = 1;
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState<Favor[]>([]);
  const [masters, setMasters] = useState<Master[]>([]);
  const activeCat = useSelector(
    (state: RootState) => state.catalServ.activeCat,
  );
  const [activeSign, setActive] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [appoint, setAppoint] = useState<Appointments>({
    userId: userId,
    clientName: "",
    clientPhone: "",
    date: "",
    MasterId: NaN,
    FavorId: NaN,
    status: "создана",
  });
  const serviceTitle = services.find(
    (service) => service.id === appoint.FavorId,
  )?.title;

  useEffect(() => {
    if (!activeCat) return;

    setServices([]);
    async function getServices() {
      const res = await axios.get("http://localhost:5000/api/services", {
        params: { search: activeCat },
      });
      setServices(res.data.rows);
    }
    getServices();
  }, [activeCat]);

  useEffect(() => {
    if (!activeSign || !serviceTitle) return;

    async function getMasters() {
      const res = await axios.get("http://localhost:5000/api/master", {
        params: { search: serviceTitle },
      });
      setMasters(res.data.rows);
    }
    getMasters();
  }, [activeSign, serviceTitle]);

  function handleChange(name: string, value: string | number) {
    setAppoint((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function postAppoint() {
    setLoad(true);
    try {
      await axios.post("http://localhost:5000/api/appointment", {
        ...appoint,
        ServiceId: appoint.FavorId,
      });
      alert("Запись успешно отправлена!");
      setActive(false);
    } catch (error) {
      console.error(error);
      alert("Не удалось отправить запись");
    } finally {
      setLoad(false);
    }
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
        <Stack key={service.id} spacing={2} sx={{ mb: 4 }}>
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
                  setMasters([]);
                  setAppoint((prev) => ({
                    ...prev,
                    FavorId: service.id,
                    MasterId: "",
                  }));
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
            sx={{
              "& .MuiInputBase-root": {
                bgcolor: "#1a1a1a",
                color: "#fff",
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255,255,255,0.7)",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.15)",
              },
            }}
            onSubmit={(e) => {
              e.preventDefault();
              postAppoint();
            }}
          >
            <TextField
              label="Имя клиента"
              name="clientName"
              value={appoint.clientName}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              required
            />
            <TextField
              label="Телефон клиента"
              name="clientPhone"
              type="tel"
              value={appoint.clientPhone}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              required
            />
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.7)", display: "block", mb: 1 }}
              >
                Дата и время
              </Typography>
              <Box
                component="input"
                value={appoint.date || ""}
                name="date"
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
                  colorScheme: "dark",
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
                value={appoint.MasterId}
                onChange={(e) => handleChange("MasterId", e.target.value)}
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
                  "& option": {
                    bgcolor: "#1a1a1a",
                    color: "#fff",
                  },
                }}
              >
                <option value="" disabled>
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
              disabled={isLoad}
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
