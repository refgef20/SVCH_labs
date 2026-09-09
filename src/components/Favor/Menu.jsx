import "./favor.css";
import React, { Component } from "react";

class Menu extends Component {
  render() {
    return (
      <div className="hair">
        <ul className="container-kinds-hairStyle list-subcat">
          {this.props.favors.map((fav) => (
            <li key={fav.favor} className="kinds-hairStyle kinds-styling">
              <a href="!#" className="items-kinds-hair">
                {fav.favor}
              </a>
              <img
                src="src\assets\images\plus.svg"
                alt="plus"
                className="toggle-icon"
              />
            </li>
          ))}
        </ul>
        <p className="view-favor" data-i18n="main.haircut">
          Стрижка
        </p>
      </div>
    );
  }
}
export default Menu;
