import React, {useState } from 'react';
import { SearchParams } from '../../models/search-params';
import { CharactersView } from '../Characters-view/characters-view';
import { SearchForm } from '../Search-form/search-form';
import shortid from 'shortid';
import './main.scss';

export const Main = () => {
    const [searchParams, setSearchParmas] = useState<SearchParams>({ name: "", status: "", gender: "" });
    const [key,setKey] = useState<string>('');


    const handleParams = (key: string, value: string) => {
        let paramsItem: SearchParams = searchParams;
        paramsItem[key as keyof SearchParams] = value;
        setKey(shortid.generate())
        setSearchParmas(paramsItem);
    }

    return <>
        <section className="form-wrapper">
            <SearchForm updateValues={handleParams}></SearchForm>
        </section>
        <section className="characters-wrapper">
            <CharactersView key={key} params={searchParams}></CharactersView>
        </section>
    </>
}


