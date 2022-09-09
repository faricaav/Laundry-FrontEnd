import React from 'react';
import Navbar from '../components/Navbar';
import NavbarKasir from '../components/NavbarKasir';
import NavbarOwner from '../components/NavbarOwner';

class Profil extends React.Component {
  out = () => {
    if (window.confirm("Are you sure to logout?")) {
     window.location = '/login'
     localStorage.removeItem("name");
     localStorage.removeItem("user");
     localStorage.removeItem("token");
     localStorage.removeItem("id");
     localStorage.removeItem("role");
     localStorage.removeItem("id_user");
     localStorage.removeItem("id_transaksi");
     localStorage.removeItem("id_outlet");
    }
   }
    constructor() {
        super()
        this.state = {
          token: "",
          username: "",
          userId: 0,
          role: ""
        }
    
        if (localStorage.getItem('token')) {
          // if (localStorage.getItem('role') === "admin") {
            this.state.role = localStorage.getItem('role')
            this.state.token = localStorage.getItem('token')
            this.state.username = localStorage.getItem('name')
            this.state.id_outlet = localStorage.getItem('id_outlet')
          // }else{
          //   window.alert("You are not an admin")
          //   window.location = '/login'
          // }
        } 
        // else {
        //   window.location = "/login"
        // }
    
      }

    render(){
        return(
            <>
            {this.state.role == "owner" &&
                                    <NavbarOwner />
                                }
                                {this.state.role == "admin" &&
                                    <Navbar />
                                }
                                {this.state.role == "kasir" &&
                                    <NavbarKasir />
                                }
            <div className="container"> <br></br><br></br>
            <div className='col-lg-7 col-sm-10 p-2'>
            <div className="row">
                        {/* menampilkan Gambar / cover */}
                        <div className=" col-5" align="center">
                            <img src="https://media.istockphoto.com/vectors/happy-young-woman-watching-into-rounded-frame-isolated-on-white-3d-vector-id1296058958?k=20&m=1296058958&s=612x612&w=0&h=AsZaq2ZGD4rIyr7vCuc7NXuAz7954D8wYW93siKAHA4=" className="img"
                            height="250" />
                        </div>
 
                        {/* menampilkan deskripsi */}
                        <div className="col-4">
                          <br></br>
                            <h5>
                              {this.state.username}
                            </h5>
                            <h6>
                              Role :  {this.state.role}
                            </h6>
                            <h6>
                              Outlet :{this.state.id_outlet}
                            </h6>
                            <br></br>
                            <div className="btn btn-primary" onClick={() => this.out()}><box-icon name='log-out' color='#ffffff' ></box-icon></div>
                        </div>
                </div>
                </div>
            </div>
            </>
        )
    }
}

export default Profil;