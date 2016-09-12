import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Bar from '../bar/Bar';

let xhr = new XMLHttpRequest();

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      buttons: [],
      bars: [],
      limit: 100,
      barHeight: 32,
      backColor: '#eeeeee',
      barColor: '#16b7d4',
      completeColor: '#ff0000',
      foreColor: '#000000'
    };
    this.getData = this.getData.bind(this);
    this.onControlClick = this.onControlClick.bind(this);
    this.setBars = this.setBars.bind(this);
    this.setControls = this.setControls.bind(this);
  }
  componentWillMount() {
    this.getData();
  }
  componentDidMount() {

  }

  getData() {
    xhr.abort();
    xhr.open('get', 'http://pb-api.herokuapp.com/bars', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let data = JSON.parse(xhr.responseText);
        this.setState({
          buttons: data.buttons,
          bars: data.bars,
          limit: data.limit
        });
      }
    }.bind(this);
    xhr.send();
  }
  onControlClick(val) {
    let index = this.refs.select.value;
    let bars = this.state.bars;
    bars[index] += val;
    bars[index] = bars[index] < 0 ? 0 : bars[index];
    this.setState({ bars: bars });
  }
  setBars() {
    let bars = this.state.bars;
    let limit = this.state.limit;
    let barHeight = this.state.barHeight;
    let backColor = this.state.backColor;
    let barColor = this.state.barColor;
    let completeColor = this.state.completeColor;
    let foreColor = this.state.foreColor;

    let barList = bars.map(function (bar, index) {
      if (bar != null) {
        return (
          <Bar key={'bar' + index} height={barHeight} limit={limit} value={bar} backColor={backColor} barColor={barColor} completeColor={completeColor} foreColor={foreColor} />
        );
      }
    });

    return barList;
  }
  setControls() {
    let bars = this.state.bars;
    let buttons = this.state.buttons;

    let selectList = bars.map(function (bar, index) {
      if (bar != null) {
        return (
          <option key={'option' + index} value={index}>{'#progress' + (index + 1)}</option>
        );
      }
    }.bind(this));

    let buttonList = buttons.map(function (button, index) {
      if (button != null) {
        let val = button;
        let label = (val > 0) ? ('+' + val) : (val);
        return (
          <button key={'button' + index} type="button" onClick={this.onControlClick.bind(this, val)}>{label}</button>
        );
      }
    }.bind(this));

    return (
      <div>
        <select ref="select">
          {selectList}
        </select>
        {buttonList}
      </div>
    );
  }

  render() {
    return (
      <div>
        <section id="content">
          <div className="container">
            <h1 className="text-center">Progress Bars Demo</h1>
            <hr />
            <div className="progress-panel col-xs-12 col-sm-8 col-md-6 col-lg-4">
              {this.setBars()}
            </div>
            <div className="control-panel col-xs-12 col-sm-8 col-md-6 col-lg-4">
              {this.setControls()}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

HomePage.propTypes = {

};

function mapStateToProps(state, ownProps) {

  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
