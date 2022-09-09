import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';


class Paket extends Component {
  constructor() {
    super();
    this.state = {
      paket: [],
      isModalOpen: false,
      token: "",
      id_paket: 0,
      id_member: 0,
      nama: "",
      alamat: "",
      tlp: "",
      jenis_kelamin: "",
      image: "",
      search: "",
      nama: "",
      action: "",
      nama_outlet: "",
      id_outlet: 0

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "admin") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.nama = localStorage.getItem('name')
        this.state.nama_outlet = localStorage.getItem('outlet')
        this.state.id_outlet = localStorage.getItem('id_outlet')
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

  handleChoose = (selectedItem) => {
    if (localStorage.getItem("id_member") !== null) {
      let tempCart = []

      if (localStorage.getItem("cart") !== null) {
        tempCart = JSON.parse(localStorage.getItem("cart"))
        // JSON.parse() digunakan untuk mengonversi dari string -> array object
      }

      // cek data yang dipilih user ke keranjang belanja
      let existItem = tempCart.find(item => item.id_paket === selectedItem.id_paket)
      if (existItem) {
        // jika item yang dipilih ada pada keranjang belanja
        window.alert(`You have choose ${selectedItem.nama_paket} package`)
      }
      else {
        // user diminta memasukkan jumlah item yang dibeli
        let promptJumlah = window.prompt(`Input qty ${selectedItem.nama_paket} `, "")
        if (promptJumlah !== null && promptJumlah !== "") {
          // jika user memasukkan jumlah item yang dibeli
          // menambahkan properti "jumlahBeli" pada item yang dipilih
          selectedItem.qty = promptJumlah
          selectedItem.subtotal = promptJumlah * selectedItem.harga
          // masukkan item yang dipilih ke dalam cart
          tempCart.push(selectedItem)
          // simpan array tempCart ke localStorage
          localStorage.setItem("cart", JSON.stringify(tempCart))
        }
      }



    } else {
      window.location = '/choosemember'
    }
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
      isModalOpen: false,
    })
  }

  getPaket = () => {
    let url = "http://localhost:8080/paket/byOutlet/" + this.state.id_outlet
    axios.get(url)
      .then(res => {
        this.setState({
          paket: res.data.paket
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      id_outlet: this.state.id_outlet,
      jenis: "",
      image: null,
      harga: 0,
      nama_paket: "",
      action: "insert"
    })
  }

  handleEdit = (item) => {
    this.setState({
      isModalOpen: true,
      id_paket: item.id_paket,
      id_outlet: item.id_outlet,
      jenis: "",
      image: item.image,
      harga: item.harga,
      nama_paket: item.nama_paket,
      action: "update"
    })
  }

  handleSave = (e) => {
    e.preventDefault()
    let form = new FormData()

    form.append("id_paket", this.state.id_paket)
    form.append("nama_paket", this.state.nama_paket)
    form.append("image", this.state.image)
    form.append("id_outlet", this.state.id_outlet)
    form.append("harga", this.state.harga)
    form.append("jenis", this.state.jenis)

    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:8080/paket/"
      axios.post(url, form, this.headerConfig())
        .then(res => {
          this.getPaket()
          this.handleClose()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      url = "http://localhost:8080/paket/" + this.state.id_paket
      axios.put(url, form, this.headerConfig())
        .then(res => {
          this.getPacket()
          this.handleClose()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  Drop = (id) => {
    let url = "http://localhost:8080/paket/" + id
    if (window.confirm("Are you sure to delete this data?")) {
      axios.delete(url, this.headerConfig())
        .then(res => {
          console.log(res.data.message)
          this.getPaket()
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  handleChoose = (selectedItem) =>{
    if(localStorage.getItem("id_member") !== null){
      let tempCart = []

      if(localStorage.getItem("cart") !== null){
        tempCart = JSON.parse(localStorage.getItem("cart"))
        // JSON.parse() digunakan untuk mengonversi dari string -> array object
      }

       // cek data yang dipilih user ke keranjang belanja
       let existItem = tempCart.find(item => item.id_paket === selectedItem.id_paket)
       if (existItem) {
           // jika item yang dipilih ada pada keranjang belanja
           window.alert(`You have choose ${selectedItem.nama_paket} package`)
       }
       else {
         window.location="/cart"
           // user diminta memasukkan jumlah item yang dibeli
           let promptJumlah = window.prompt(`Input qty ${selectedItem.nama_paket} `, "")
           if (promptJumlah !== null && promptJumlah !== "") {
               // jika user memasukkan jumlah item yang dibeli
               // menambahkan properti "jumlahBeli" pada item yang dipilih
               selectedItem.qty = promptJumlah
               // masukkan item yang dipilih ke dalam cart
               tempCart.push(selectedItem)
               // simpan array tempCart ke localStorage
               localStorage.setItem("cart", JSON.stringify(tempCart))
           }
       }
    }else{
      window.location = '/choosemember'
    }
  }

  componentDidMount() {
    this.getPaket()
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-5 px-2"> <br></br>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="display-6"><button className="btn btn-outline-dark btn-sm btn-primary rounded" onClick={() => this.handleAdd()}><box-icon name='plus' color='#ffffff' ></box-icon></button> Data Paket</span>
                </h4>
          <div className="row">
            {this.state.paket.map((item, index) => (
              <Card
                key={index}
                nama_paket={item.nama_paket}
                jenis={item.jenis}
                harga={item.harga}
                outlet={item.outlet.nama}
                image={"http://localhost:8080/image/" + item.image}
                onEdit={() => this.handleEdit(item)}
                onDrop={() => this.Drop(item.id_paket)}
                onChoose={() => this.handleChoose(item)}
              // onCart={() => this.addToCart(item)}
              />
            ))}
          </div>
        </div>
        <Modal show={this.state.isModalOpen} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Paket</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="name">
                <Form.Label>Nama Paket</Form.Label>
                <Form.Control type="text" name="nama_paket" placeholder="Input package name"
                  value={this.state.nama_paket} onChange={this.handleChange} required/>
              </Form.Group>
              <Form.Group className="mb-2" controlId="price">
                <Form.Label>Harga</Form.Label>
                <Form.Control type="text" name="harga" placeholder="Input price"
                  value={this.state.harga} onChange={this.handleChange} required/>
              </Form.Group>
              <Form.Group className="mb-2" controlId="gender">
                <Form.Label>Jenis</Form.Label>
                <Form.Select type="text" name="jenis" onChange={this.handleChange} >
                  <option value={this.state.jenis}>{this.state.jenis}</option>
                  <option value="kiloan">Kiloan</option>
                  <option value="selimut">Selimut</option>
                  <option value="kaos">Kaos</option>
                  <option value="bed cover">Bed Cover</option>
                  <option value="lain">Lain</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2" controlId="image">
                <Form.Label>Foto</Form.Label>
                <Form.Control type="file" name="image" placeholder="Input image"
                  onChange={this.handleFile} />
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

export default Paket;