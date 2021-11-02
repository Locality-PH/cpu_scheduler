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

  // Sort the Input Value according in Arrival and Burst time
  sortAccordingArrivalTimeAndBurstTime = (at, bt, l) => {
    let finalValue = []
    let validatedValue = []
    let startingIndex = at.indexOf(Math.min(...at))
    
    let lowestArr = []

    for(var f = 0; f < l; f++){
      if(at[startingIndex] == at[f] && f != startingIndex - 1){
        lowestArr.push([f, at[f], bt[f]])
      }
    }

    lowestArr.sort(function(a, b) {
      return a[2] - b[2];
    });

    startingIndex = lowestArr[0][0]

    validatedValue.push([startingIndex, 0, 0])
    finalValue.push([startingIndex, 0, 0])

    for(var i = 0; i < l; i++){
      if(i != startingIndex){
        validatedValue.push([i, at[i], bt[i]])
      }
    }

    validatedValue.sort(function(a, b) {
      return a[2] - b[2];
    });

    validatedValue[0] = [startingIndex, at[startingIndex], bt[startingIndex]]
    finalValue[0] = [startingIndex, at[startingIndex], bt[startingIndex]]

    let ct = 0
    let remainingArr = []
    ct = ct + validatedValue[0][2]

    for(var j = 1; j < l; j++){
      if(ct >= validatedValue[j][1] && ct >= validatedValue[j][2]){
        ct = ct + validatedValue[j][2]
        finalValue.push(validatedValue[j])
      }
      else{
        remainingArr.push(validatedValue[j])
      }
    }

    remainingArr.sort(function(a, b) {
      return a[1] - b[1];
    });

    if(remainingArr.length != 0){
      finalValue = [...finalValue, ...remainingArr]
      // console.log("concat")
    }

    // console.log("Reremaining arr ", remainingArr)
    // console.log("FInal Value ", finalValue)
    return finalValue;

  }

  // GanttChart Calculation
  calculateGanttChart = (indexList, bt, l, pid) => {
    let finalValue = []
    let ct = indexList[0][1]

    ct = ct + indexList[0][2]
    finalValue.push([ct, bt[indexList[0][0]], pid[indexList[0][0]]])

    for(var i = 1; i < l; i++){
      if(ct >= indexList[i][1]){
        ct = ct + indexList[i][2]
        finalValue.push([ct, bt[indexList[i][0]], pid[indexList[i][0]]])
      }
      else if(ct <= indexList[i][1]){
        let isWaiting = true
        if(isWaiting == true){
          ct = Math.abs(ct - [indexList[i][1]])
          finalValue.push([ct, bt[indexList[i][0]], "-"])
          isWaiting = true      
        }
        ct = indexList[i][1] + indexList[i][2]
        finalValue.push([ct, bt[indexList[i][0]], pid[indexList[i][0]]])      
      }
    }

    return finalValue
  }

  // calculateGanttChart = (indexList, bt, l, pid) => {
  //   let finalValue = []
  //   let ct = 0

  //   for(var i = 0; i < l; i++){
  //       ct = ct + indexList[i][2]
  //       finalValue.push([ct, bt[indexList[i][0]], pid[indexList[i][0]]])
  //   }

  //   return finalValue
  // }

  // Finish time calculation
  calculateFinishTime(indexList, l, at){
    let finalValue = []
    let ct = indexList[0][1]

    ct = ct + indexList[0][2]
    finalValue[indexList[0][0]] = ct

    for(var i = 1; i < l; i++){
      if(ct >= indexList[i][1]){
        ct = ct + indexList[i][2]
        finalValue[indexList[i][0]] = ct
      }
      else if(ct <= indexList[i][1]){
        ct = indexList[i][1] + indexList[i][2]
        finalValue[indexList[i][0]] = ct
      }
  }
    return finalValue
  }

  // Turn around time calculation
  calculateTurnAroundTime = (at, ct, l) => {
    var finalValue = []
    for(var i = 0; i < l; i++){
      finalValue.push(Math.abs(ct[i] - at[i]))
    }
    return finalValue
  }
  
  // Turn around time average calculation
  turnAroundTimeAverage(tat){
    let finalValue = 0
    for(var i = 0; i < tat.length; i++){
      finalValue = finalValue + tat[i]
    }

    return [finalValue, tat.length, Math.round(((finalValue/tat.length) + Number.EPSILON) * 100) / 100]
  }

  // Waiting time calculation
  calculateWaitingTime = (bt, tat, l) => {
    var finalValue = []
    for(var i = 0; i < l; i++){
      finalValue.push(Math.abs(bt[i] - tat[i]))
    }
    return finalValue
  }

  // Waiting time average calculation
  waitingTimeAverage(wt){
    let finalValue = 0
    for(var i = 0; i < wt.length; i++){
      finalValue = finalValue + wt[i]
    }

    return [finalValue, wt.length, Math.round(((finalValue/wt.length) + Number.EPSILON) * 100) / 100]
  }

  // Sorting the final value
  arrangeTableValue = (si, gc, at ,bt, finishTime, turnAroundTime, waitingTime, l) => {
    let newPID = []
    let newAt = []
    let newBt = []
    let newFinishTime = []
    let newTurnAroundTime = []
    let newWaitingTime = []

    si.sort(function(a, b) {
      return a[1] - b[1];
    })

    for(var q = 0; q < gc.length; q++){
      if(gc[q][2][0] != "-"){
        newPID.push(gc[q][2][0])
      }
    }

    for(var i = 0; i < l; i++){
      newAt.push(si[i][1])
      newBt.push(si[i][2])
      newFinishTime.push(finishTime[si[i][0]])
      newTurnAroundTime.push(turnAroundTime[si[i][0]])
      newWaitingTime.push(waitingTime[si[i][0]])
    }

    arrival = newAt
    burst = newBt

    return [newPID, newFinishTime, newTurnAroundTime, newWaitingTime]
  }

  // Output table
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
      
    }

    for (var i = 0; i < gc.length; i++) {
      let gcColor = colortag[(i) % 6]
      let p = "P" + gc[i][2][0]
      if(gc[i][2][0] == "-"){
        gcColor = "#000000"
        p = "-"
      }
      letGanttChart.push({
        value: gc[i][1],
        color: gcColor,
        description: p
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

    // Just sorting the final value
    arrangeTableVal = this.arrangeTableValue(sortIndex, ganttChart, arrival, burst, finishTime, turnAroundTime, waitingTime, length)
    processID = arrangeTableVal[0]
    finishTime = arrangeTableVal[1]
    turnAroundTime = arrangeTableVal[2]
    waitingTime = arrangeTableVal[3]
   

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