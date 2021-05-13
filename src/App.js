import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import BootstrapAlerts from './components/bootstrap-examples/bootstrap-alerts';
import Home from './components/home/home';
import Test from './components/test/test';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/test" component={Test} />
      <Route path="/bootstrap-alerts" component={BootstrapAlerts} />
    </Router>
  );
}

export default App;
