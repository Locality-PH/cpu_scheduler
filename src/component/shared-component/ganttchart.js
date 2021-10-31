import React, { Component } from "react";
import HSBar from "react-horizontal-stacked-bar-chart";
class GanttChart extends Component {
  render() {
    return (
      <>
        <div className="text-center margin-tb">
          <div >Gantt chart</div>
          {/* <label>{this.props.CalculatedData}</label> */}
          <HSBar className=""
          // data={[
          //   { value: 2, color: "#0085c3", description: "P1" },
          //   { value: 8, color: "#7ab800", description: "P4" },
          //   { value: 4, color: "#f2af00", description: "P2" },
          //   { value: 6, color: "#dc5034", description: "P3" },
          //   // { value: 40, color: "#ce1126", description: "P5" },
          //   // { value: 40, color: "#0085c3", description: "P1" },

          // ]}
          data={this.props.CalculatedData}
          height={40}
          showTextIn
          outlineWidth={0}
          outlineColor="black"
        />
        </div>
      </>
    );
  }
}

export default GanttChart;
