import Bootstrap from '../pages/Bootstrap';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import Acknowledgements from '../pages/Acknowledgements';
import CardCreation from '../pages/CardCreation';
import Subscription from '../pages/Subscription';
import CardDetail from '../pages/CardDetail';
import Filters from '../pages/Filters';

const routes = {
  loading: Bootstrap,
  login: Login,
  home: Home,
  settings: Settings,
  acknowledgements: Acknowledgements,
  cardCreation: CardCreation,
  subscription: Subscription,
  detail: CardDetail,
  filters: Filters,
};

export default routes;
