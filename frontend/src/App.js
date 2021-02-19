import {Container} from 'reactstrap'
import routes from './routes'
import './App.css';
import Routes from './routes';


function App() {
  return (
    <Container>
      <h1>Sport's App</h1>
      <div className="content">
        <Routes/>
      </div>
    </Container>
  );
}

export default App;
