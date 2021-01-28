import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import ScrollToTop from './components/ScrollToTop';
import HomeScreen from './screens/HomeScreen';
import Register from './screens/RegisterScreen';
import Login from './screens/LoginScreen';
// Products
import ProductsHomeScreen from './screens/products/ProductsHomeScreen';
import ProductItemScreen from './screens/products/ProductItemScreen';
// Posts
import PostsHomeScreen from './screens/posts/PostsHomeScreen';
import PostItemScreen from './screens/posts/PostItemScreen';
import PostForm from './screens/posts/PostForm';
// Profiles
import ProfileForm from './screens/profiles/ProfileForm';
import ProfileScreen from './screens/profiles/ProfileScreen';
// Users
import UserInfo from './screens/users/UserInfo';
// Cart
import CartScreen from './screens/carts/CartScreen';
// Orders
import MyOrdersListScreen from './screens/orders/MyOrdersListScreen';
// Premiums
import PremiumPackagesListScreen from './screens/premiums/PremiumPackagesListScreen';
// Admin
import AdminOrdersListScreen from './screens/admin/AdminOrdersListScreen';
import AdminUsersListScreen from './screens/admin/AdminUsersListScreen';

import './bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <ScrollToTop>
              <Switch>
                <Route exact path='/myorders' component={MyOrdersListScreen} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/userInfo' component={UserInfo} />
                <Route exact path='/cart/:id?' component={CartScreen} />
                <Route
                  exact
                  path='/profile/profile-form'
                  component={ProfileForm}
                />
                <Route exact path='/profile' component={ProfileScreen} />
                <Route exact path='/posts/post-form' component={PostForm} />
                <Route
                  exact
                  path='/products/search/:keyword/page/:pageNumber'
                  component={ProductsHomeScreen}
                />
                <Route
                  exact
                  path='/products/search/:keyword'
                  component={ProductsHomeScreen}
                />
                <Route
                  exact
                  path='/products/page/:pageNumber'
                  component={ProductsHomeScreen}
                />
                <Route exact path='/posts/:id' component={PostItemScreen} />
                <Route
                  exact
                  path='/posts/search/:keyword/postsPage/:pageNumber'
                  component={PostsHomeScreen}
                />
                <Route
                  exact
                  path='/posts/search/:keyword'
                  component={PostsHomeScreen}
                />
                <Route
                  exact
                  path='/posts/postsPage/:pageNumber'
                  component={PostsHomeScreen}
                />
                <Route
                  exact
                  path='/products/:id'
                  component={ProductItemScreen}
                />
                <Route exact path='/products' component={ProductsHomeScreen} />
                <Route
                  exact
                  path='/premiums'
                  component={PremiumPackagesListScreen}
                />
                <Route exact path='/posts' component={PostsHomeScreen} />
                <Route
                  exact
                  path='/admin/users'
                  component={AdminUsersListScreen}
                />
                <Route exact path='/' component={HomeScreen} />
                <Route component={NotFound} />
              </Switch>
            </ScrollToTop>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
