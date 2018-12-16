import React, { Component } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import PropTypes from 'prop-types';

class StatusForm extends Component {
  state = {
    isLoading: false
  };
  static propTypes = {
    updateData: PropTypes.func,
    data: PropTypes.object
  };

  render() {
    const { isLoading } = this.state;
    const { data, updateData } = this.props;
    return (
      <Formik
        initialValues={{ status: 'completed' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            this.setState({ isLoading: true });
            axios
              .put(`http://localhost:9000/tasks/${data.id}`, { ...values })
              .then(res => {
                this.setState({ isLoading: false });
                updateData(res.data);
              })
              .catch(err => this.setState({ err }));
            actions.setSubmitting(false);
          }, 200);
        }}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            Update Status:
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <React.Fragment>
                <select
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.status}
                  name="status"
                >
                  <option value="completed">completed</option>
                  <option value="failed">failed</option>
                </select>
                {props.errors.status && <div id="feedback">{props.errors.status}</div>}
                <button type="submit">Submit</button>
              </React.Fragment>
            )}
          </form>
        )}
      />
    );
  }
}

export default StatusForm;
