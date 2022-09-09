import React from 'react';
import Navbar from '../components/Navbar'
import NavbarKasir from '../components/NavbarKasir';
import NavbarOwner from '../components/NavbarOwner';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

class Member extends React.Component {
  constructor() {
    super();
    this.state = {
      member: [],
      isModalOpen: false,
      token: "",
      id_member: 0,
      nama: "",
      alamat: "",
      jenis_kelamin: "",
      tlp: "",
      search: "",
      action: ""

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "admin" || localStorage.getItem('role') === "kasir") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.userName = localStorage.getItem('name')
      } else {
        window.alert("You are not an admin")
        window.location = '/login'
      }
    } 
    else {
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

  handleClose = () => {
    this.setState({
      isModalOpen: false
    })
  }

  getMember = () => {
    let url = 'http://localhost:8080/member/'
    axios.get(url, this.headerConfig())
      .then(res => {
        this.setState({
          member: res.data.member
        })
        console.log(this.state.member)
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleEdit = (item) => {
    let url = "http://localhost:8080/member/" + item.id_member
    axios.get(url, this.headerConfig())
      .then(res => {
        this.setState({
          isModalOpen: true,
          nama: item.nama,
          alamat: item.alamat,
          jenis_kelamin: "",
          tlp: item.tlp,
          id_member: item.id_member,
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
      jenis_kelamin: "",
      tlp: "",
      action: "insert"
    })
  }

  handleSave = e => {
    e.preventDefault()
    let form = {
      id_member: this.state.id_member,
      nama: this.state.nama,
      alamat: this.state.alamat,
      jenis_kelamin: this.state.jenis_kelamin,
      tlp: this.state.tlp
    }
    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:8080/member/"
      axios.post(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getMember()
          this.handleColse()
        })
        .catch(error => console.log(error))
    } else if (this.state.action === "update") {
      url = "http://localhost:8080/member/" + this.state.id_member
      axios.put(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getMember()
          this.handleColse()
        })
        .catch(error => console.log(error))
    }
    this.setState({
      isModalOpen: false
    })
  }

  Drop = (item) => {
    let url = "http://localhost:8080/member/" + item.id_member
    if (window.confirm("Are you sure to delete this data?")) {
      axios.delete(url, this.headerConfig())
        .then(res => {
          console.log(res.data.message)
          this.getMember()
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  componentDidMount() {
    this.getMember()
  }



  render() {
    return (
      <div>
        {this.state.role == "owner" &&
                                    <NavbarOwner />
                                }
                                {this.state.role == "admin" &&
                                    <Navbar />
                                }
                                {this.state.role == "kasir" &&
                                    <NavbarKasir />
                                }
        <div className="container mt-5 px-2"> <br></br>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="display-6"><button className="btn btn-outline-dark btn-sm btn-primary rounded" onClick={() => this.handleAdd()}><box-icon name='plus' color='#ffffff' ></box-icon></button> Data Member</span>
                </h4><br></br>
            {/* <div className="col-6 md-5">
                <input type="text" name="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findMember} class="form-control form-input" placeholder="Find Member"/>
            </div> */}
          <table className="table table-bordered table-hover">
            <thead>
              <tr align="center">
                <th>ID Member</th>
                <th>Nama Member</th>
                <th>Alamat</th>
                <th>Jenis Kelamin</th>
                <th>No Telp</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {this.state.member.map((item, index) => {
                return (
                  <tr align="center" key={index}>
                    <td>{item.id_member}</td>
                    <td>{item.nama}</td>
                    <td>{item.alamat}</td>
                    <td>{item.jenis_kelamin}</td>
                    <td>{item.tlp}</td>
                    <td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary m-1" onClick={() => this.handleEdit(item)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                      </button>
                      <button className="btn btn-sm btn-danger m-1" id="blue" onClick={() => this.Drop(item)}>
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
            <Modal.Title>Member</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="name">
                <Form.Label>Nama Member</Form.Label>
                <Form.Control type="text" name="nama" placeholder="Input name"
                  value={this.state.nama} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="address">
                <Form.Label>Alamat</Form.Label>
                <Form.Control type="text" name="alamat" placeholder="Input address"
                  value={this.state.alamat} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="gender">
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select type="text" name="jenis_kelamin" onChange={this.handleChange} >
                  <option value={this.state.jenis_kelamin}>{this.state.jenis_kelamin}</option>
                  <option value="L">Laki-Laki</option>
                  <option value="P">Perempuan</option>
                </Form.Select>
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

export default Member;