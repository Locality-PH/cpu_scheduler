import React, { Component } from "react";
import PriorityEmpty from "../component/cpu-component/priority-empty";
import PriorityPreempty from "../component/cpu-component/priority-preempty";
import SJFEmpty from "../component/cpu-component/sjf-empty";
import SJFPrempty from "../component/cpu-component/sjf-preempty";
import AdSense from "react-adsense";
import GantChart from "../component/shared-component/ganttchart";

import {
  Skeleton,
  Button,
  Input,
  Space,
  Row,
  Col,
  Card,
  Select,
  Option,
  message,
} from "antd";
Option = Select.Option;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        "Shortest Job First, SJF (non-preemptive)",
        "Shortest Remaining Time First, SRTF (preemptive)",
        "Priority (non-preemptive)",
        // "Priority (preemptive)",
      ],
      selectedCpu: "Shortest Job First, SJF (non-preemptive)",
      outputVisible: false,
      arrivalText: null,
      burstText: null,
      priorityText: "0",
      loading: false,
      ganttchart: [],
      // for future component
      texttest: "Parent Text",

      selecttexttest: this.selecttexttest,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectArrivalText = this.selectArrivalText.bind(this);
    this.selectBurstText = this.selectBurstText.bind(this);
    this.selectPriorityText = this.selectPriorityText.bind(this);
  }
  selecttexttest = (texttest) => {
    this.setState({ texttest });
  };
  selectGanttChart(data) {
    this.setState({ ganttchart: data });
    // console.log("inside")
    // console.log(data)
  }

  //   selectGanttChart = (t) => ({
  //     ganttchart: t
  // });

  onChangeValue = (ChangeValue) => {
    this.setState({ selectedCpu: ChangeValue });
    this.setState({ outputVisible: false });
  };

  selectArrivalText(event) {
    this.setState({ arrivalText: event.target.value });
  }
  selectBurstText(event) {
    this.setState({ burstText: event.target.value });
  }
  selectPriorityText(event) {
    this.setState({ priorityText: event.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Arrival:" + this.state.arrivalText);
    console.log("Burst:" + this.state.burstText);
    console.log("Priority:" + this.state.priorityText);
    if (
      /^[0-9\s]*$/.test(this.state.arrivalText) &&
      /^[0-9\s]*$/.test(this.state.burstText) &&
      /^[0-9\s]*$/.test(this.state.priorityText)
    ) {
      if (
        this.state.selectedCpu === "Priority (non-preemptive)" ||
        this.state.selectedCpu === "Priority (preemptive)"
      ) {
        let arrival = this.state.arrivalText
          .trim()
          .split("  ")
          .filter((word) => word !== "");
        let burst = this.state.burstText
          .trim()
          .split("  ")
          .filter((word) => word !== "");
        // let priority = this.state.priorityText
        //   .trim()
        //   .split("  ")
        //   .filter((word) => word !== "");

        arrival = arrival.join(" ");
        burst = burst.join(" ");
        // priority = priority.join(" ");

        // console.log("length "+ priority.split(' ').length)

        if (arrival.split(" ").length === burst.split(" ").length) {
          message
            .loading("Calculation in progress..", 1.5)
            .then(() => message.success("Loading finished", 1.5));
          setTimeout(() => {
            this.setState({
              outputVisible: true,
            });
            this.setState({ loading: true });
            setTimeout(() => {
              this.setState({ loading: false });
            }, 1000);
          }, 500);
        } else {
          message.error("Data Must Match the other!", 2.5);
        }
      } else {
        let arrival = this.state.arrivalText
          .trim()
          .split("  ")
          .filter((word) => word !== "");
        let burst = this.state.burstText
          .trim()
          .split("  ")
          .filter((word) => word !== "");

        arrival = arrival.join(" ");
        burst = burst.join(" ");

        if (arrival.split(" ").length === burst.split(" ").length) {
          message
            .loading("Calculation in progress..", 2.5)
            .then(() => message.success("Loading finished", 2.5));
          setTimeout(() => {
            this.setState({
              outputVisible: true,
            });
            this.setState({ loading: true });
            setTimeout(() => {
              this.setState({ loading: false });
            }, 2000);
          }, 500);
        } else {
          message.error("Data Must Match the other!", 2.5);
        }
      }
    } else {
      message.error("Must be an Integer!", 2.5);
    }
  }
  componentDidMount() {
      const installGoogleAds = () => {
      const elem = document.createElement("script");
      elem.src =
        "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2938262337341792";
      elem.async = true;
      elem.defer = true;
      document.body.insertBefore(elem, document.body.firstChild);
    };
    installGoogleAds();
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    // console.log("parent")
    // console.log(this.state.ganttchart)
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>;

    return (
      <>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} xl={3} xxl={3}></Col>

            <Col
              style={{ marginTop: "10px" }}
              xs={24}
              sm={24}
              md={24}
              xl={5}
              xxl={5}
            >
              <Card size="large" title="Input" className="shadow-box">
                <Space size={20} direction="vertical">
                  <div className="p-3 form-group gap-text">
                    <label className="w-100 ">Scheduling Algorithim</label>
                    <Select
                      size="large"
                      mode="single"
                      style={{ width: "100%", marginTop: "8px" }}
                      className="w-100"
                      defaultValue={[
                        "Shortest Job First, SJF (non-preemptive)",
                      ]}
                      onChange={(e) => this.onChangeValue(e)}
                      placeholder="CPU Scheduler"
                    >
                      {this.state.list.map((elm) => (
                        <Option key={elm} value={elm}>
                          {elm}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  <div className="mt-3">
                    <label>Arrival Times </label>

                    <Input
                      onChange={this.selectArrivalText}
                      style={{ width: "100%", marginTop: "8px" }}
                      size="large"
                      className="w-100"
                      placeholder="2 4 6 5"
                    />
                  </div>
                  <div className="mt-3">
                    <label>Burst Times </label>

                    <Input
                      onChange={this.selectBurstText}
                      style={{ width: "100%", marginTop: "8px" }}
                      size="large"
                      className="w-100"
                      placeholder="4 8 12 4"
                    />
                  </div>
                  {/* Conditional Statement For CPU Scheduling */}
                  {this.state.selectedCpu === "Priority (non-preemptive)" ||
                  this.state.selectedCpu === "Priority (preemptive)" ? (
                    <div className="mt-3">
                      <label>Priorities </label>

                      <Input
                        onChange={this.selectPriorityText}
                        style={{ width: "100%", marginTop: "8px" }}
                        size="large"
                        className="w-100"
                        placeholder="#1"
                      />
                    </div>
                  ) : //nothing
                  null}

                  <Button
                    onClick={this.handleSubmit}
                    type="primary"
                    size="large"
                  >
                    Calculate
                  </Button>
                </Space>
              </Card>
            </Col>
            <Col
              style={{ marginTop: "10px" }}
              xs={24}
              sm={24}
              md={24}
              xl={13}
              xxl={13}
            >
              <Card title="Output" className="shadow-box">
                {this.state.outputVisible === true ? (
                  <div>
                    <Skeleton active loading={this.state.loading}>
                      <div className="text-center"></div>
                      <div>
                        {/* <div>I am Parent</div>
                  <div>{this.state.texttest}</div>  this.state.selectedCpu === "Priority (preemptive)"*/}
                        {this.state.selectedCpu ===
                        "Priority (non-preemptive)" ? (
                          <div>
                            <GantChart CalculatedData={this.state.ganttchart} />
                            <PriorityEmpty
                              burstData={this.state.burstText
                                .trim()
                                .split("  ")
                                .filter((word) => word !== "")}
                              arrivalData={this.state.arrivalText
                                .trim()
                                .split("  ")
                                .filter((word) => word !== "")}
                              priorityData={this.state.priorityText
                                .trim()
                                .split("  ")
                                .filter((word) => word !== "")}
                              updateGanttChart={{
                                ganttchart: this.state.ganttchart,
                                selectGanttChart: this.selectGanttChart.bind(
                                  this
                                ),
                              }}
                            />
                          </div>
                        ) : this.state.selectedCpu ===
                          "Priority (preemptive)" ? (
                          <div>
                            <GantChart CalculatedData={this.state.ganttchart} />

                            <PriorityPreempty
                              burstData={this.state.burstText
                                .trim()
                                .split("  ")
                                .filter((word) => word !== "")}
                              arrivalData={this.state.arrivalText
                                .trim()
                                .split("  ")
                                .filter((word) => word !== "")}
                              priorityData={this.state.priorityText
                                .trim()
                                .split("  ")
                                .filter((word) => word !== "")}
                              updateGanttChart={{
                                ganttchart: this.state.ganttchart,
                                selectGanttChart: this.selectGanttChart.bind(
                                  this
                                ),
                              }}
                            />
                          </div>
                        ) : this.state.selectedCpu ===
                          "Shortest Job First, SJF (non-preemptive)" ? (
                          <div>
                            <GantChart CalculatedData={this.state.ganttchart} />

                            <SJFEmpty
                              burstData={this.state.burstText
                                .trim()
                                .split("  ")
                                .filter((word) => word !== "")}
                              arrivalData={this.state.arrivalText
                                .trim()
                                .split("  ")
                                .filter((word) => word !== "")}
                              updateGanttChart={{
                                ganttchart: this.state.ganttchart,
                                selectGanttChart: this.selectGanttChart.bind(
                                  this
                                ),
                              }}
                            />
                          </div>
                        ) : this.state.selectedCpu ===
                          "Shortest Remaining Time First, SRTF (preemptive)" ? (
                          <div>
                            <GantChart CalculatedData={this.state.ganttchart} />

                            <SJFPrempty
                              burstData={this.state.burstText
                                .trim()
                                .split("  ")
                                .filter((word) => word !== "")}
                              arrivalData={this.state.arrivalText
                                .trim()
                                .split("  ")
                                .filter((word) => word !== "")}
                              updateGanttChart={{
                                ganttchart: this.state.ganttchart,
                                selectGanttChart: this.selectGanttChart.bind(
                                  this
                                ),
                              }}
                            />
                          </div>
                        ) : null}
                      </div>
                    </Skeleton>
                  </div>
                ) : null}
              </Card>
            </Col>

            <Col style={{ marginTop: "10px" }} xs={24} sm={24} md={24} xl={24}>
              {/* <ins
                className="adsbygoogle"
                data-ad-client="ca-pub-2938262337341792"
                data-ad-slot="2541759083"
                data-ad-format="auto"
                data-full-width-responsive="true"
                style={{ display: "inline-block", height: 250, width: "100%" }}
              /> */}
              <AdSense.Google
                client="ca-pub-2938262337341792"
                slot="2541759083"
                style={{ display: "inline-block", height: 250, width: "100%" }}
                format=""
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Home;
