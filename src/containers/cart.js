import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAppBar } from '../actions/index';
import { CART_TITLE, AppBarLeftButtonType } from '../constants';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardMedia, CardTitle, CardActions } from 'material-ui/Card';
import TouchRipple from 'material-ui/internal/TouchRipple';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import newMenuTagImage from '../../resources/images/new_tag.png';

class Cart extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.updateAppBar(AppBarLeftButtonType.DRAWER, CART_TITLE);
  }

  renderOrderItems() {
    if (localStorage.orderItemList) {
      const orderItemList = JSON.parse(localStorage.orderItemList);
      return orderItemList.map((orderItem) => {
        const menuData = this.props.menuDataMap[orderItem.menuId];
        return (
          <Card key={orderItem.id} style={{ position: 'relative', height: '150px', marginBottom: '24px' }} containerStyle={{ position: 'relative', width: '100%', height: '100%' }}>
            <TouchRipple style={{ zIndex: 100 }}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Col xs={4} sm={3} md={3} lg={2}>
                  <CardMedia>
                    <div className='mojoMenuImage' style={{ backgroundImage: `url(${menuData.imageUrl})` }}>
                      {
                        menuData.isNewMenu
                        ? (<img className='mojoMenuNewTagImage' src={newMenuTagImage} style={{ width: '48px', height: '36px' }} />)
                        : null
                      }
                    </div>
                  </CardMedia>
                </Col>
                <Col xs={6} sm={7} md={7} lg={8}>
                  <h1>{menuData.name}</h1>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}>

                </Col>
              </div>
            </TouchRipple>
            <CardActions className='mojoMenuActionContainer'>
              <FlatButton
                label={'Remove'}
                secondary={true} />
            </CardActions>
          </Card>
        );
      });
    } else {
      return (
        <h1>There is nothing in your cart.</h1>
      );
    }
  }

  render() {
    return (
      <div style={{ padding: '48px 150px' }}>
        {this.renderOrderItems()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    menuDataMap: state.getIn(['loadDataState', 'menuDataMap'])
  }
}

export default connect(mapStateToProps, { updateAppBar })(Cart);
