import React, { Component } from "react";
import { ResponsiveBar } from '@nivo/bar'
import data from '../datas/testBar'
import config from '../configurations/testBarconfig'

 class MusicsPerYear extends Component {
  render(){
    return(
      <div className="musicsPerYear">
        <h2>Nombre de musiques par année</h2>
        <ResponsiveBar
                    data={data}
                    keys={config.keys}
                    indexBy="années"
                    margin={config.margin}
                    padding={0.3}
                    colors="nivo"
                    colorBy="id"
                    defs={config.defs}
                    fill={config.fill}
                    borderColor="inherit:darker(1.6)"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={config.axisBottom}
                    axisLeft={config.axisLeft}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor="inherit:darker(1.6)"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    legends={config.legends}
                />
      </div>
    )
  }
}


// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


export default MusicsPerYear;
