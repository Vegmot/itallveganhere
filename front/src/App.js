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
import EditPostForm from './screens/posts/EditPostForm';
// Profiles
import ProfileForm from './screens/profiles/ProfileForm';
import ProfileScreen from './screens/profiles/ProfileScreen';
// Users
import UserInfo from './screens/users/UserInfo';
// Cart
import CartScreen from './screens/carts/CartScreen';
// Orders
import MyOrdersListScreen from './screens/orders/MyOrdersListScreen';
import ShippingScreen from './screens/orders/ShippingScreen';
import PaymentScreen from './screens/orders/PaymentScreen';
import PlaceOrderScreen from './screens/orders/PlaceOrderScreen';
import OrderDetailsScreen from './screens/orders/OrderDetailsScreen';
// Premiums
import PremiumPackagesListScreen from './screens/premiums/PremiumPackagesListScreen';
import PremiumPackageOrderScreen from './screens/premiums/PremiumPackageOrderScreen';
// Admin
import AdminOrdersListScreen from './screens/admin/AdminOrdersListScreen';
import AdminOrderDetailsScreen from './screens/admin/AdminOrderDetailsScreen';
import AdminUsersListScreen from './screens/admin/AdminUsersListScreen';
import AdminProductsListScreen from './screens/admin/AdminProductsListScreen';
import AdminCreateUpdateProductScreen from './screens/admin/AdminCreateUpdateProductScreen';
import AdminUserEditScreen from './screens/admin/AdminUserEditScreen';

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
                <Route exact path='/shipping' component={ShippingScreen} />
                <Route exact path='/payment' component={PaymentScreen} />
                <Route exact path='/placeorder' component={PlaceOrderScreen} />
                <Route exact path='/order/:id' component={OrderDetailsScreen} />
                <Route
                  exact
                  path='/profile/profile-form'
                  component={ProfileForm}
                />
                <Route exact path='/profile' component={ProfileScreen} />
                <Route exact path='/posts/edit/:id' component={EditPostForm} />
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
                  path='/premiums/:id/order'
                  component={PremiumPackageOrderScreen}
                />
                <Route
                  exact
                  path='/premiums'
                  component={PremiumPackagesListScreen}
                />
                <Route exact path='/posts' component={PostsHomeScreen} />
                <Route
                  exact
                  path='/admin/users/:id/userInfo'
                  component={AdminUserEditScreen}
                />
                <Route
                  exact
                  path='/admin/users'
                  component={AdminUsersListScreen}
                />
                <Route
                  exact
                  path='/admin/products/page/:pageNumber'
                  component={AdminProductsListScreen}
                />
                <Route
                  exact
                  path='/admin/products/:id/create-update/'
                  component={AdminCreateUpdateProductScreen}
                />
                <Route
                  exact
                  path='/admin/products'
                  component={AdminProductsListScreen}
                />
                <Route
                  exact
                  path='/admin/order/:id'
                  component={AdminOrderDetailsScreen}
                />
                <Route
                  exact
                  path='/admin/orders'
                  component={AdminOrdersListScreen}
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
