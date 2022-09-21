import { Component } from 'react';
import './App.css';
import './Assets/css/style.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      notes: "",
      create_date: "",
      create_time: "",
      idSelected: null,
      formStatus: "",
    }
  }

  componentDidMount() {
    let appid = "63287f270581750298f308bf"
    let url = `https://io.etter.cloud//v4/select_all/token/632411e20581750298f3078c/project/to_do_list_app/collection/to_do_list/appid/${appid}/to_do_list`
    axios.get(url)
      .then(response => {
        this.setState({
          lists: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  loadData = () => {
    let appid = "63287f270581750298f308bf"
    let url = `https://io.etter.cloud//v4/select_all/token/632411e20581750298f3078c/project/to_do_list_app/collection/to_do_list/appid/${appid}/to_do_list`
    axios.get(url)
      .then(response => {
        this.setState({
          lists: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({
      notes: "",
      create_date: "",
      create_time: "",
    })
    let url = ""
    let payload = {}
    if (this.state.formStatus === "") {
      url = "https://io.etter.cloud/v4/insert/"
      payload = {
        token: "632411e20581750298f3078c",
        project: "to_do_list_app",
        collection: "to_do_list",
        appid: "63287f270581750298f308bf",
        notes: this.state.notes,
        create_date: this.state.create_date,
        create_time: this.state.create_time
      }
      this.addButton(url, payload)
    }
    if (this.state.formStatus === "Edit") {
      url = "https://io.etter.cloud/v4/update_id"
      let payload = {
        update_field: "notes~create_date~create_time",
        update_value: this.state.notes + "~" + this.state.create_date + "~" + this.state.create_time,
        token: "632411e20581750298f3078c",
        project: "to_do_list_app",
        collection: "to_do_list",
        appid: "63287f270581750298f308bf",
        id: this.state.idSelected
      }
      this.editButton(url, payload)
    }
  }

  addButton = (url, payload) => {
    axios.post(url, payload)
      .then(response => {
        this.loadData();
      })
      .catch(error => {
        console.log(error)
      })
  }

  editButtonHandler = (list) => {
    this.setState({
      notes: list.notes,
      create_date: list.create_date,
      create_time: list.create_time,
      idSelected: list._id,
      formStatus: "Edit"
    })
  }

  editButton = (url, payload) => {
    axios.post(url, payload)
      .then(response => {
        this.loadData()
      })
      .catch(error => {
        console.log("error")
      })
  }

  deleteButtonHandler = (list) => {
    let id = list._id;
    let appid = "63287f270581750298f308bf";
    let url = `https://io.etter.cloud/v4/remove_id/token/632411e20581750298f3078c/project/to_do_list_app/collection/to_do_list/appid/${appid}/id/${id}/to_do_list`
    let payload = {
      token: "632411e20581750298f3078c",
      project: "to_do_list_app",
      collection: "to_do_list",
      appid: appid,
      id: id
    }

    axios.delete(url, payload)
      .then(response => {
        let lists = [...this.state.lists]
        this.loadData()
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="container">
        {/* Header Website */}
        {/* <div className='header'>
          <h1>To Do List</h1>
        </div> */}
        {/* Header Website End*/}

        {/*Body Website  */}
        <div className='form-wrapper'>
          <div class="card card-form">
            <h2>To Do List</h2>
            <div class="card-form">
              <form onSubmit={this.onSubmitHandler}>
                <div className="form-group boxed mt-2">
                  <div className="input-wrapper">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="What are you gonna do?"
                      name='notes'
                      onChange={this.onChangeHandler}
                      value={this.state.notes} />
                  </div>
                </div>
                <div className="form-group boxed mt-2">
                  <div className="input-wrapper">
                    <input
                      type="time"
                      className="form-control"
                      name='create_time'
                      onChange={this.onChangeHandler}
                      value={this.state.create_time} />
                  </div>
                </div>
                <div className="form-group boxed mt-2">
                  <div className="input-wrapper">
                    <input
                      type="date"
                      className="form-control"
                      name='create_date'
                      onChange={this.onChangeHandler}
                      value={this.state.create_date} />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary shadowed mt-3">Add
                </button>
              </form>
            </div>

            <div className='list-wrapper'>
              <h2>Your List</h2>
              <div className='card-list'>
                <div className='list-wrapper'>
                  {this.state.lists.map(list => {
                    return (
                      <ul className="listview link-listview" key={list._id}>
                        <li>
                          <a className='p-2'>
                            {list.notes}  |  {list.create_time}  |  {list.create_date}
                            <div className='icon-wrapper'>
                              <span onClick={() => this.editButtonHandler(list)} className="badge badge-primary">
                                <ion-icon name="create-outline"></ion-icon>
                              </span>
                              <span onClick={() => this.deleteButtonHandler(list)} className="badge badge-danger">
                                <ion-icon name="trash-outline"></ion-icon>
                              </span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      // body website end
    )
  }
}

export default App;
