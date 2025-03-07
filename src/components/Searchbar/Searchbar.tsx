import { ChangeEvent } from 'react';
import AppButton from '../UI/AppButton/AppButton'
import styles from './searchbar.module.scss'

export function Searchbar({ handleSearch = () => {}}: { handleSearch: (arg: string) => void }) {

const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    handleSearch(value);
}

    return (
        <div className={styles.searchbar}>
            <input className={styles.searchbar__input} onInput={handleSearchInput} type="text" placeholder='search' />
            <AppButton text="Search" />
        </div>
    )
}