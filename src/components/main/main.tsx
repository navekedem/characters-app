import React, { useEffect, useState } from 'react';
import { SearchParams } from '../../models/search-params';
import { CharactersTable } from '../Characters-table/characters-table';
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

    return <main>
        <section className="form-wrapper">
            <SearchForm updateValues={handleParams}></SearchForm>
        </section>
        <section className="table-wrapper">
            <CharactersTable key={key} params={searchParams}></CharactersTable>
        </section>
    </main>
}


