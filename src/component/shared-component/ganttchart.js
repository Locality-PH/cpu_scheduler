import React, { Component } from "react";
import HSBar from "react-horizontal-stacked-bar-chart";
class GanttChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      columns: [
        {
          title: () => <div className="text-center">Job</div>,
          key: "job",
          render: (_, cpu) => <div className="text-center">{cpu.job}</div>,
        },
        {
          title: () => <div className="text-center">Arrival Time</div>,
          key: "arrival",
          render: (_, cpu) => <div className="text-center">{cpu.arrival}</div>,
        },
        {
          title: () => <div className="text-center">Burst Time</div>,
          key: "burst",
          render: (_, cpu) => <div className="text-center">{cpu.burst}</div>,
        },
        {
          title: () => <div className="text-center">Finished Time</div>,
          key: "ct",
          render: (_, cpu) => <div className="text-center">{cpu.ct}</div>,
        },
        {
          title: () => <div className="text-center">Turnaround Time</div>,
          key: "tat",
          render: (_, cpu) => <div className="text-center">{cpu.tat}</div>,
        },
        {
          title: () => <div className="text-center">Waiting Time</div>,
          key: "wt",
          render: (_, cpu) => <div className="text-center">{cpu.wt}</div>,
        },
      ],
    };
  }
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
          showTextWithValue={false}
          outlineWidth={0}
          outlineColor="black"
        />
        </div>
      </>
    );
  }
}

export default GanttChart;
