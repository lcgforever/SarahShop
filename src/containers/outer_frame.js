import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { hideMessage } from '../actions/index';
import { AppBarLeftButtonType } from '../constants';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import DrawerMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import Badge from 'material-ui/Badge';
import mojoHeaderImage from '../../resources/images/mojo_header.jpg';

class OuterFrame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mainDrawerOpen: false
    };
    this.handleAppBarLeftButtonTap = this.handleAppBarLeftButtonTap.bind(this);
    this.handleMainDrawerToggle = this.handleMainDrawerToggle.bind(this);
    this.handleAppBarRightButtonTap = this.handleAppBarRightButtonTap.bind(this);
    this.handleSnackbarActionTap = this.handleSnackbarActionTap.bind(this);
    this.renderAppBarLeftButton = this.renderAppBarLeftButton.bind(this);
  }

  handleAppBarLeftButtonTap() {
    switch (this.props.appBarLeftButtonType) {
      case AppBarLeftButtonType.NAV_BACK:
      browserHistory.goBack();
      break;

      case AppBarLeftButtonType.DRAWER:
      default:
      this.handleMainDrawerToggle();
      break;
    }
  }

  handleMainDrawerToggle() {
    this.setState({
      mainDrawerOpen: !this.state.mainDrawerOpen
    });
  }

  handleAppBarRightButtonTap() {
    browserHistory.push('/cart');
  }

  handleSnackbarActionTap() {
    this.props.hideMessage();
  }

  renderAppBarLeftButton() {
    switch (this.props.appBarLeftButtonType) {
      case AppBarLeftButtonType.NAV_BACK:
      return (
        <IconButton tooltip='Back'>
          <NavigationBack />
        </IconButton>
      );

      case AppBarLeftButtonType.DRAWER:
      default:
      return (
        <IconButton tooltip='Menu'>
          <DrawerMenu />
        </IconButton>
      );
    }
  }

  renderAppBarRightButton() {
    if (this.props.orderItemCount > 0) {
      const badgeContent = this.props.orderItemCount > 9 ? '9+' : this.props.orderItemCount;
      return (
        <Badge
          badgeContent={badgeContent}
          secondary={true}
          style={{ padding: 0, color: 'white' }}
          badgeStyle={{ width: '18px', height: '18px', top: '4px', right: '4px' }}
          onTouchTap={this.handleAppBarRightButtonTap}>
          <IconButton tooltip='Cart'>
            <ShoppingCart color='white' />
          </IconButton>
        </Badge>
      );
    } else {
      return (
        <IconButton tooltip='Cart' onTouchTap={this.handleAppBarRightButtonTap}>
          <ShoppingCart color='white' />
        </IconButton>
      );
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title={this.props.appBarTitle}
          iconElementLeft={this.renderAppBarLeftButton()}
          iconElementRight={this.renderAppBarRightButton()}
          iconStyleLeft={{ marginLeft: '-6px' }}
          iconStyleRight={{ marginRight: '-6px' }}
          onLeftIconButtonTouchTap={this.handleAppBarLeftButtonTap} />
        <Drawer
          docked={false}
          open={this.state.mainDrawerOpen}
          onRequestChange={this.handleMainDrawerToggle}>
          <div className='mainDrawerHeaderContainer'>
            <img className='mainDrawerHeaderImage' src={mojoHeaderImage} />
            <p className='mainDrawerHeaderTitle'>Mojo Teahouse</p>
          </div>
          <Divider />
          <Link to='/'>
            <MenuItem className='mainDrawerMenuItem' primaryText='Menu' onTouchTap={this.handleMainDrawerToggle} />
          </Link>
          <MenuItem className='mainDrawerMenuItem' primaryText='About'/>
        </Drawer>
        <Snackbar
          open={this.props.showMessage}
          message={this.props.message}
          action='Dismiss'
          onActionTouchTap={this.handleSnackbarActionTap}
          autoHideDuration={4000} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  let orderItemCount = 0;
  if (localStorage.orderItemList) {
    const orderItemList = JSON.parse(localStorage.orderItemList);
    orderItemList.map((orderItem) => {
      orderItemCount += orderItem.quantity;
    });
  }

  return {
    showMessage: state.getIn(['messageState', 'showMessage']),
    message: state.getIn(['messageState', 'message']),
    appBarLeftButtonType: state.getIn(['appBarState', 'appBarLeftButtonType']),
    appBarTitle: state.getIn(['appBarState', 'appBarTitle']),
    orderItemCount: orderItemCount
  };
}

export default connect(mapStateToProps, { hideMessage })(OuterFrame);
