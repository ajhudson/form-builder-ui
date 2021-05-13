import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import BootstrapAlerts from './components/bootstrap-examples/bootstrap-alerts';
import RenderDynamicForm from './components/form-renderer/render-dynamic-form';
import Home from './components/home/home';
import Test from './components/test/test';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/test" component={Test} />
      <Route path="/bootstrap-alerts" component={BootstrapAlerts} />
      <Route path="/render-form" component={RenderDynamicForm} />
    </Router>
  );
}

export default App;
