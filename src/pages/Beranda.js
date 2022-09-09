import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import Navbar from '../components/Navbar';
import NavbarOwner from '../components/NavbarOwner';
import NavbarKasir from '../components/NavbarKasir';

class Beranda extends React.Component {
    constructor() {
        super()
        this.state = {
          token: "",
          name: "",
          userId: 0,
          role: ""
        }
    
        if (localStorage.getItem('token')) {
          // if (localStorage.getItem('role') === "admin") {
            this.state.role = localStorage.getItem('role')
            this.state.token = localStorage.getItem('token')
            this.state.name = localStorage.getItem('name')
            this.state.id_outlet = localStorage.getItem('id_outlet')
          // }else{
          //   window.alert("You are not an admin")
          //   window.location = '/login'
          // }
        } 
        else {
          window.location = "/login"
        }
    
      }

    render(){
        return(
            <>
            {this.state.role == "kasir" &&
                                    <NavbarKasir />
                                }
            {this.state.role == "owner" &&
                                    <NavbarOwner />
                                }
                                {this.state.role == "admin" &&
                                    <Navbar />
                                }
                                
            <div className="container" align="center"> <br></br><br></br><br></br>
                        {/* menampilkan Gambar / cover */}
                        <div className="justify-content-between align-items-center mb-2">
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/woman-doing-clothes-wash-4849634-4034203.png" className="img"
                            height="400" />
                <div className='row'>
                    <div className="justify-content-between align-items-center">
                        <h4 className="mb-3">
                            <span className=" col-8 display-5" align="center">Selamat Datang di My Laundry. Halo, {this.state.name} <br></br> sebagai {this.state.role}</span>
                        </h4><br></br>
                        {this.state.role == "owner" &&
                                    <NavLink to='/laporan' className="btn btn-primary btn-lg w-10" type="submit">Mulai <MdArrowForwardIos />
                                    </NavLink>
                                }
                                {this.state.role == "admin" &&
                                    <NavLink to='/paket' className="btn btn-primary btn-lg w-10" type="submit">Mulai <MdArrowForwardIos />
                                    </NavLink>
                                }
                                {this.state.role == "kasir" &&
                                    <NavLink to='/choosePaket' className="btn btn-primary btn-lg w-10" type="submit">Mulai <MdArrowForwardIos />
                                    </NavLink>
                                }
                                </div>
                </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Beranda;