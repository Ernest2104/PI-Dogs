
const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: []
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case 'GET_NAME_DOGS':
            return {
                ...state,
                dogs: action.payload
            }
        case 'GET_DOGS_DETAILS':
            return {
                ...state,
                detail: action.payload
            }
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }
        case 'FILTER_BY_TEMPERAMENT':
            const allDogs = state.allDogs
            const temperamentFiltered = allDogs.filter((d) => d.temperament && d.temperament.includes(action.payload))
            return {
                ...state,
                dogs: temperamentFiltered
            }
        case 'POST_DOG':
            return {
                ...state,
            }
        case 'FILTER_CREATED':
            const allDogs2 = state.allDogs
            const createdFilter = action.payload === 'created' ? allDogs2.filter(d => d.createInDb) : allDogs2.filter(d => !d.createInDb)
            return {
                ...state,
                dogs: action.payload === 'all' ? state.allDogs : createdFilter
            }
        case 'ORDER':
            let sortedDogs
            if (action.payload === 'asc_name') {
                sortedDogs = state.dogs.sort((a,b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })
            }
            if (action.payload === 'desc_name') {
                sortedDogs = state.dogs.sort((a,b) => {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            }
            if (action.payload === 'asc_weight') {
                sortedDogs = state.dogs.sort(function (a,b) {
                    if (parseInt(a.weight.substr(0,2)) > parseInt(b.weight.substr(0,2))) {
                        return 1;
                    }
                    if (parseInt(b.weight.substr(0,2)) > parseInt(a.weight.substr(0,2))) {
                        return -1;
                    }
                    return 0;
                })
            }
            if (action.payload === 'desc_weight') {
                sortedDogs = state.dogs.sort(function (a,b) {
                    if (parseInt(a.weight.substr(0,2)) > parseInt(b.weight.substr(0,2))) {
                        return -1;
                    }
                    if (parseInt(b.weight.substr(0,2)) > parseInt(a.weight.substr(0,2))) {
                        return 1;
                    }
                    return 0;
                })
            }
                            
            return {
                ...state,
                dogs: sortedDogs
            }
        
        default:  
        return state
    }
}

export default rootReducer;

//d.temperament = "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving"
//action.payload = "Playful"