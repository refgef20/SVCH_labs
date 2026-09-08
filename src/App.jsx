import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import Header from "./components/Header/header.jsx";
import HeroSection from "./components/HeroSection/heroSection.jsx";
import Favor from "./components/Favor/Favor.jsx";

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
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <Favor favors={favors} />
      </main>
    </>
  );
}

export default App;
