import React, { useState } from 'react';
import './header.scss';
import TableViewIcon from '@mui/icons-material/TableView';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Button, ButtonGroup } from '@mui/material';

export const Header = () => {
    const [tableView,setTableView] = useState<boolean>(true);

    const handleTableViewChange = (event:any) => {
        setTableView(true)
    }
    const handleCardViewChange = (event:any) => {
        setTableView(false)
    }
    return <header className="app-header">
        <h1>Rick And Morty Characters App</h1>
        <div className="app-header-btns">     
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button className={tableView ? "active" : ""} onClick={handleTableViewChange}><TableViewIcon fontSize="large" sx={{ color: '#fff' }} /></Button>   
                <Button className={tableView ? "" : "active"} onClick={handleCardViewChange}><DashboardIcon fontSize="large" sx={{ color: '#fff' }} /></Button>    
            </ButtonGroup>
        </div>
    </header>
}