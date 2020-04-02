import Bootstrap from '../pages/Bootstrap';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import CardCreation from '../pages/CardCreation';
import Subscription from '../pages/Subscription';
import CardDetail from '../pages/CardDetail';
import Filters from '../pages/Filters';
import CardImages from '../pages/CardImages';
import Advanced from '../pages/Advanced';

const routes = {
  loading: Bootstrap,
  login: Login,
  home: Home,
  settings: Settings,
  cardCreation: CardCreation,
  subscription: Subscription,
  detail: CardDetail,
  filters: Filters,
  cardImages: CardImages,
  advanced: Advanced,
};

export default routes;
