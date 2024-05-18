import './characters.component.scss';
import {useEffect, useState} from "react";
import {getFromAPI} from "../utils.ts";
import {Outlet} from "react-router-dom";

export const CharactersComponent = () => {
    const [allCharacters, setAllCharacters] = useState<any[] | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        getFromAPI('https://hp-api.onrender.com/api/characters', controller)
            .then(setAllCharacters);
        return () => {
            controller.abort("Component unmounted. Aborting fetch.");
        }
    }, []);

    return (
        <div className={'main-container'}>
            <menu className={'menu'}>
                <h1 className={'characters'}>Characters</h1>
                {!allCharacters && <div>Loading...</div>}
                {allCharacters && (
                    <ul>
                        {allCharacters.map((characterItem) => (
                            <li key={characterItem.id}>{characterItem.name}</li>
                        ))}
                    </ul>
                )}
            </menu>
            <main>
                <Outlet/>
            </main>
        </div>
    )
};