import React, { Component } from "react";

class WordsMostUsed extends Component {
  render(){
    return(
      <div className="wordsMostUsed">
        <h2>Mots les plus utilisés dans ses musiques</h2>
        <div className="wordsMostUsed-values">
          <div className="wordsMostUsed-values-item">
            <div className="wordsMostUsed-values-item-word">Love</div>
            <div className="wordsMostUsed-values-item-number">10</div>
          </div>
          <div className="wordsMostUsed-values-item">
            <div className="wordsMostUsed-values-item-word">Burning</div>
            <div className="wordsMostUsed-values-item-number">15</div>
          </div>
          <div className="wordsMostUsed-values-item">
            <div className="wordsMostUsed-values-item-word">Dust</div>
            <div className="wordsMostUsed-values-item-number">6</div>
          </div>
        </div>
      </div>
    )
  }
}

export default WordsMostUsed;
