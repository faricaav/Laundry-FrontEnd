import React from 'react';
import Navbar from '../components/Navbar'
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'boxicons'

class Outlet extends React.Component {
  constructor() {
    super();
    this.state = {
      outlet: [],
      isModalOpen: false,
      token: "",
      id_outlet: 0,
      nama: "",
      alamat: "",
      tlp: "",
      search: "",
      action: ""

    }
    this.state.filterOutlet = this.state.outlet

    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "admin") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.name = localStorage.getItem('name')
      } else {
        window.alert("You are not an admin")
        window.location = '/login'
      }
    } else {
      window.location = "/login"
    }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` }
    }
    return header
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFile = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  }

  handleClose = () => {
    this.setState({
      isModalOpen: false
    })
  }

  getOutlet = () => {
    let url = 'http://localhost:8080/outlet/'
    axios.get(url, this.headerConfig())
      .then(res => {
        this.setState({
          outlet: res.data.outlet
        })
        console.log(this.state.outlet)
      })
      .catch(error => {
        console.log(error)
      })
  }

  // findOutlet = (event) => {
  //     if (event.keyCode === 13) {
  //         // menampung data keyword pencarian
  //         let keyword = this.state.search.toLowerCase()
  //         let tempOutlet = this.state.outlet
  //         let result = tempOutlet.filter(item => {
  //             return item.nama.toLowerCase().includes(keyword) || 
  //             item.alamat.toLowerCase().includes(keyword)
  //         })

  //         this.setState({filterOutlet: result})
  //     }
  // }

  handleEdit = (item) => {
    let url = "http://localhost:8080/outlet/" + item.id_outlet
    axios.get(url)
      .then(res => {
        this.setState({
          isModalOpen: true,
          nama: item.nama,
          alamat: item.alamat,
          tlp: item.tlp,
          id_outlet: item.id_outlet,
          action: "update"
        })
      })
      .catch(error => {
        console.log(error)
      })

  }

  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      nama: "",
      alamat: "",
      tlp: "",
      action: "insert"
    })
  }

  handleSave = e => {
    e.preventDefault()
    let form = {
      id_outlet: this.state.id_outlet,
      nama: this.state.nama,
      alamat: this.state.alamat,
      tlp: this.state.tlp
    }
    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:8080/outlet/"
      axios.post(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getOutlet()
          this.handleColse()
        })
        .catch(error => console.log(error))
    } else if (this.state.action === "update") {
      url = "http://localhost:8080/outlet/" + this.state.id_outlet
      axios.put(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getOutlet()
          this.handleColse()
        })
        .catch(error => console.log(error))
    }
    this.setState({
      isModalOpen: false
    })
  }

  Edit = (item) => {
    this.setState({
      isModalOpen: true,
      id_outlet: item.id_outlet,
      nama: item.nama,
      alamat: item.alamat,
      tlp: item.tlp,
      action: "update"
    });
  }

  Drop = (item) => {
    let url = "http://localhost:8080/outlet/" + item.id_outlet
    if (window.confirm("Are you sure to delete this data?")) {
      axios.delete(url, this.headerConfig())
        .then(res => {
          console.log(res.data.message)
          this.getOutlet()
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  componentDidMount() {
    this.getOutlet()
  }



  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-5 px-2"> <br></br>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="display-6"><button className="btn btn-outline-dark btn-sm btn-primary rounded" onClick={() => this.handleAdd()}><box-icon name='plus' color='#ffffff' ></box-icon></button> Data Outlet</span>
                </h4><br></br>
          {/* <div className="row">
            <div className="col-12">
                <input type="text" name="search" value={this.state.search} onChange={e => this.handleChange(e)} onKeyUp={event => this.findOutlet(event)} class="form-control" placeholder="Find Outlet"/>
            </div>
          </div> */}
          <table className="table table-bordered table-hover">
            <thead>
              <tr align="center">
                <th>ID Outlet</th>
                <th>Nama Outlet</th>
                <th>Alamat</th>
                <th>No Telp</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {this.state.outlet.map((item, index) => {
                return (
                  <tr align="center" key={index}>
                    <td>{item.id_outlet}</td>
                    <td>{item.nama}</td>
                    <td>{item.alamat}</td>
                    <td>{item.tlp}</td>
                    <td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary m-1" onClick={() => this.handleEdit(item)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                      </button>
                      <button className="btn btn-sm btn-danger m-1" id="blue" onClick={() => this.Drop(item.id_user)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                       <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                       <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                       </svg>
                      </button>
                    </td>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <br></br>



        </div>

        <Modal aria-labelledby="contained-modal-title-vcenter" centered show={this.state.isModalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Outlet</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="name">
                <Form.Label>Nama Outlet</Form.Label>
                <Form.Control type="text" name="nama" placeholder="Input name"
                  value={this.state.nama} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="address">
                <Form.Label>Alamat</Form.Label>
                <Form.Control type="text" name="alamat" placeholder="Input address"
                  value={this.state.alamat} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="tlp">
                <Form.Label>No Telp</Form.Label>
                <Form.Control type="text" name="tlp" placeholder="Input telp"
                  value={this.state.tlp} onChange={this.handleChange} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" id="blue">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

      </div>
    );
  }
}

export default Outlet;