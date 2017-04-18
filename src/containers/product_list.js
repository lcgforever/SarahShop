import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadAllData, updateAppBar, showMessage } from '../actions/index';
import { MAIN_TITLE } from '../constants';
import _ from 'lodash';
import { AppBar, Drawer, MenuItem, Divider, IconButton, CircularProgress, Tabs, Tab } from 'material-ui';
import DrawerMenu from 'material-ui/svg-icons/navigation/menu';
import SwipeableViews from 'react-swipeable-views';
import MainSnackbar from './main_snackbar';
import ProductTabContent from '../components/product_tab_content';

const styles = {
  appBar: {
    paddingLeft: 0,
    paddingRight: 0,
    flexWrap: 'wrap'
  },
  appBarLeftIcon: {
    marginLeft: '16px'
  },
  tabContainer: {
    width: '100%'
  }
};

class ProductList extends Component {

  constructor(props) {
    super(props);
    let savedTabIndex = 0;
    if (sessionStorage.savedTabIndex) {
      savedTabIndex = parseInt(sessionStorage.savedTabIndex);
    }
    this.state = {
      mainDrawerOpen: false,
      currentTabIndex: savedTabIndex
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleMainDrawerToggle = this.handleMainDrawerToggle.bind(this);
    this.renderAppBarLeftButton = this.renderAppBarLeftButton.bind(this);
    this.renderAllTabs = this.renderAllTabs.bind(this);
    this.renderAllTabContents = this.renderAllTabContents.bind(this);
  }

  componentWillMount() {
    this.handleTabChange(this.state.currentTabIndex);
  }

  handleTabChange(newTabIndex) {
    sessionStorage.savedTabIndex = newTabIndex;
    this.setState({
      currentTabIndex: newTabIndex
    });
  }

  handleMainDrawerToggle() {
    this.setState({
      mainDrawerOpen: !this.state.mainDrawerOpen
    });
  }

  renderAppBarLeftButton() {
    return (
      <IconButton tooltip='Menu'>
        <DrawerMenu />
      </IconButton>
    );
  }

  renderAllTabs() {
    if (this.props.productDataMap) {
      const productDataMap = this.props.productDataMap;
      const brandMap = {};
      const sortedBrandSet = _.sortBy(_.uniq(_.map(productDataMap, 'brand')));
      _.each(sortedBrandSet, (brand) => {
        brandMap[brand] = [];
      });
      _.forOwn(productDataMap, (productData) => {
        brandMap[productData.brand].push(productData);
      });

      const tabList = [];
      sortedBrandSet.map((brand) => {
        tabList.push(
          <Tab key={brand} value={tabList.length} label={brand} />
        );
      });

      return (
        <Tabs
          value={this.state.currentTabIndex}
          onChange={this.handleTabChange}>
          {tabList}
        </Tabs>
      );
    }
  }

  renderAllTabContents() {
    if (this.props.productDataMap) {
      const productDataMap = this.props.productDataMap;
      const brandMap = {};
      const sortedBrandSet = _.sortBy(_.uniq(_.map(productDataMap, 'brand')));
      _.each(sortedBrandSet, (brand) => {
        brandMap[brand] = [];
      });
      _.forOwn(productDataMap, (productData) => {
        brandMap[productData.brand].push(productData);
      });

      const contentList = [];
      sortedBrandSet.map((brand) => {
        contentList.push(
          <ProductTabContent key={brand} productDataList={brandMap[brand]} />
        );
      });

      return (
        <SwipeableViews
          index={this.state.currentTabIndex}
          onChangeIndex={this.handleTabChange}>
          {contentList}
        </SwipeableViews>
      );
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title={MAIN_TITLE}
          style={styles.appBar}
          iconElementLeft={this.renderAppBarLeftButton()}
          iconStyleLeft={styles.appBarLeftIcon}
          onLeftIconButtonTouchTap={this.handleMainDrawerToggle}>
          {this.props.loading
            ? null
            : (
              <div style={styles.tabContainer}>
                {this.renderAllTabs()}
              </div>
            )
          }
        </AppBar>
        <Drawer
          docked={false}
          open={this.state.mainDrawerOpen}
          onRequestChange={this.handleMainDrawerToggle}>
          <div className='mainDrawerHeaderContainer'>
            <p className='mainDrawerHeaderTitle'>{MAIN_TITLE}</p>
          </div>
          <Divider />
          <Link to='/'>
            <MenuItem className='mainDrawerMenuItem' primaryText='Menu' onTouchTap={this.handleMainDrawerToggle} />
          </Link>
          <MenuItem className='mainDrawerMenuItem' primaryText='About'/>
        </Drawer>
        <div className='allProductsContainer'>
          {this.props.loading
            ? (<CircularProgress className='loadingProgressBar' size={100} thickness={7} />)
            : (
              <div className='productTabContentContainer'>
                {this.renderAllTabContents()}
              </div>
            )
          }
        </div>
        <MainSnackbar />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.getIn(['loadDataState', 'loading']),
    productDataMap: state.getIn(['loadDataState', 'productDataMap'])
  };
}

export default connect(mapStateToProps, { loadAllData, showMessage })(ProductList);
