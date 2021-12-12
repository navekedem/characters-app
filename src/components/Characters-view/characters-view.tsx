import { Card, CardContent, Collapse, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Character } from '../../models/character';
import { CharacterDialog } from '../../models/character-dialog';
import { Info } from '../../models/info';
import { SearchParams } from '../../models/search-params';
import { CustomCharatersDialog } from '../custom-dialog/custom-dialog';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import axios from "axios";
import './characters-view.scss';
import { useSelector } from 'react-redux';



interface TableProps {
    params: SearchParams
}

export const CharactersView = (props: TableProps) => {
    //Component state and properties
    const [isLoading, setLoading] = useState<boolean>(false);
    const [charactres, setCharacters] = useState<Character[]>([]);
    const [paginationInfo, setInfo] = useState<Info>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [characterDialog, setCharacterDialog] = useState<CharacterDialog>();
    const [isOpen, setOpenDialog] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const tableView:boolean = useSelector((state) => state) as boolean;

     //Component dependencies handlers
    useEffect(() => {
        if (props.params) {
            setError(false);
            setLoading(true);
            getCharactersData(currentPage);
        }
    }, [props.params])


    //Component Function Handlers
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        //check if user not click on the same page
        if (page !== currentPage) {
            setLoading(true);
            getCharactersData(page);
        }
    }
  

    const getCharactersData = (page: number) => {
        axios.get('https://rickandmortyapi.com/api/character/?page=' + page + '&name=' + props.params.name + '&status=' + props.params.status + '&gender=' + props.params.gender + '').then(function (response) {
            // handle success
            if (response) {
                setCharacters(response.data.results);
                setInfo(response.data.info);
                setLoading(false);
                setOpenDialog(false);
                setCurrentPage(page);
                
            }
        }).catch(function (error) {
            // handle error
            setLoading(false);
            setError(true);
        })
    }

    const openDialog = (characterId: number) => {
        let selectedCharacter = charactres.find((character) => character.id === characterId);
        if (selectedCharacter) {
            let episodeLength = selectedCharacter.episode.length;
            let dialogCharacter: CharacterDialog = { characterId: selectedCharacter.id, characterName: selectedCharacter.name, image: selectedCharacter.image, firstEpisode: selectedCharacter.episode[0], lastEpisode: selectedCharacter.episode[episodeLength - 1] };
            setOpenDialog(true);
            setCharacterDialog(dialogCharacter);
        }
    }
    return <>{error ? <div className="error"> No Match Results <br/> Try to search something else </div> : <div className="charaters-main"> {isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :
        <>{tableView ? <div className="charaters-table">
            <TableContainer data-aos="fade-up" component={Paper}>
                <Table sx={{ minWidth: 650 }}  aria-label="charaters table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell><span className='bold'>Name</span> </TableCell>
                            <TableCell><span className='bold'>Origin</span></TableCell>
                            <TableCell><span className='bold'>Status</span></TableCell>
                            <TableCell><span className='bold'>Species</span></TableCell>
                            <TableCell><span className='bold'>Gender</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {charactres.map((character) => (
                            <TableRow key={character.id}  onClick={() => openDialog(character.id)} className="charaters-table-item" hover={true} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                    <Card key={character.id} className="charaters-cards-item" data-aos="fade-right" onClick={() => openDialog(character.id)} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <div className="charaters-cards-title">
                                <img src={character.image} className="charaters-table-image" alt={character.name} />
                                <h2>{character.name}</h2>
                            </div>
                            <div className="charaters-cards-content">
                                <div className="charaters-cards-content-item">
                                    <span className="bold">Origin:</span>  {character.origin.name}
                                </div>
                                <div className="charaters-cards-content-item">
                                    <span className="bold">Status:</span>   {character.status}
                                </div>
                                <div className="charaters-cards-content-item">
                                    <span className="bold">Species:</span>   {character.species}
                                </div>
                                <div className="charaters-cards-content-item">
                                    <span className="bold">Gender:</span>   {character.gender}
                                </div>
                            </div>
                        </CardContent>
                    </Card>))}
            </div>}
            {isOpen && characterDialog ? <div className="charaters-main-dialog"><CustomCharatersDialog key={characterDialog.characterId} characterDetailsDialog={characterDialog}></CustomCharatersDialog></div> : ""}
            <div className="charaters-main-pagination">
                <Pagination count={paginationInfo?.pages} page={currentPage ? currentPage : 1} onChange={handlePageChange} shape="rounded" />
            </div></>}</div>}</>

}