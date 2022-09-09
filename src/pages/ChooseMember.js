import React from 'react';
import Navbar from '../components/Navbar'
import axios from 'axios';

class ChooseMember extends React.Component {
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
      isModalPw: false,
      action: ""

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "admin" || localStorage.getItem('role') === "kasir") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.id_member = localStorage.getItem('id_member')
      } else {
        window.alert("You are not an admin")
        window.location = '/login'
      }
    } else {
      window.location = "/login"
    }
  }

  handleChoose = (item) => {
    let confirmAction = window.confirm("Choose " + item.nama + " ?")
      if (confirmAction) {
        localStorage.setItem("id_member", item.id_member);
        localStorage.setItem("nama_member", item.nama);
        localStorage.setItem("alamat_member", item.alamat);
        localStorage.setItem("jenis_kelamin", item.jenis_kelamin);
        localStorage.setItem("tlp_member", item.tlp);
        if (localStorage.getItem('role') === "admin"){
          window.location = '/paket'
        } if (localStorage.getItem('role') === "kasir"){
          window.location = '/choosePaket'
        } 
        
      } else {
        alert("Canceled to choose member");
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
      isModalOpen: false,
      isModalPw: false,
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

  componentDidMount() {
    this.getMember()
  }



  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-5"> <br></br>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="display-6">Pilih Member</span>
                </h4><br></br>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>ID Member</th>
                <th>Nama Member</th>
                <th>Alamat</th>
                <th>Jenis Kelamin</th>
                <th>No Telp</th>

              </tr>
            </thead>
            <tbody>
              {this.state.member.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id_member}</td>
                    <td>{item.nama}</td>
                    <td>{item.alamat}</td>
                    <td>{item.jenis_kelamin}</td>
                    <td>{item.tlp}</td>
                    <td>
                      <button className="btn btn-sm btn-primary m-1" onClick={() => this.handleChoose(item)}>Pilih</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <br></br>



        </div>
      </div>
    );
  }
}

export default ChooseMember;