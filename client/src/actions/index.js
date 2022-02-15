import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/dogs')
        
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getNameDogs(name){
    return async function (dispatch){
        try{
            var json = await axios.get('http://localhost:3001/dogs?name=' + name);
            return dispatch({
                type: 'GET_NAME_DOGS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
            alert('No encontrado!!')
        }
    }
}

export function getTemperaments(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/temperament')
        
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
    }
}

export function getDogDetail(id) {
    return async function (dispatch){
        try{
            var json = await axios.get('http://localhost:3001/dogs/' + id)
            return dispatch ({
                type: 'GET_DOGS_DETAILS',
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function postDog (payload){
    return async function (dispatch){
        const response = await axios.post('http://localhost:3001/dog', payload);
        console.log(response);
        return response;
    }
}

export function filterDogsByTemperament(payload){
    console.log(payload)
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export function filterCreated(payload){
    console.log(payload)
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function order(payload) {
    return {
        type: 'ORDER',
        payload
    }
}