import { Dialog, DialogContent } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles'
import { CharacterDialog } from '../../models/character-dialog';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './character-dialog.scss';
import { Episode } from '../../models/episode';

interface DialogProps {
    characterDetailsDialog: CharacterDialog
}

export const CustomCharatersDialog = (props: DialogProps) => {
    const [open, setOpen] = useState<boolean>(true);
    const [firstEpisode, setFirstEpisode] = useState<string>('');
    const [lastEpisode, setLastEpisode] = useState<string>('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    useEffect(() => {
        getCharactersEpisodeData(props.characterDetailsDialog.firstEpisode, props.characterDetailsDialog.lastEpisode);
    }, [props.characterDetailsDialog]);

    const handleClose = () => {
        setOpen(false);
    };
    const cleanUrl = (episodeUrl: string) => {
        return episodeUrl.replace('https://rickandmortyapi.com/api/episode/', '');
    }
    const getCharactersEpisodeData = (firstEpisode: string, lastEpisode: string) => {
        let episodes = cleanUrl(firstEpisode) + ',' + cleanUrl(lastEpisode);
        axios.get('https://rickandmortyapi.com/api/episode/' + episodes).then(function (response) {
            // handle success
            if (response) {
                let episodesData: Episode[] = response.data;
                if(episodesData.length === 1) {
                    setFirstEpisode(episodesData[0].episode);
                    setLastEpisode(episodesData[0].episode);
                } else if(episodesData.length  > 1) {
                    setFirstEpisode(episodesData[0].episode);
                    setLastEpisode(episodesData[1].episode);
                } else {
                    
                }
            }
        }).catch(function (error) {
            // handle error
            // setLoading(false);
        })
    }



    return <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} className="character-dialog" aria-labelledby="charater-dialog-title" >
        <DialogContent>
            <img src={props.characterDetailsDialog.image} alt="" className="character-dialog-image" />
            <h2>{props.characterDetailsDialog.characterName}</h2>
            <div className="character-dialog-episode">
                <span className="bold">First Episode:</span> {firstEpisode}
            </div>
            <div className="character-dialog-episode">
                <span className="bold">Last Episode:</span> {lastEpisode}
            </div>
        </DialogContent>
    </Dialog>
}