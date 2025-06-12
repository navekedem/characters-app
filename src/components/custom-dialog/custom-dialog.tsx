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
    const [open, setOpen] = useState<boolean>(false);
    const [firstEpisode, setFirstEpisode] = useState<string>('');
    const [lastEpisode, setLastEpisode] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');
    const [descriptionLoading, setDescriptionLoading] = useState<boolean>(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    useEffect(() => {
        setError(false);
        setOpen(true);
        setDescription('');
        getCharactersEpisodeData(props.characterDetailsDialog.firstEpisode, props.characterDetailsDialog.lastEpisode);
        getCharacterDescription(props.characterDetailsDialog.characterName, props.characterDetailsDialog.characterId);
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
                    setError(true);
                }
            }
        }).catch(function (error) {
            // handle error
            setError(true);
        })
    }

    const getCharacterDescription = (name: string, id: number) => {
        setDescriptionLoading(true);
        axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: `Briefly describe the Rick and Morty character ${name} in one concise paragraph.`
            }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`
            }
        }).then(function (response) {
            if (response.data && response.data.choices && response.data.choices.length > 0) {
                setDescription(response.data.choices[0].message.content.trim());
            } else {
                setDescription('No description available.');
            }
        }).catch(function () {
            setDescription('Failed to load description.');
        }).finally(() => {
            setDescriptionLoading(false);
        });
    }



    return <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} className="character-dialog" aria-labelledby="charater-dialog-title" >
           <>{error ? <div className="error">No Data on Character</div> : <DialogContent><img src={props.characterDetailsDialog.image} alt="" className="character-dialog-image" />
            <h2>{props.characterDetailsDialog.characterName}</h2>
            <p className="character-dialog-description">{descriptionLoading ? 'Loading description...' : description}</p>
            <div className="character-dialog-episode">
                <span className="bold">First Episode:</span> {firstEpisode}
            </div>
            <div className="character-dialog-episode">
                <span className="bold">Last Episode:</span> {lastEpisode}
            </div></DialogContent>}</>
    </Dialog>
}
