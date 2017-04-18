import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import { AppBar, IconButton } from 'material-ui';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';

const styles = {
  appBar: {
    paddingLeft: 0,
    paddingRight: 0,
    flexWrap: 'wrap'
  },
  appBarLeftIcon: {
    marginLeft: '16px'
  }
};

class ProductDetails extends Component {

  constructor(props) {
    super(props);
    const productId = '"' + this.props.params.productId + '"';
    this.productData = this.props.productDataMap[productId];
    this.handleAppBarLeftButtonTap = this.handleAppBarLeftButtonTap.bind(this);
  }

  handleAppBarLeftButtonTap() {
    browserHistory.goBack();
  }

  renderAppBarLeftButton() {
    return (
      <IconButton tooltip='Back'>
      <NavigationBack />
      </IconButton>
    );
  }

  render() {
    return (
      <div>
      <AppBar
      title={this.productData.name}
      style={styles.appBar}
      iconElementLeft={this.renderAppBarLeftButton()}
      iconStyleLeft={styles.appBarLeftIcon}
      onLeftIconButtonTouchTap={this.handleAppBarLeftButtonTap} />
      <Grid className='productDetailsContainer'>
      <Row className='productDetailsContent'>
      <Col xs={12} sm={6} md={6} lg={6} style={{ padding: '20px' }}>
      <div className='productDetailsImage' style={{ backgroundImage: `url(${this.productData.imageUrl})` }} />
      </Col>
      <Col xs={12} sm={6} md={6} lg={6} style={{ padding: '20px' }}>
      <div className='productDetailsInfoContainer'>
      <span style={{ fontSize: '28px' }}>
      {this.productData.name}
      </span>
      <span style={{ fontSize: '20px', paddingTop: '8%' }}>
      {this.productData.price}
      </span>
      </div>
      </Col>
      </Row>
      </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    productDataMap: state.getIn(['loadDataState', 'productDataMap'])
  };
}

export default connect(mapStateToProps, null)(ProductDetails);
