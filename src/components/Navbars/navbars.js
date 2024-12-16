import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import Logout from '../Logout/logout';
import { NavLink } from 'react-router-dom';
import axios from '../../config/axios';
import { useEffect, useState } from 'react';


const Navbars = () => {
    const user = useSelector(selectUser);

    const [menus, setMenus] = useState([]);

    useEffect(() => {
        user.username !== "" && getMenu();
    }, [user.username])

    const getMenu = async () => {
        let menu = [];
        await Promise.all(user.roles.map(async (role) => {
            const res = await axios.get(`menu/${role}`);
            if (res && +res.EC === 0) {
                menu.push(res.DT);
            }
        }));
        menu = menu.flatMap(array => array);

        menu = menu.filter((obj, index, self) =>
            index === self.findIndex((t) => (
                t.id === obj.id
            ))
        );

        setMenus(menu);
    }

    return (
        <>
            {user.username !== "" ?
                (<Navbar expand="lg" className="bg-body-tertiary py-3">
                    <Container>
                        <div className='navbar-brand'>OCR</div>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {menus.map((menu) => {
                                    return <NavLink key={menu.id} to={menu.link} className="nav-link">{menu.name}</NavLink>
                                })}
                            </Nav>
                            <Logout />
                        </Navbar.Collapse>
                    </Container>

                </Navbar>)
                :
                <></>
            }
        </>

    );
}

export default Navbars;