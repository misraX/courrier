import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
// import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import shortid from 'shortid';

const head = {
  id: '#',
  courier: 'Courrier',
  driverName: 'Driver Name',
  status: 'Task status',
  description: 'Task Description',
  startedAt: 'Task start',
  finishedAt: 'Task finish',
  driverComment: 'Driver comment'
};

class List extends React.Component {
  state = {
    tasks: [],
    isLoading: false
  };
  componentDidMount = () => {
    this.setState({ isLoading: true });
    axios
      .get('http://localhost:9000/tasks')
      .then(res => {
        this.setState({ tasks: [...this.state.tasks, ...res.data['tasks']], isLoading: false });
      })
      .catch(err => this.setState({ err }));
  };

  render() {
    const { tasks, isLoading } = this.state;
    return (
      <Table hover>
        <thead className="thead-dark">
          <tr>
            {Object.values(head).map((value, index) => (
              <th key={shortid.generate()}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : tasks ? (
            tasks.map((value, index) => (
              <tr key={shortid.generate()}>
                {Object.keys(head).map(haedKey => (
                  <th key={shortid.generate()}>
                    {haedKey === 'id' && value[haedKey] ? (
                      <Link to={`/tasks/${value[haedKey]}`}>{value[haedKey]}</Link>
                    ) : (
                      value[haedKey]
                    )}
                  </th>
                ))}
              </tr>
            ))
          ) : null}
        </tbody>
      </Table>
    );
  }
}

export default List;
