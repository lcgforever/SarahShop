import Store from '../store';
import { loadAllData } from '../actions/index';

export function loadData() {
  Store.dispatch(loadAllData());
}
