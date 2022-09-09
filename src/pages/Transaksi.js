import React, { Component } from "react";
import Navbar from "../components/Navbar";
import NavbarKasir from "../components/NavbarKasir";
import NavbarOwner from "../components/NavbarOwner";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { Badge } from "react-bootstrap";

class Transaksi extends Component {
  constructor() {
    super();
    this.state = {
      transaksi: [],
      outlet: [],
      member: [],
      user: [],
      isModalOpen: false,
      token: "",
      id_transaksi: 0,
      id_outlet: "",
      kode_invoice: "",
      id_member: "",
      tgl: "",
      batas_waktu: "",
      tgl_bayar: "",
      biaya_tambahan: "",
      diskon: "",
      pajak: "",
      status: "",
      dibayar: "",
      id_user: "",
      search: "",
      userName: "",
      action: "",
      nama_outlet: "",
      nama_member: "",
      username: "",
      idOutlet: 0,
    };
    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "admin" ||
        localStorage.getItem("role") === "kasir"
      ) {
        this.state.role = localStorage.getItem("role");
        this.state.token = localStorage.getItem("token");
        this.state.userName = localStorage.getItem("name");
        this.state.nama_outlet = localStorage.getItem("outlet");
        this.state.id_outlet = localStorage.getItem("id_outlet");
        this.state.id_transaksi = localStorage.getItem("id_transaksi");
      } else {
        window.alert("You are not an admin/kasir");
        window.location = "/login";
      }
    } else {
      window.location = "/login";
    }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  getTransaksi = () => {
    let url =
      "http://localhost:8080/transaksi/getByOut/" + this.state.id_outlet;
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          transaksi: res.data.transaksi,
        });
        console.log(this.state.transaksi);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getOutlet = async () => {
    let url = "http://localhost:8080/outlet/";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          outlet: res.data.outlet,
        });
        console.log(this.state.outlet);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getMember = async () => {
    let url = "http://localhost:8080/member/";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          member: res.data.member,
        });
        console.log(this.state.member);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUser = async () => {
    let url = "http://localhost:8080/user/";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          user: res.data.user,
        });
        console.log(this.state.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleEdit = (item) => {
    this.setState({
      isModalOpen: true,
      id_transaksi: item.id_transaksi,
      status: item.status,
      action: "update",
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    let form = {
      id_transaksi: this.state.id_transaksi,
      status: this.state.status,
    };
    let url = "";
    if (this.state.action === "update") {
      url = "http://localhost:8080/transaksi/" + this.state.id_transaksi;
      axios
        .put(url, form, this.headerConfig())
        .then((res) => {
          this.getTransaksi();
          this.handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  Drop = (item) => {
    let url = "http://localhost:8080/transaksi/" + item.id_transaksi;
    if (window.confirm("Are you sure to delete this data?")) {
      axios
        .delete(url, this.headerConfig())
        .then((res) => {
          console.log(res.data.message);
          this.getTransaksi();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  Detail = (id_transaksi) => {
    window.location =
      "/detail_transaksi/byTransaksi/" +
      id_transaksi +
      "/" +
      this.state.id_outlet;
    localStorage.setItem("id_transaksi", id_transaksi);
  };

  componentDidMount() {
    this.getTransaksi();
    this.getOutlet();
    this.getMember();
    this.getUser();
  }

  render() {
    // const total=(this.state.transaksi.total.reduce((total,currentItem) =>  total = total + currentItem.salary , 0 ));
    return (
      <div>
        {this.state.role === "owner" && <NavbarOwner />}
        {this.state.role === "admin" && <Navbar />}
        {this.state.role === "kasir" && <NavbarKasir />}
        <div className="container mt-5">
          {" "}
          <br></br>
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="display-6">Data Transaksi</span>
          </h4>
          <br></br>
          <table className="table table-bordered table-hover">
            <thead>
              <tr align="center">
                <th className='min-w-50px'>Kode Invoice</th>
                <th>Nama Outlet</th>
                <th>Nama Member</th>
                <th>Tgl Pesan</th>
                <th>Batas Waktu</th>
                <th>Tgl Bayar</th>
                <th>Status</th>
                <th>Pembayaran</th>
                <th>Total</th>
                <th className='min-w-200px'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {this.state.transaksi.map((item, index) => {
                return (
                  <tr align="center" key={index}>
                    <td>{item.kode_invoice}</td>
                    <td>{item.outlet.nama}</td>
                    <td>{item.member.nama}</td>
                    <td>{item.tgl}</td>
                    <td>{item.batas_waktu}</td>
                    <td>{item.tgl_bayar === null && "-"}{item.tgl_bayar!=null && item.tgl_bayar}</td>
                    <td>
                      {item.status === "baru" && (
                        <Badge bg="danger">{item.status}</Badge>
                      )}
                      {item.status === "proses" && (
                        <Badge bg="warning">{item.status}</Badge>
                      )}
                      {item.status === "selesai" && (
                        <Badge bg="info">{item.status}</Badge>
                      )}
                      {item.status === "diambil" && (
                        <Badge bg="success">{item.status}</Badge>
                      )}
                    </td>
                    <td>{item.dibayar}</td>
                    <td>Rp. {item.total}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary m-1"
                        onClick={() => this.handleEdit(item)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </button>
                      <button
                        className="btn btn-sm btn-danger m-1"
                        id="blue"
                        onClick={() => this.Drop(item.id_user)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </button>
                      <button
                        className="btn btn-sm btn-primary m-1"
                        onClick={() => this.Detail(item.id_transaksi)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.isModalOpen}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Transaksi</Modal.Title>
          </Modal.Header>
          <Form onSubmit={(e) => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  type="text"
                  name="status"
                  onChange={this.handleChange}
                >
                  <option value={this.state.status}>{this.state.status}</option>
                  <option value="baru">baru</option>
                  <option value="proses">proses</option>
                  <option value="selesai">selesai</option>
                  <option value="diambil">diambil</option>
                </Form.Select>
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

export default Transaksi;
