import React, { Component } from "react";
import { ResponsivePie } from '@nivo/pie'
import data from '../datas/pieGenre'
import config from '../configurations/pieConfigGenre'

class Genre extends Component {
  render(){
    return(
      <div className="genre">
        <h2>Genres</h2>
        <div className="genre-pie">

          <ResponsivePie
                  data={data}
                  margin={{
                      //"top": 40,
                      //"right": 80,
                      "bottom": 60,
                      //"left": 80
                  }}
                  innerRadius={0.5}

                  borderColor={{
                      "from": "color",
                      "modifiers": [
                          [
                              "darker",
                              0.2
                          ]
                      ]
                  }}
                  enableRadialLabels={false}
                  radialLabelsSkipAngle={10}
                  radialLabelsTextXOffset={6}
                  radialLabelsTextColor="#ffffff"
                  radialLabelsLinkOffset={6}
                  radialLabelsLinkDiagonalLength={16}
                  radialLabelsLinkHorizontalLength={24}
                  radialLabelsLinkStrokeWidth={1}
                  radialLabelsLinkColor={{
                      "from": "color"
                  }}
                  slicesLabelsSkipAngle={10}
                  slicesLabelsTextColor="#ffffff"
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  defs={[
                      {
                          "id": "dots",
                          "type": "patternDots",
                          "background": "inherit",
                          "color": "rgba(255, 255, 255, 0.3)",
                          "size": 4,
                          "padding": 1,
                          "stagger": true
                      },
                      {
                          "id": "lines",
                          "type": "patternLines",
                          "background": "inherit",
                          "color": "rgba(255, 255, 255, 0.3)",
                          "rotation": -45,
                          "lineWidth": 6,
                          "spacing": 10
                      },
                      {
                          "id": "color-1",
                          "type": "patternSquares",
                          "background": "#FE7E24",
                          "size": 0
                      },
                      {
                          "id": "color-2",
                          "type": "patternSquares",
                          "background": "#F46843",
                          "size": 0
                      },
                      {
                          "id": "color-3",
                          "type": "patternSquares",
                          "background": "#E85363",
                          "size": 0
                      },
                      {
                          "id": "color-4",
                          "type": "patternSquares",
                          "background": "#CD1DB2",
                          "size": 0
                      }
                  ]}
                  fill={[
                      {
                          "match": {
                              "id": "pop"
                          },
                          "id": "color-1"
                      },
                      {
                          "match": {
                              "id": "jazz"
                          },
                          "id": "color-2"
                      },
                      {
                          "match": {
                              "id": "classique"
                          },
                          "id": "color-3"
                      },
                      {
                          "match": {
                              "id": "rock"
                          },
                          "id": "color-4"
                      }
                  ]}
                  legends={[
                      {
                          "anchor": "bottom",
                          "direction": "row",
                          "translateY": 56,
                          "translateX": 20,
                          "itemWidth": 80,
                          "itemHeight": 14,
                          "itemTextColor": "#999",
                          "symbolSize": 14,
                          "symbolShape": "circle",
                          "effects": [
                              {
                                  "on": "hover",
                                  "style": {
                                      "itemTextColor": "#000"
                                  }
                              }
                          ]
                      }
                  ]}
              />
        </div>
      </div>
    )
  }
}

export default Genre;
// <ResponsivePie
//             data={data}
//             margin={config.margin}
//             colors={config.colors}
//
//             defs={config.defs}
//             fill={config.fill}
//             borderColor={config.borderColor}
//             animate={config.animate}
//             pixelRatio= {1}
//             innerRadius= {0.65}
//             enableRadialLabels= {false}
//             radialLabelsSkipAngle= {10}
//             radialLabelsTextXOffset= {6}
//             radialLabelsTextColor= {"#333333"}
//             radialLabelsLinkOffset= {0}
//             radialLabelsLinkDiagonalLength= {16}
//             radialLabelsLinkHorizontalLength= {24}
//             radialLabelsLinkStrokeWidth= {1}
//             slicesLabelsSkipAngle= {10}
//             slicesLabelsTextColor= {"#999999"}
//             animate= {true}
//             motionStiffness= {90}
//             motionDamping= {15}
//             legends= {config.legends}
//   />
