import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles/Header.css';

const Header = () => {

const userFullname = localStorage.getItem("userFullName");
const navigate = useNavigate();


function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("tenantId");
  localStorage.removeItem("userFullName");
  navigate("/login");
}

function handleProfile() {
    navigate("/user/profile");
  }
  

return (
<header class="header">
  <div class="container">
    <div class="nav-section nav-left">
      <a href="#home">Start</a>
      <a href="#about">O nas</a>
    </div>

    <div class="logo">
    </div>

    <div class="nav-section nav-right">
      <a href="#services">Usługi</a>
      <a href="#contact">Kontakt</a>
      <Dropdown align="end" className="user-menu"> 
      <Dropdown.Toggle as="a" variant='white'>
        👤{userFullname}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleProfile}>Profil</Dropdown.Item>
        <Dropdown.Item href="/ustawienia">Ustawienia</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>Wyloguj</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
  </div>
</header>

)
}
export default Header;