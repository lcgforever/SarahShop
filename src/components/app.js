import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan500, cyan700 } from 'material-ui/styles/colors';

// Define main theme
const mainTheme = getMuiTheme({
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700
  }
});

export default class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={mainTheme}>
        <div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
