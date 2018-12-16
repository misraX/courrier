import React from 'react';
import shortid from 'shortid';
import axios from 'axios';
import { detailHead, splitLocation } from '../utils/utils';
import MapDetail from './MapDetail';

/**
 * DetailView.
 *
 * @class Detail
 * @extends {React.Component}
 */
class Detail extends React.Component {
  state = {
    task: {},
    isLoading: false
  };
  componentDidMount = () => {
    const { match } = this.props;
    this.setState({ isLoading: true });
    axios
      .get(`http://localhost:9000/tasks/${match.params.id}`)
      .then(res => {
        this.setState({ task: res.data, isLoading: false });
      })
      .catch(err => this.setState({ err, isLoading: false }));
  };

  render() {
    const { task, isLoading } = this.state;
    return isLoading ? (
      <p>Loading...</p>
    ) : task ? (
      Object.keys(detailHead).map((value, index) =>
        task[value] ? (
          value !== 'fromLocation' ? (
            <p key={shortid.generate()}>{task[value]}</p>
          ) : (
            <MapDetail name="" initialCenter={splitLocation(task[value])} />
          )
        ) : null
      )
    ) : (
      <p>No data.</p>
    );
  }
}

export default Detail;
