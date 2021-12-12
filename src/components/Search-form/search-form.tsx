import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import './search-form.scss';

interface ValuesHandler {
    updateValues: Function;
}

export const SearchForm = (props: ValuesHandler) => {

    //Component state and properties
    const [searchValue, setSearchValue] = useState<string>('');
    const [genderType, setGender] = useState<string>('');
    const [statusType, setStatus] = useState<string>('');

     //Component dependencies handlers
    useEffect(() => {
        props.updateValues("status",statusType); 
    },[statusType])

    useEffect(() => {
        props.updateValues("gender",genderType); 
    },[genderType])


    //Debounce to search name field
    useEffect(() => {
        const identifier = setTimeout(() => {
            props.updateValues("name",searchValue); 
        },500)

        //clean up function
        return () => {
            clearTimeout(identifier)
        }
    },[searchValue])


    //Component Handlers
    const handleSearchChange = (event: any) => {
        if(event.target) {
            setSearchValue(event.target.value);
        }
    }
    const handleChangeGender = (event: any) => {
        if(event.target) {
            setGender(event.target.value);
        }
    }
    const handleChangeStatus = (event: any) => {
        if(event.target) {
            setStatus(event.target.value);
        }
    }
    const clearAllValues = () => {
        setSearchValue("");
        setGender("");
        handleChangeStatus("");
    }

    return <form className="search-form">
        <div className="search-form-item">
            <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-search"
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    label="search"
                />
            </FormControl>
        </div>
        <div className="search-form-item three-inline">
            <div className="search-form-item-inline">
                <FormControl fullWidth>
                    <InputLabel id="gender-select-label">Gender</InputLabel>
                    <Select
                        labelId="gender-select-label"
                        id="gender-select"
                        value={genderType}
                        label="gender Type"
                        onChange={handleChangeGender}
                    >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Genderless"}>Genderless</MenuItem>
                        <MenuItem value={"unknown"}>Unknown</MenuItem>

                    </Select>
                </FormControl>
            </div>
            <div className="search-form-item-inline">
                <FormControl fullWidth>
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                        labelId="status-select-label"
                        id="status-select"
                        value={statusType}
                        label="status Type"
                        onChange={handleChangeStatus}
                    >
                        <MenuItem value={"Alive"}>Alive</MenuItem>
                        <MenuItem value={"Dead"}>Dead</MenuItem>
                        <MenuItem value={"unknown"}>Unknown</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="search-form-item-inline btn">
                <Button onClick={clearAllValues} variant="contained">Clear All</Button>
            </div>
        </div>
    </form>

}