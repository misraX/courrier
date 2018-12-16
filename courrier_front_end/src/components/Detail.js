import React from 'react';
import shortid from 'shortid';
import axios from 'axios';

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
    // console.log(task)
    return isLoading ? (
      <p>Loading...</p>
    ) : task ? (
      Object.values(task).map((value, index) => <p key={shortid.generate()}>{value}</p>)
    ) : (
      <p>No data.</p>
    );
  }
}

export default Detail;
