import React, { Component } from 'react';
import { Link } from 'react-router';
import { showMessage } from '../actions/index';
import _ from 'lodash';
import { Card, CardMedia, CardTitle, Subheader } from 'material-ui';
import TouchRipple from 'material-ui/internal/TouchRipple';
import { Grid, Row, Col } from 'react-bootstrap/lib';

export default class ProductTabContent extends Component {

  constructor(props) {
    super(props);
    this.renderAllProducts = this.renderAllProducts.bind(this);
  }

  renderAllProducts() {
    if (this.props.productDataList) {
      const productDataList = this.props.productDataList;
      const categoryMap = {};
      // Filter by category
      const sortedCategorySet = _.sortBy(_.uniq(_.map(productDataList, 'category')));
      _.each(sortedCategorySet, (category) => {
        categoryMap[category] = [];
      });
      _.each(productDataList, (productData) => {
        categoryMap[productData.category].push(productData);
      });

      return sortedCategorySet.map((category) => {
        return (
          <div key={category}>
            <Subheader className='productCategoryHeader'>{category}</Subheader>
            {this.renderCategoryProductList(category, categoryMap[category])}
          </div>
        );
      });
    }
  }

  renderCategoryProductList(category, categoryMenuList) {
    const cols = [];
    categoryMenuList.map((productData) => {
      cols.push(
        <Col
          key={productData.id}
          xs={12} sm={6} md={4} lg={3}
          className='productCardContainer'>
          <Card className='productCard'>
            <TouchRipple style={{ zIndex: 100 }}>
              <Link to={'/product/' + productData.id}>
                <CardMedia>
                  <div className='productImage' style={{ backgroundImage: `url(${productData.imageUrl})`, backgroundSize: 'contain' }} />
                </CardMedia>
                <CardTitle
                  title={productData.name}
                  titleStyle={{ fontSize: '16px', textAlign: 'center' }}
                  subtitle={productData.price}
                  subtitleStyle={{ fontSize: '14px', textAlign: 'center' }} />
              </Link>
            </TouchRipple>
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
      <Grid className='productTabGridContainer'>
        {this.renderAllProducts()}
      </Grid>
    );
  }
}
