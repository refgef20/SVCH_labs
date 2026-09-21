import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/header.jsx";
import Catalog from "./Pages/Catalog.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./Pages/Home.jsx";
import Error from "./Pages/Error.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: '"Vera Humana","Circe", sans-serif',
  },
});

export interface FavorItem {
  favor: string;
  description: string;
}

export interface MasterItem {
  name: string;
  role: string;
  specialty: string;
  experience: string;
  price: string;
  photo: string;
}

export interface WorkItem {
  photo: string;
}

const favors: FavorItem[] = [
  {
    favor: "Стрижка",
    description:
      "Профессиональная стрижка волос любой сложности. Индивидуальный подбор формы.",
  },
  {
    favor: "Укладка",
    description: "Создание идеальной укладки для любого случая.",
  },
  {
    favor: "Окрашивание",
    description: "Профессиональное окрашивание премиальными красителями.",
  },
  {
    favor: "Уход",
    description: "Восстанавливающие процедуры для здоровья и красоты волос.",
  },
];

const works: WorkItem[] = [
  { photo: "src/assets/images/work1.jpg" },
  { photo: "src/assets/images/work2.jpg" },
  { photo: "src/assets/images/work3.jpg" },
  { photo: "src/assets/images/work4.jpg" },
  { photo: "src/assets/images/work5.jpg" },
  { photo: "src/assets/images/work6.png" },
];

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={<HomePage favors={favors} works={works} />}
            />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
