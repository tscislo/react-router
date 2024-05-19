import classes from './characters.component.module.scss';
import {useCallback, useEffect, useMemo, useReducer} from "react";
import {getFromAPI} from "../utils.ts";
import {Link, Outlet, useSearchParams} from "react-router-dom";
import {CharactersActionTypes, CharactersReducer} from "./characters.state.ts";

export const CharactersComponent = () => {
    const [{filteredCharacters}, dispatch] = useReducer(CharactersReducer, {
        allCharacters: [],
        filteredCharacters: []
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const searchName: string = useMemo(() => searchParams.get('name') ?? '', [searchParams]);
    const getSearchName = useCallback(() => searchName, [searchName]);
    
    useEffect(() => {
        const controller = new AbortController();
        getFromAPI('https://hp-api.onrender.com/api/characters', controller)
            .then((characters) => dispatch({type: CharactersActionTypes.GET_CHARACTERS_SUCCESS, payload: characters}))
            .catch(() => dispatch({type: CharactersActionTypes.GET_CHARACTERS_ERROR}));
        return () => {
            controller.abort("Component unmounted. Aborting fetch.");
        }
    }, []);

    useEffect(() => dispatch({
            type: CharactersActionTypes.UPDATE_FILTER_PHRASE,
            payload: getSearchName()
        }),
        [getSearchName, searchName]);

    return (
        <div className={classes['main-container']}>
            <menu className={classes.menu}>
                <h1 className={classes.characters}>Characters</h1>
                <Link to={'/'}>Home</Link>
                <div>
                    {filteredCharacters?.length === 0 && <div>Loading...</div>}
                    {filteredCharacters?.length > 0 && (
                        <>
                            <input
                                suppressHydrationWarning={true}
                                value={searchParams.get('name') ?? ''}
                                type={'text'} onChange={(event) => {
                                if (event.target.value === '') {
                                    setSearchParams({});
                                    return;
                                }
                                setSearchParams({name: event.target.value});
                            }}/>
                            <ul>
                                {filteredCharacters.map((characterItem) => (
                                    <li key={characterItem.id}>
                                        <Link
                                            to={`character/${characterItem.id}${location.search}`}>{characterItem.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </menu>
            <main>
                <Outlet/>
            </main>
        </div>
    )
};