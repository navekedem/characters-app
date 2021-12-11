import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Character } from '../../models/character';
import { CharacterDialog } from '../../models/character-dialog';
import { Info } from '../../models/info';
import { SearchParams } from '../../models/search-params';
import { CustomCharatersDialog } from '../custom-dialog/custom-dialog';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import axios from "axios";
import './characters-view.scss';

interface TableProps {
    tableView:boolean;
    params: SearchParams
}


export const CharactersView = (props: TableProps) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [charactres, setCharacters] = useState<Character[]>([]);
    const [paginationInfo, setInfo] = useState<Info>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [characterDialog, setCharacterDialog] = useState<CharacterDialog>();

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
            let episodeLength = selectedCharacter.episode.length;
            let dialogCharacter: CharacterDialog = {characterId:selectedCharacter.id,characterName:selectedCharacter.name,image: selectedCharacter.image,firstEpisode:selectedCharacter.episode[0],lastEpisode:selectedCharacter.episode[episodeLength - 1]};
            setCharacterDialog(dialogCharacter);
        }
    }   

    return <div className="charaters-main"> {isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : 
    <>{props.tableView ? <div className="charaters-table">
         <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="charaters table">
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
                    <TableRow key={character.id} onClick={() => openDialog(character.id)} className="charaters-table-item" hover={true} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
    </div> :
   <div className="charaters-cards">
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
   </div> }
    {characterDialog ? <div className="charaters-main-dialog"><CustomCharatersDialog key={characterDialog.characterId} characterDetailsDialog={characterDialog}></CustomCharatersDialog></div> : ""}
    <div className="charaters-main-pagination">
        <Pagination count={paginationInfo?.pages} page={currentPage ? currentPage : 1} onChange={handlePageChange} shape="rounded" />
    </div></>}</div>

}