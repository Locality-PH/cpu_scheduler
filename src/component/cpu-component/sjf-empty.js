import React, { Component } from "react";
import { Table , Row, Col, Result } from "antd";

let arrival;
let burst;
let length;
let processID = [];
let waitingTime= [];
let turnAroundTime = [];
let finishTime = [];
let colortag = ["#0085c3","#7ab800","#f2af00", "#dc5034","#ce1126","#0085c3"]
let letGanttChart = [], ganttChart = [];
let sortIndex = []
let averagetat = [],averagewt = [];
let arrangeTableVal = []

class SJFEmpty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrivalText: this.props.arrivalData.join(' '),
      burstText: this.props.burstData.join(' '),

     //sample table

      dataSource: [],

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
              {cpu.ct}
            </div>
          ),
        },
        {
          title: () => <div className="text-center">Turnaround Time</div>,
          key: 'turnaround',
          render: (_, cpu) => (
            <div className="text-center">
              {cpu.tat}
            </div>
          ),
        },
        {
          title: () => <div className="text-center">Waiting Time</div>,
          key: 'waiting',
          render: (_, cpu) => (
            <div className="text-center">
              {cpu.wt}
            </div>
          ),
        },
      ],
    };
  }

  calculateProcessId = (l) => {
    let pid = 0;
    for (var i = 0; i < l; i++) {
      processID.push([(pid += 1)]);
    }
  };

  sortAccordingArrivalTimeAndBurstTime = (at, bt, l) => {
    let finalValue = []
    let startingIndex = at.indexOf(Math.min(...at))

    finalValue.push([startingIndex, 0, 0])

    for(var i = 0; i < l; i++){
      if(i != startingIndex){
        finalValue.push([i, at[i], bt[i]])
      }
    }

    finalValue.sort(function(a, b) {
      return a[2] - b[2];
    });

    finalValue[0] = [startingIndex, at[startingIndex], bt[startingIndex]]
    // console.log(finalValue)
    return finalValue;

  }

  calculateGanttChart = (indexList, bt, l, pid) => {
    let finalValue = []
    let ct = 0

    for(var i = 0; i < l; i++){
        ct = ct + indexList[i][2]
        finalValue.push([ct, bt[indexList[i][0]], pid[indexList[i][0]]])
    }

    return finalValue
  }

  calculateFinishTime(indexList, l, at){
    let finalValue = []
    let ct = at[indexList[0][0]]

    for(var i = 0; i < l; i++){
      ct = ct + indexList[i][2]
      finalValue[indexList[i][0]] = ct
  }
    return finalValue
  }

  calculateTurnAroundTime = (at, ct, l) => {
    var finalValue = []
    for(var i = 0; i < l; i++){
      finalValue.push(Math.abs(ct[i] - at[i]))
    }
    return finalValue
  }
  
  turnAroundTimeAverage(tat){
    let finalValue = 0
    for(var i = 0; i < tat.length; i++){
      finalValue = finalValue + tat[i]
    }

    return [finalValue, tat.length, Math.round(((finalValue/tat.length) + Number.EPSILON) * 100) / 100]
  }

  calculateWaitingTime = (bt, tat, l) => {
    var finalValue = []
    for(var i = 0; i < l; i++){
      finalValue.push(Math.abs(bt[i] - tat[i]))
    }
    return finalValue
  }

  waitingTimeAverage(wt){
    let finalValue = 0
    for(var i = 0; i < wt.length; i++){
      finalValue = finalValue + wt[i]
    }

    return [finalValue, wt.length, Math.round(((finalValue/wt.length) + Number.EPSILON) * 100) / 100]
  }

  arrangeTableValue = (si, gc, at ,bt, finishTime, turnAroundTime, waitingTime, l) => {
    let val = []
    val = si
    
    for(var i = 0; i < l; i++){
      val[i][1] = at[i]
      val[i][2] = bt[i]
      val[i][3] = finishTime[i]
      val[i][4] = turnAroundTime[i]
      val[i][5] = waitingTime[i]
    }

    val.sort(function(a, b) {
      return a[1] - b[1];
    });

    let newProcessID = []
    let newAt = []
    let newBt = []
    let newFinishTime = []
    let newTurnAroundTime = []
    let newWaitingTime = []

    for(var j = 0; j < l; j++){
      newProcessID.push(gc[j][2][0])
      newAt.push(val[j][1])
      newBt.push(val[j][2])
      newFinishTime.push(val[j][3])
      newTurnAroundTime.push(val[j][4])
      newWaitingTime.push(val[j][5])
    }

    arrival = newAt
    burst = newBt
    
    return[newFinishTime, newTurnAroundTime, newWaitingTime, newProcessID]
  }

  tableDataOutputProcess = (at, bt, ct,tat,wt, l, pid, gc) => {
    let n = 0;
    for (var i = 0; i < l; i++) {
      this.state.dataSource.push({
        key: n+=1,
        job: "P" + (pid[i]),
        arrival: at[i],
        burst: bt[i],
        ct: ct[i],
        tat: tat[i],
        wt: wt[i],
      });
      letGanttChart.push({
        value: gc[i][1],
        color: colortag[(i) % 6],
        description: "P" + (gc[i][2][0])
      })
      
    }

    letGanttChart = []
    processID = []
    waitingTime= []
    finishTime = []
    arrival = []
    burst = []
    turnAroundTime=[]

   }


  componentDidMount() {    this.props.updateGanttChart.selectGanttChart(letGanttChart)  }
  

  render() {
    length = this.state.arrivalText.split(" ").length;

    this.calculateProcessId(length);
    arrival = this.state.arrivalText.split(" ").map(Number);
    burst = this.state.burstText.split(" ").map(Number);
    sortIndex = this.sortAccordingArrivalTimeAndBurstTime(arrival, burst, length)

    ganttChart = this.calculateGanttChart(sortIndex, burst, length, processID)
    finishTime = this.calculateFinishTime(sortIndex, length, arrival)
    turnAroundTime = this.calculateTurnAroundTime(arrival, finishTime, length)
    waitingTime = this.calculateWaitingTime(burst, turnAroundTime, length)
    
    averagewt = this.waitingTimeAverage(waitingTime);
    averagetat = this.turnAroundTimeAverage(turnAroundTime);

    // // Just sorting the final value
    // arrangeTableVal = this.arrangeTableValue(sortIndex, ganttChart, arrival, burst, finishTime, turnAroundTime, waitingTime, length)
    // finishTime = arrangeTableVal[0]
    // turnAroundTime = arrangeTableVal[1]
    // waitingTime = arrangeTableVal[2]
    // processID = arrangeTableVal[3]

    this.tableDataOutputProcess(arrival,burst ,finishTime,turnAroundTime,waitingTime,length, processID, ganttChart)

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
          <label>Average Turn Around Time: {averagetat[0]} / {averagetat[1]} = {averagetat[2]}</label>
          </Col >
          <Col xs={12} sm={12} md={12} xl={12} className="text-right">
          <label>Average Turn Around Time: {averagewt[0]} / {averagewt[1]} = {averagewt[2]}</label>
          </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default SJFEmpty;
