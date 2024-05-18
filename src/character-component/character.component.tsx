import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getFromAPI} from "../utils.ts";
import {CharacterModel} from "./character.model.ts";

export const CharacterComponent = () => {
    const [character, setCharacter] = useState<CharacterModel>();
    const {id} = useParams();

    useEffect(() => {
        const controller = new AbortController();
        if (id) {
            getFromAPI(`https://hp-api.onrender.com/api/character/${id}`, controller)
                .then((characters) => setCharacter(characters[0]));
        }
        return () => {
            setCharacter(undefined);
            controller.abort("Component unmounted. Aborting fetch.");
        }
    }, [id]);

    return (
        <div>
            {!character && <div>Loading...</div>}
            {character && (
                <>
                    <h2>Character {character.name}</h2>
                    <p>Date of Birth: {character.dateOfBirth}</p>
                </>
            )}
        </div>
    )
};
