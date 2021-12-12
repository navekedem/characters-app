import React, { useState } from 'react';
import TableViewIcon from '@mui/icons-material/TableView';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Button, ButtonGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeView } from '../../actions'
import './header.scss';

export const Header = () => {
      //Component state and properties
    const [tableView,setTableView] = useState<boolean>(true);
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
    return <header data-aos="flip-down" className="app-header">
        <h1>Rick And Morty Characters App</h1>
        <div className="app-header-btns">     
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button className={tableView ? "active" : ""} onClick={handleTableViewChange}><TableViewIcon fontSize="large" sx={{ color: '#fff' }} /></Button>   
                <Button className={tableView ? "" : "active"} onClick={handleCardViewChange}><DashboardIcon fontSize="large" sx={{ color: '#fff' }} /></Button>    
            </ButtonGroup>
        </div>
    </header>
}