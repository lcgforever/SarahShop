import React from 'react';
import App from '../components/app';
import { Route, IndexRoute, Redirect } from 'react-router';
import { loadData } from './routes_callback';
import ProductList from '../containers/product_list';
import ProductDetails from '../containers/product_details';

export default (
  <Route path='/' component={App} onEnter={loadData()}>
    <IndexRoute component={ProductList} />
    <Route path='product/:productId' component={ProductDetails} />
    <Redirect from='*' to='/' />
  </Route>
)
