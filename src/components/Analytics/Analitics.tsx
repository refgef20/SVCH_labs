import { useEffect, useState } from "react";
import "../Authoriz&Register/auth&register.css";
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import axios from "axios";
import { Product } from "../Catalog/IProduct";
import { utils, writeFile } from "xlsx";
import pdfMake from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Chart } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

import { Line, Pie } from "react-chartjs-2";

interface Apps {
  id: number;
  date: string;
  status: string;
  MasterId: number;
  FavorId: number;
  userId: number;
}

const Analytics = () => {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  );

  const [products, setProd] = useState<Product[]>([]);
  const [appoints, setAp] = useState<Apps[]>([]);

  async function getProduct() {
    const res = await axios.get("http://localhost:5000/api/product");
    setProd(res.data.rows);
  }
  async function getApps() {
    const res = await axios.get("http://localhost:5000/api/appointment");
    setAp(res.data.rows);
  }

  useEffect(() => {
    getProduct();
    getApps();
  }, []);

  const prodHarCost = products.map(({ name, description, price }) => ({
    name,
    description,
    price,
  }));
  const sum = prodHarCost.reduce((acc, item) => (acc += item.price), 0);

  const table = {
    name: "ИТОГО",
    description: "",
    price: sum,
  };

  const rows = products.map(({ name, description, price }) => [
    name,
    description,
    price,
  ]);
  const headers = ["name", "description", "price"];
  const tablePdf = ["Итого", "", sum];
  const body = [headers, ...rows, tablePdf];
  const docDef: TDocumentDefinitions = {
    pageOrientation: "portrait",
    content: [
      { table: { headerRows: 1, widths: ["auto", "*", "auto"], body } },
    ],
  };

  function exportExel(products: any[]) {
    const workBook = utils.book_new();
    const sheet = utils.json_to_sheet(products);
    utils.sheet_add_json(sheet, [table], {
      origin: -1,
      skipHeader: true,
    });
    utils.book_append_sheet(workBook, sheet, "Отчет по товарам");
    writeFile(workBook, "Товары.xlsx");
  }

  function exportPdf() {
    pdfMake.addVirtualFileSystem(pdfFonts);
    const file = pdfMake.createPdf(docDef);
    file.download();
  }

  const amountProductCateg = products.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const keys = Object.keys(amountProductCateg);
  const val = Object.values(amountProductCateg);
  const pieData: ChartData<"pie"> = {
    labels: keys,
    datasets: [
      {
        label: "Количество товаров",
        data: val,
        backgroundColor: ["#71165b", "#c77cb4", "#165071", "#167134"],
        borderColor: "#1a1a1a",
        borderWidth: 2,
      },
    ],
  };
  const pirOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const apps = appoints
    .map((app) => {
      return app.date.slice(0, 10);
    })
    .sort();
  const recApps = apps.reduce(
    (acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const key = Object.keys(recApps);
  const value = Object.values(recApps);
  const lineData: ChartData<"line"> = {
    labels: key,
    datasets: [
      {
        label: "Количесвуто записей ",
        data: value,
        borderColor: "#165071",
        backgroundColor: "#71165b",
        tension: 0.3,
      },
    ],
  };
  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{
          color: "#fff",
          mb: 4,
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        Аналитика и Отчеты
      </Typography>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              bgcolor: "#111",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
              Динамика записей
            </Typography>
            <Box
              sx={{
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#888",
              }}
            >
              <Line data={lineData} options={lineOptions}></Line>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              bgcolor: "#111",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
              Распределение по категориям
            </Typography>
            <Box
              sx={{
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <Pie data={pieData} options={pirOptions}></Pie>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Блок экспорта данных */}
      <Paper
        elevation={1}
        sx={{
          p: 4,
          bgcolor: "#111",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff", mb: 3 }}>
          Экспорт отчетов
        </Typography>
        <Stack direction="row" spacing={2}>
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
            onClick={() => {
              exportExel(prodHarCost);
            }}
          >
            Экспорт в Excel
          </Button>
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
            onClick={() => {
              exportPdf();
            }}
          >
            Экспорт в PDF
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Analytics;
