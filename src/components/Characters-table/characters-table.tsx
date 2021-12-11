import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { Character } from '../../models/character';
import { Info } from '../../models/info';
import { SearchParams } from '../../models/search-params';
import './characters-table.scss';

interface TableProps {
    params: SearchParams
}


export const CharactersTable = (props: TableProps) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [charactres, setCharacters] = useState<Character[]>([]);
    const [paginationInfo, setInfo] = useState<Info>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {   
        if(props.params) {
            setLoading(true);
            getCharactersData(currentPage);
        }  
    },[props.params])

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        //check if user click on the same page
        if(page !== currentPage) {
            setLoading(true);
            getCharactersData(page);   
        }
    } 


    const getCharactersData = (page:number) => {
        axios.get('https://rickandmortyapi.com/api/character/?page='+page+'&name='+props.params.name+'&status='+props.params.status+'&gender='+props.params.gender+'').then(function (response) {
            // handle success
            if (response) {
                setCharacters(response.data.results);
                setInfo(response.data.info);
                setLoading(false);
                setCurrentPage(page);
            }
        }).catch(function (error) {
                // handle error
            setLoading(false);
        })
    }
    
    const openDialog = (characterId: number) => {
        let selectedCharacter = charactres.find((character) => character.id === characterId);
        if(selectedCharacter) {
            console.log(selectedCharacter);
        }
    }   

    return <div className="charaters-table"> {isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : <><TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Origin</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Species</TableCell>
                    <TableCell>Gender</TableCell>
                </TableRow>
            </TableHead>   
            <TableBody>
                {charactres.map((character) => (
                    <TableRow key={character.id} onClick={() => openDialog(character.id)} hover={true} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell ><img src={character.image} className="charaters-table-image" alt={character.name} /></TableCell>
                        <TableCell >{character.name} </TableCell>
                        <TableCell >{character.origin.name}</TableCell>
                        <TableCell >{character.status}</TableCell>
                        <TableCell >{character.species}</TableCell>
                        <TableCell >{character.gender}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    <div className="charaters-table-pagination">
        <Pagination count={paginationInfo?.pages} page={currentPage ? currentPage : 1} onChange={handlePageChange} shape="rounded" />
    </div></>}</div>

}