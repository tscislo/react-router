import {CharacterModel} from "../character-component/character.model.ts";

export interface CharactersState {
    allCharacters: CharacterModel[];
    filteredCharacters: CharacterModel[];
    filterPhrase?: string;
}

export enum CharactersActionTypes {
    GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS',
    GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR',
    UPDATE_FILTER_PHRASE = 'UPDATE_FILTER_PHRASE'
}


export interface GetCharactersSuccessAction {
    type: CharactersActionTypes.GET_CHARACTERS_SUCCESS;
    payload: CharacterModel[];
}

export interface GetCharactersErrorAction {
    type: CharactersActionTypes.GET_CHARACTERS_ERROR;
}

export interface UpdateFilterPhraseAction {
    type: CharactersActionTypes.UPDATE_FILTER_PHRASE;
    payload: string;
}

export type CharactersAction = UpdateFilterPhraseAction | GetCharactersSuccessAction | GetCharactersErrorAction ;

export const CharactersReducer = (state: CharactersState, action: CharactersAction): CharactersState => {
    switch (action.type) {
        case CharactersActionTypes.GET_CHARACTERS_SUCCESS:
            return {
                ...state,
                allCharacters: action.payload,
                filteredCharacters: action.payload
                    ?.filter((character) => character.name.toLowerCase().includes((state.filterPhrase ?? '').toLowerCase()))
            };
        case CharactersActionTypes.UPDATE_FILTER_PHRASE:
            return {...state,
                filterPhrase: action.payload,
                filteredCharacters: state.allCharacters?.filter((character) => character.name.toLowerCase().includes(action.payload.toLowerCase()))
            };
        default:
            return state;
    }
}