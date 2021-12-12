import React, { useEffect, useState } from 'react';
import './episodes.scss';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Episode } from '../../models/episode';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    indexAxis: 'y' as const,
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};


export const Episodes = () => {
    const [episodes,setEpisodes] = useState<Episode[]>([]);
    const [labels,setLabels] = useState<string[]>([]);
    const [dataSetArray,setData] = useState<number[]>([]);

    useEffect(() => {
        getEpisodesData();
    },[])
    useEffect(() => {
        handleEpisodes();
    },[episodes])

    const data = {
        labels,
        datasets: [
            {
                label: 'Characters In Episode',
                data: dataSetArray,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };


    const getEpisodesData = () => {
        axios.get('https://rickandmortyapi.com/api/episode').then(function (response) {
            // handle success
            if (response) {
                if(response.data.results.length > 0) {
                    setEpisodes(response.data.results);        
                }
            }
        }).catch(function (error) {
            // handle error
            // setError(true);
            // setLoading(false);
        })
    }
    const handleEpisodes = () => {
        if(episodes) {
            let tempLabels: string[] = []
            let tempData: number[] = [];
            episodes.forEach((episode:Episode,index:number) => {
                tempLabels.push(episode.episode);
                tempData.push(episode.characters.length);
            })
            setData(tempData);
            setLabels(tempLabels);
        }
    }

    return <section className="episodes">
        <div className="episodes-title">
            <h2>Episodes Chart</h2>
        </div>
        <div className="episodes-chart">
            <Bar options={options} className='episodes-chart-bar' data={data} />
        </div>
    </section>
}