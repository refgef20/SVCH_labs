import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import Header from "./components/Header/header.jsx";
import HeroSection from "./components/HeroSection/heroSection.jsx";
import Favor from "./components/Favor/Favor.jsx";
import Masters from "./components/Masters/Masters.jsx";
import Reviews from "./components/Reviews/Reviews.jsx";
import OurWorks from "./components/OurWorks/OurWorks.jsx";
import Product from "./components/Product/Product.jsx";

const favors = [
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
const masters = [
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
      "	https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
  },
];
const works = [
  { photo: "src/assets/images/work1.jpg" },
  { photo: "src/assets/images/work2.jpg" },
  { photo: "src/assets/images/work3.jpg" },
  { photo: "src/assets/images/work4.jpg" },
  { photo: "src/assets/images/work5.jpg" },
  { photo: "src/assets/images/work6.png" },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <Favor favors={favors} />
        <Masters masters={masters} />
        <Reviews />
        <OurWorks works={works} />
        <Product />
      </main>
    </>
  );
}

export default App;
