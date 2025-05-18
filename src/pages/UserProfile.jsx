import { Tabs, Tab, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header.jsx";
import "../pages/styles/UserProfile.css";
import Profile from "../components/Profile.jsx";
const UserProfile = () => {


    return (
        <>
            <Header />
            <Container className="user-profile">
                    <Tabs defaultActiveKey="profile" >
                        <Tab eventKey="profile" title="Profile">
                              <Profile/>
                        </Tab>
                        <Tab eventKey="settings" title="Settings">
                        <div>
                            <h2>Profile</h2>
                            <p>Profile content goes here.</p>
                         </div>
                        </Tab>
                        <Tab eventKey="activity" title="Activity">
           
                            <h2>Profile</h2>
                            <p>Profile content goes here.</p>
              
                        </Tab>
                    </Tabs>
          
            </Container>
        </>
    )
}

export default UserProfile;