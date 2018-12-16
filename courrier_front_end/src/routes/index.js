import React from 'react';
import { Route } from 'react-router';
import List from '../components/List';
import Detail from '../components/Detail';

export default [
  <Route exact path="/tasks" component={List} key="tasks-list" />,
  <Route exact path="/tasks/:id" component={Detail} key="tasks-detail" />
];
