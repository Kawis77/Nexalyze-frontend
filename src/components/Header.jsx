import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from "axios";
import { Form, Button, Alert, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles/Header.css';


const Header = () => {

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
    </div>
  </div>
</header>

)
}
export default Header;