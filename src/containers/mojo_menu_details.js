import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import { updateAppBar, updateOrderItem, showMessage } from '../actions/index';
import { AppBarLeftButtonType, ADD_TO_CART_MESSAGE } from '../constants';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import newMenuTagImage from '../../resources/images/new_tag.png';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class MojoMenuDetails extends Component {

  constructor(props) {
    super(props);

    this.menuData = this.props.menuDataMap[this.props.params.menuId];
    this.state = {
      quantityErrorText: '',
      quantity: 1,
      selectedToppingIds: [],
      selectedToppingPrice: 0,
      totalPrice: this.menuData.price,
      note: '',
      addToCartButtonDisabled: false
    };
    this.handleQuantityTextChange = this.handleQuantityTextChange.bind(this);
    this.handleNoteTextChange = this.handleNoteTextChange.bind(this);
    this.handleToppingCheckState = this.handleToppingCheckState.bind(this);
    this.handleAddToCartButtonClick = this.handleAddToCartButtonClick.bind(this);
  }

  componentWillMount() {
    this.props.updateAppBar(AppBarLeftButtonType.NAV_BACK, this.menuData.name);
  }

  handleQuantityTextChange(event, newValue) {
    if (newValue.length == 0) {
      this.setState({
        quantityErrorText: 'This field is required!',
        addToCartButtonDisabled: true
      });
    } else if (!this.isNumeric(newValue)) {
      this.setState({
        quantityErrorText: 'Please enter a valid number!',
        addToCartButtonDisabled: true
      });
    } else if (parseInt(newValue) > 50) {
      this.setState({
        quantityErrorText: 'Please enter smaller than 50!',
        addToCartButtonDisabled: true
      });
    } else {
      const newQuantity = parseInt(newValue);
      this.setState({
        quantityErrorText: '',
        quantity: newQuantity,
        totalPrice: newQuantity * (this.menuData.price + this.state.selectedToppingPrice),
        addToCartButtonDisabled: false
      });
    }
  }

  handleNoteTextChange(event, newValue) {
    this.setState({
      note: newValue
    });
  }

  handleToppingCheckState(event, isChecked, toppingData) {
    if (isChecked) {
      const newSelectedToppingPrice = this.state.selectedToppingPrice + toppingData.price;
      this.setState({
        selectedToppingIds: _.concat(this.state.selectedToppingIds, toppingData.id),
        selectedToppingPrice: newSelectedToppingPrice,
        totalPrice: this.state.quantity * (this.menuData.price + newSelectedToppingPrice)
      });
    } else {
      const newSelectedToppingPrice = this.state.selectedToppingPrice - toppingData.price;
      this.setState({
        selectedToppingIds: _.without(this.state.selectedToppingIds, toppingData.id),
        selectedToppingPrice: newSelectedToppingPrice,
        totalPrice: this.state.quantity * (this.menuData.price + newSelectedToppingPrice)
      });
    }
  }

  handleAddToCartButtonClick() {
    const orderItem = {
      id: new Date().getTime(),
      menuId: this.menuData.id,
      quantity: this.state.quantity,
      totalPrice: this.state.totalPrice,
      selectedToppingIds: this.state.selectedToppingIds,
      selectedToppingPrice: this.state.selectedToppingPrice,
      note: this.state.note
    };
    this.props.updateOrderItem(orderItem);
    this.props.showMessage(ADD_TO_CART_MESSAGE);
    browserHistory.push('/');
  }

  isNumeric(value) {
    return /^\d+$/.test(value);
  }

  getTotalPrice() {
    return this.state.quantity * (this.menuData.price + this.selectedToppingPrice);
  }

  renderToppings(toppingIds) {
    if (toppingIds && toppingIds.length > 0) {
      const toppings = [];
      toppingIds.map((toppingId) => {
        const toppingData = this.props.toppingDataMap[toppingId];
        const label1 = `${toppingData.name} ${toppingData.chineseName} `;
        const label2 = toppingData.isSoldOut ? `(Sold out)` : `($${Number(toppingData.price).toFixed(1)})`;
        const checkboxLabel = label1 + label2;
        toppings.push(
          <Checkbox
            key={toppingId}
            label={checkboxLabel}
            className='mojoMenuDetailsToppingMargin'
            disabled={toppingData.isSoldOut}
            onCheck={(event, isChecked) => { this.handleToppingCheckState(event, isChecked, toppingData) }} />
        );
      });
      return (
        <div className='mojoMenuDetailsInfoMargin'>
          <Subheader style={{ fontSize: '16px', paddingLeft: 0, paddingRight: 0 }}>Toppings</Subheader>
          {toppings}
        </div>
      );
    }
  }

  render() {
    return (
      <Grid className='mojoMenuDetailsContainer'>
        <Row className='mojoMenuDetailsContent'>
          <Col xs={12} sm={6} md={6} lg={6} style={{ padding: '20px' }}>
            <div className='mojoMenuDetailsImage' style={{ backgroundImage: `url(${this.menuData.imageUrl})` }}>
              {
                this.menuData.isNewMenu
                ? (<img className='mojoMenuNewTagImage' src={newMenuTagImage} />)
                : null
              }
            </div>
          </Col>
          <Col xs={12} sm={6} md={6} lg={6} style={{ padding: '20px' }}>
            <div className='mojoMenuDetailsInfoContainer'>
              <span style={{ fontSize: '28px' }}>
                {`${this.menuData.name} ${this.menuData.chineseName} ($${Number(this.menuData.price).toFixed(1)})`}
              </span>
              <TextField
                className='mojoMenuDetailsInfoMargin'
                floatingLabelText='Enter quantity here'
                hintText='Quantity'
                defaultValue='1'
                errorText={this.state.quantityErrorText}
                onChange={this.handleQuantityTextChange} />
              {this.renderToppings(this.menuData.toppingIds)}
              <TextField
                className='mojoMenuDetailsInfoMargin'
                floatingLabelText='Enter note here'
                hintText='Half sugar, hot or cold, etc'
                onChange={this.handleNoteTextChange} />
              <RaisedButton
                className='addToCartButton'
                primary={true}
                disabled={this.state.addToCartButtonDisabled}
                label={`Add to cart ($${this.state.totalPrice})`}
                onTouchTap={this.handleAddToCartButtonClick} />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    menuDataMap: state.getIn(['loadDataState', 'menuDataMap']),
    toppingDataMap: state.getIn(['loadDataState', 'toppingDataMap'])
  };
}

export default connect(mapStateToProps, { updateAppBar, updateOrderItem, showMessage })(MojoMenuDetails);
