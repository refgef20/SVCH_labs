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

const DescFavor = ({ favors }) => {
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
          {favors[0].favor}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.6 }}
        >
          {favors[0].description}
        </Typography>
      </Box>

      <Stack spacing={2} sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">Стрижка у стажёра</Typography>
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
          <Typography variant="body1">Стрижка у мастера</Typography>
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
          <Typography variant="body1">Стрижка у профи</Typography>
          <Chip
            label="2799 ₽"
            sx={{ bgcolor: "#930270", color: "#fff", fontWeight: "bold" }}
          />
        </Box>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />
      </Stack>

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
        Наши мастера
      </Button>
    </Paper>
  );
};
export default DescFavor;
