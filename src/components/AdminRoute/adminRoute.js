import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from '../../config/axios';

const AdminRoute = ({ children, link }) => {

    const user = useSelector(selectUser);
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        if (user.username !== '') {
            getMenu();
        }
    }, [user]);

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
            {menus.length > 0 && (menus.some(menu => menu.link === link) ? children : (<Navigate to="/search" />))}
        </>

    );
}

export default AdminRoute