import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import Register from './screens/RegisterScreen';
import Login from './screens/LoginScreen';
import ProductsListScreen from './screens/products/ProductsListScreen';

import './bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className='py-3'>
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/products' component={ProductsListScreen} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
