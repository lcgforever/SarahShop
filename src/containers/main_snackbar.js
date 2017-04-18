import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { hideMessage } from '../actions/index';

class MainSnackbar extends Component {

  constructor(props) {
    super(props);
    this.handleSnackbarActionTap = this.handleSnackbarActionTap.bind(this);
  }

  handleSnackbarActionTap() {
    this.props.hideMessage();
  }

  render() {
    return (
      <Snackbar
        open={this.props.showMessage}
        message={this.props.message}
        action='Dismiss'
        onActionTouchTap={this.handleSnackbarActionTap}
        autoHideDuration={4000}>
      </Snackbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    showMessage: state.getIn(['messageState', 'showMessage']),
    message: state.getIn(['messageState', 'message'])
  };
}

export default connect(mapStateToProps, { hideMessage })(MainSnackbar);
