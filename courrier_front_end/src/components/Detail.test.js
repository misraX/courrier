import React from 'react';
import ReactDOM from 'react-dom';
import Detail from './Detail';

it('renders Details without crashing', () => {
  const div = document.createElement('div');
  let match = {
    params: {
      id: 2
    }
  };
  ReactDOM.render(<Detail match={match} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
