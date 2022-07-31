import './App.css';
import React from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';
import { useMediaQuery } from 'react-responsive';

function App() {

  const [{ user }, dispatch] = useStateValue();
  const isMobile = useMediaQuery({
    query: '(max-device-width: 768px)'
  });
  return (
    <div className="app">
      {!isMobile ? <div>
      {!user? (
        <h1><Login /></h1>
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId"><Chat /></Route>
              <Route path="/"><Chat /></Route>
            </Switch>
          </Router>
        </div>
      )}
      </div>

      :
      <div>
      {!user? (
        <h1><Login /></h1>
      ) : (
        <div className="app_body">
          <Router>
          
            <Switch>
            <Route path="/" exact >
              <Sidebar />
                {/* <Chat /> */}
              </Route>
              <Route exact path="/rooms/:roomId">
                <Chat />
              </Route>
              
            </Switch>
          </Router>
        </div>
      )}
      </div>

      }
      
    </div>
  );
}

export default App;
