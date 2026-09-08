import "./heroSection.css";
import Description from "./Description";
import ContInfo from "./ContInfo";
import React, { Component } from "react";
class HeroSection extends Component {
  render() {
    return (
      <section id="woman">
        <Description tittle="Annetka.Hair" />
        <ContInfo phone="+7 (955) 099-27-57" />
      </section>
    );
  }
}

export default HeroSection;
