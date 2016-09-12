import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

class Bar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.value,
      limit: this.props.limit,
      height: this.props.height,
      backColor: this.props.backColor,
      barColor: this.props.barColor,
      foreColor: this.props.foreColor,
      completeColor: this.props.completeColor,
      progressColor: this.props.barColor,
      percent: '0%'
    };
    this.setProgress = this.setProgress.bind(this);
  }

  componentDidMount() {
  this.setProgress();
}
  componentWillReceiveProps(nextProps) {
  this.setProgress(nextProps.value);
}
  setProgress(value) {
  if(value != undefined)
  {
    this.setState({value: value});
  }
  else
  {
    value = this.state.value;
  }
  let width = this.state.width;
  let limit = this.state.limit;
  let percent = Math.round((value / limit) * 100);
  this.setState({ percent: percent });
  if (percent > 100) {
    this.setState({ progressColor: this.state.completeColor });
  }
  else {
    this.setState({ progressColor: this.state.barColor });
  }
}
  render() {
    return (
      <div id={this.props.id} className="progress" style={{ height: this.state.height, backgroundColor: this.state.backColor, color: this.state.foreColor }}>
        <label className="percent">{this.state.percent}%</label>
        <div className="bar" style={{ width: this.state.percent + '%', backgroundColor: this.state.progressColor }}>
        </div>
      </div>
    );
  }
}

Bar.propTypes = {
 value: PropTypes.number,
  limit: PropTypes.number,
  height: PropTypes.number,
  backColor: PropTypes.string,
  barColor: PropTypes.string,
  foreColor: PropTypes.string,
  completeColor: PropTypes.string,
  progressColor:PropTypes.string,
  id:PropTypes.object
  /*actions: PropTypes.object.isRequired*/
};

function mapStateToProps(state, ownProps) {
  return {
/*
    courses: state.courses
*/
  };
}

function mapDispatchToProps(dispatch) {
  return {
/*
    actions: bindActionCreators(courseActions, dispatch)
*/
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bar);
