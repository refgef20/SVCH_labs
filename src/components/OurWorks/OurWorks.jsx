import "../OurWorks/ourWorks.css";
import React, { Component } from "react";

class OurWorks extends Component {
  render() {
    return (
      <section className="container-our-works">
        <div className="our-works">
          <p className="tittle-works" data-i18n="main.our_works">
            Наши Работы
          </p>
          <p className="inst" data-i18n="main.instagram_more">
            - Больше работ у нас в<span className="highlight"> instagram</span>
          </p>
          <div className="our-works-ex">
            {this.props.works.map((work) => (
              <img key={work.photo} src={work.photo} alt="" />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default OurWorks;
