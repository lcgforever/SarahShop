import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadAllData, updateAppBar, updateOrderItem, showMessage } from '../actions/index';
import { AppBarLeftButtonType, ADD_TO_CART_MESSAGE } from '../constants';
import _ from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardMedia, CardTitle, CardActions } from 'material-ui/Card';
import TouchRipple from 'material-ui/internal/TouchRipple';
import Subheader from 'material-ui/Subheader';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import newMenuTagImage from '../../resources/images/new_tag.png';

class MojoMenu extends Component {

  constructor(props) {
    super(props);
    this.renderAllMenus = this.renderAllMenus.bind(this);
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
  }

  componentWillMount() {
    this.props.updateAppBar(AppBarLeftButtonType.DRAWER);
  }

  handleAddToCartClick(event, menuData) {
    const orderItem = {
      id: new Date().getTime(),
      menuId: menuData.id,
      quantity: 1,
      totalPrice: menuData.price,
      selectedToppingIds: [],
      selectedToppingPrice: 0,
      note: ''
    };
    this.props.updateOrderItem(orderItem);
    this.props.showMessage(ADD_TO_CART_MESSAGE);
  }

  renderAllMenus() {
    if (this.props.menuDataMap) {
      const menuDataMap = this.props.menuDataMap;
      const categoryMap = {};
      // Filter by category
      const sortedCategorySet = _.sortBy(_.uniq(_.map(menuDataMap, 'category')));
      _.each(sortedCategorySet, (category) => {
        categoryMap[category] = [];
      });
      _.forOwn(menuDataMap, (menuData, menuId) => {
        categoryMap[menuData.category].push(menuData);
      });

      return sortedCategorySet.map((category) => {
        return (
          <div key={category}>
            <Subheader className='mojoMenuCategoryHeader'>{category}</Subheader>
            {this.renderCategoryMenuList(category, categoryMap[category])}
          </div>
        );
      });
    }
  }

  renderCategoryMenuList(category, categoryMenuList) {
    const cols = [];
    categoryMenuList.map((menuData) => {
      cols.push(
        <Col
          key={menuData.id}
          xs={12} sm={6} md={4} lg={3}
          className='mojoMenuCardContainer'>
          <Card className='mojoMenuCard'>
            <TouchRipple style={{ zIndex: 100 }}>
              <Link to={'/menu/' + menuData.id}>
                <CardMedia>
                  <div className='mojoMenuImage' style={{ backgroundImage: `url(${menuData.imageUrl})` }}>
                    {
                      menuData.isNewMenu
                      ? (<img className='mojoMenuNewTagImage' src={newMenuTagImage} />)
                      : null
                    }
                  </div>
                </CardMedia>
                <CardTitle
                  title={menuData.name}
                  titleStyle={{ fontSize: '16px' }}
                  subtitle={menuData.chineseName}
                  subtitleStyle={{ fontSize: '14px' }} />
              </Link>
            </TouchRipple>
            <CardActions className='mojoMenuActionContainer'>
              <FlatButton
                label={
                  menuData.isSoldOut
                  ? 'Sold out'
                  : 'Add to cart ($' + Number(menuData.price).toFixed(1) + ')'
                }
                secondary={true}
                onTouchTap={(event) => { this.handleAddToCartClick(event, menuData) }} />
            </CardActions>
            {
              menuData.isSoldOut
              ? (<div className='mojoMenuDisableLayout' />)
              : null
            }
          </Card>
        </Col>
      );
    });

    return (
      <Row>
        {cols}
      </Row>
    );
  }

  render() {
    return (
      <div className='mojoMenuContainer'>
        {this.props.loading
          ? (<CircularProgress className='loadingProgressBar' size={100} thickness={7} />)
          : (
            <Grid className='mojoMenuListContainer'>
              {this.renderAllMenus()}
            </Grid>
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.getIn(['loadDataState', 'loading']),
    menuDataMap: state.getIn(['loadDataState', 'menuDataMap'])
  };
}

export default connect(mapStateToProps, { loadAllData, updateAppBar, updateOrderItem, showMessage })(MojoMenu);
