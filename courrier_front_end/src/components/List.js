import React from 'react';
import { Table, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import shortid from 'shortid';
import { listHead } from '../utils/utils';

/**
 * ListView.
 *
 * @class List
 * @extends {React.Component}
 */
class List extends React.Component {
  state = {
    tasks: [],
    searchedTask: [],
    isLoading: false,
    order: 'DESC'
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
  fetchWithOrder = value => {
    this.setState({ isLoading: true });
    console.log(value);
    axios
      .get(`http://localhost:9000/tasks?order=${this.state.order}&sort=${value}`)
      .then(res => {
        this.setState({ tasks: res.data['tasks'], isLoading: false });
      })
      .catch(err => this.setState({ err }));
  };
  /**
   * Toggle ordering.
   *
   * @memberof List
   */
  toggleOder = () => {
    this.setState({ order: this.state.order === 'DESC' ? 'ASC' : 'DESC' });
  };

  /**
   * Searching for Driver Name, Courrier, Status.
   *
   * @memberof List
   */
  search = e => {
    const { tasks } = this.state;
    let searchedTask = [];
    if (tasks && e.target.value) {
      searchedTask = tasks.filter(task => {
        let searchStaus = String(task.status).includes(e.target.value);
        let searchDriveName = String(task.driverName).includes(e.target.value);
        let searchCourier = String(task.courier).includes(e.target.value);
        if (searchStaus) {
          return searchStaus;
        }
        if (searchDriveName) {
          return searchDriveName;
        }
        if (searchCourier) {
          return searchCourier;
        }
      });
      this.setState({ searchedTask });
      return;
    } else {
      searchedTask = [];
      this.setState({ searchedTask });
    }
    console.log(searchedTask);
  };
  render() {
    const { isLoading, searchedTask } = this.state;
    let { tasks } = this.state;
    if (searchedTask.length > 0) {
      tasks = searchedTask;
    }
    return (
      <Container>
        <h1 className="task-title">Tasks list</h1>
        <Row>
          <Col md="2">
            <div className="toolbox">
              <span>Oder:</span> <button onClick={this.toggleOder}>{this.state.order}</button>
            </div>
          </Col>
          <Col md="10">
            <div className="toolbox">
              <input
                type="text"
                name="search"
                className="searchbox"
                placeholder="Search: Driver Name or Courrier or Status"
                onChange={this.search}
              />
            </div>
          </Col>
        </Row>

        <Table hover>
          <thead className="thead-dark">
            <tr>
              {Object.keys(listHead).map((value, index) => (
                <th className="list-head" onClick={e => this.fetchWithOrder(value)} key={shortid.generate()}>
                  {listHead[value]}
                </th>
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
                  {Object.keys(listHead).map(haedKey => (
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
      </Container>
    );
  }
}

export default List;
