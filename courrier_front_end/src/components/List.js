import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
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

class List extends Component {
  state = {
    tasks: []
  };
  componentDidMount = () => {
    axios.get('http://localhost:9000/tasks').then(res => {
      this.setState({ tasks: [...this.state.tasks, ...res.data['tasks']] });
    });
  };

  render() {
    const { tasks } = this.state;
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
          {tasks
            ? tasks.map((value, index) => (
                <tr key={shortid.generate()}>
                  {Object.keys(head).map(haedKey => {
                    if (haedKey === 'status' && value[haedKey] === 'pending') {
                      return (
                        <th key={shortid.generate()}>
                          {value[haedKey]}
                          <Formik
                            initialValues={{ status: 'completed' }}
                            onSubmit={(values, actions) => {
                              setTimeout(() => {
                                // alert(JSON.stringify(values, null, 2));
                                console.log(values);
                                actions.setSubmitting(false);
                              }, 1000);
                            }}
                            render={props => (
                              <Form>
                                <Field name="status">
                                  {({ field, form, setFieldValue }) => {
                                    return (
                                      <select
                                        {...field}
                                        name="status"
                                        value={props.values.status}
                                        onChange={e => {
                                          field.onChange(e);
                                        }}
                                      >
                                        <option value="completed">completed</option>
                                        <option value="failed">failed</option>
                                      </select>
                                    );
                                  }}
                                </Field>
                                <button type="submit">Submit</button>
                              </Form>
                            )}
                          />
                        </th>
                      );
                    }
                    return <th key={shortid.generate()}>{value[haedKey]}</th>;
                  })}
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  }
}

export default List;
