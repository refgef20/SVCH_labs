import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/header.jsx";
import Catalog from "./Pages/Catalog.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./Pages/Home.jsx";

// 1. Описываем типы данных для каждого массива (интерфейсы)
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

// 2. Указываем тип для каждого массива (например, FavorItem[])
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

const masters: MasterItem[] = [
  {
    name: "АННА АСТАХОВА",
    role: "МАСТЕР",
    specialty: "Мужская стрижка",
    experience: "Опыт более 5 лет",
    price: "1899 ₽",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "ИРА СОКОЛОВА",
    role: "СТАЖЕР",
    specialty: "Младший стилист",
    experience: "Опыт 1 год",
    price: "899 ₽",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "КАТЯ КЛИМОВА",
    role: "ПРОФИ",
    specialty: "Колорист-эксперт",
    experience: "Опыт более 8 лет",
    price: "4399 ₽",
    photo:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
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
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage favors={favors} masters={masters} works={works} />
            }
          />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
