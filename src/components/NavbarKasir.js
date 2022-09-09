import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';

class NavbarKasir extends React.Component {
    out = () => {
        if (window.confirm("Are you sure to logout?")) {
         window.location = '/login'
         localStorage.removeItem("name");
         localStorage.removeItem("user");
         localStorage.removeItem("token");
         localStorage.removeItem("id_user");
         localStorage.removeItem("id_transaksi");
         localStorage.removeItem("id_outlet");
         localStorage.removeItem("role");
        }
       }
    render(){
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-0" bg="primary" variant="primary">
                  <div className="container-fluid mt-2 mb-2 px-2">
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul className="navbar-nav mx-auto mb-2 mb-lg-0" variant="light">
                              <li className="nav-item">
                                  <NavLink className="nav-link" to="/">Home</NavLink>
                              </li>
                              <li className="nav-item">
                                  <NavLink className="nav-link" to="/choosePaket">Paket</NavLink>
                              </li>
                              <li className="nav-item">
                                  <NavLink className="nav-link" to="/cart">Keranjang</NavLink>
                              </li>
                              <li className="nav-item">
                                  <NavLink className="nav-link" to="/transaksi">Transaksi</NavLink>
                              </li>
                          </ul>
                          <div className="buttons mx-auto mb-2 mb-lg-0">
                                {/* <NavLink to="/cart" className="btn ms-2"><box-icon name='cart' color='#ffffff'></box-icon></NavLink> */}
                                 {/* <a className="btn ms-2" onClick={() => this.out()}><box-icon name='log-out' color='#ffffff' ></box-icon></a> */}
                                <Dropdown className="rounded-circle btn ms-4"><img src='https://media.istockphoto.com/vectors/happy-young-woman-watching-into-rounded-frame-isolated-on-white-3d-vector-id1296058958?k=20&m=1296058958&s=612x612&w=0&h=AsZaq2ZGD4rIyr7vCuc7NXuAz7954D8wYW93siKAHA4=' style={{borderRadius: '75px'}} width={30}/>
                                <Dropdown.Toggle id="dropdown-basic" className='btn-sm' />
                                <Dropdown.Menu className="super-colors">
                                    <Dropdown.Item onClick={() => this.out()}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                                {/* <Dropdown as={ButtonGroup}>
                                    <Button variant="light" className='btn-sm'><box-icon name='user' color='#000000' ></box-icon></Button>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic" className='btn-sm' />
                                    <Dropdown.Menu className="super-colors">
                                    <Dropdown.Item onClick={() => this.out()}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown> */}
                          </div>
                      </div>
                  </div>
              </nav>
      </div>
    );
    }
  }
  
  export default NavbarKasir;