import React, { Component } from "react";
import { Table , Row, Col } from "antd";
let colortag = ["#0085c3","#7ab800","#f2af00", "#dc5034","#ce1126","#0085c3"]

class SJFEmpty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrivalText: this.props.arrivalData.join(' '),
      burstText: this.props.burstData.join(' '),

     //sample table

      dataSource: [
        {
          key: 1,
          job: "A",
          arrival: 0,
          burst: 0,
          finish: 0,
          turntime: 0,
          waitingtime: 9
        },
        {
          key: 2,
          job: "B",
          arrival: 0,
          burst: 0,
          finish: 0,
          turntime: 0,
          waitingtime: 9
        }
      ],

      columns: [
        {
          title: () => <div className="text-center">Job</div>,
          key: 'job',
          render: (_, cpu) => (
            <div className="text-center">
              {cpu.job}
            </div>
          ),
        },
        {
          title: () => <div className="text-center">Arrival Time</div>,
          key: 'arrival',
          render: (_, cpu) => (
            <div className="text-center">
              {cpu.arrival}
            </div>
          ),
        },
        {
          title: () => <div className="text-center">Burst Time</div>,
          key: 'burst',
          render: (_, cpu) => (
            <div className="text-center">
              {cpu.burst}
            </div>
          ),
        },
        {
          title: () => <div className="text-center">Finished Time</div>,
          key: 'finish',
          render: (_, cpu) => (
            <div className="text-center">
              {cpu.finish}
            </div>
          ),
        },
        {
          title: () => <div className="text-center">Turnaround Time</div>,
          key: 'turnaround',
          render: (_, cpu) => (
            <div className="text-center">
              {cpu.burst}
            </div>
          ),
        },
        {
          title: () => <div className="text-center">Waiting Time</div>,
          key: 'waiting',
          render: (_, cpu) => (
            <div className="text-center">
              {cpu.burst}
            </div>
          ),
        },
      ],
    };
  }
  

  render() {

    return (
      
      <>
    
        <div > 

          <Table
            dataSource={this.state.dataSource}
            className="text-center"
            columns={this.state.columns}
            pagination={false}
            rowKey="key"
            scroll={{ x: "max-content" }}
          />
         
        </div>
        <div>
          <Row>
          <Col xs={12} sm={12} md={12} xl={12} className="text-left">
          <label>{}</label>
          </Col >
          <Col xs={12} sm={12} md={12} xl={12} className="text-right">
          <label>{}</label>
          </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default SJFEmpty;
