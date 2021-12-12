import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TableViewIcon from '@mui/icons-material/TableView';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, ButtonGroup, Drawer, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeView } from '../../actions'
import './header.scss';

export const Header = () => {
    //Component state and properties
    const [tableView, setTableView] = useState<boolean>(true);
    const [openMenu, setOpen] = useState<boolean>(false);
    const dispatch = useDispatch();

    //Component function Handlers
    const handleTableViewChange = () => {
        setTableView(true)
        dispatch(changeView(true));
    }
    const handleCardViewChange = () => {
        setTableView(false)
        dispatch(changeView(false));
    }
    return <header className="app-header">
        <div className="app-header-content" data-aos="flip-down">
            <div className="app-header-title">
                <Button onClick={() => setOpen(true)}><MenuIcon fontSize="large" sx={{ color: '#fff' }} /></Button>
                <h1>Rick And Morty Characters App</h1>
            </div>
            <div className="app-header-btns">
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button className={tableView ? "active" : ""} onClick={handleTableViewChange}><TableViewIcon fontSize="large" sx={{ color: '#fff' }} /></Button>
                    <Button className={tableView ? "" : "active"} onClick={handleCardViewChange}><DashboardIcon fontSize="large" sx={{ color: '#fff' }} /></Button>
                </ButtonGroup>
            </div>
        </div>
        <Drawer sx={{'& .MuiDrawer-paper': { width: 300}}} className="menu" open={openMenu}>
            <MenuItem></MenuItem>
            <MenuItem><Link to="/" onClick={() => setOpen(false)} className="menu-link">Home</Link></MenuItem>
            <MenuItem><Link to="/episodes" onClick={() => setOpen(false)} className="menu-link">Episodes</Link></MenuItem>
        </Drawer>
    </header>
}