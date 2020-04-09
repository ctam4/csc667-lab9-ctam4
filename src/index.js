import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { setActiveUsers } from './redux/actions/userActions';
import { updateNotes } from './redux/actions/notesActions';

const ws = new WebSocket('ws://' + ('penguin.linux.test' || window.location.hostname) + ':4000');
const store = createStore(rootReducer);

ws.onclose = () => {
  console.log('Connection closed'); // server goes down
};

ws.onmessage = (message) => { // incoming from server
  console.log(message);
  const messageObject = JSON.parse(message.data); // extracted and parsed data
  console.log(messageObject);
  switch (messageObject.type) {
    case 'UPDATE_USER_COUNT':
      // handle if message type is update user
      store.dispatch(setActiveUsers(messageObject.count));
      break;
    case 'UPDATE_MESSAGES':
      store.dispatch(updateNotes(messageObject.notes));
    default:
      console.log('Message type not supported');
  }
};

ws.onerror = (e) => {
  // can if time out or internet drops too
  console.log('Connection closed with error'); // server goes down with error
};

ws.onopen = () => {
  console.log('Connection opened');
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App ws={ws} />
    </Router>
  </Provider>
  ,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
