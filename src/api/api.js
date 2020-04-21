// import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
// axios.get(url).then((response)=>{
//     console.log(response)
// })

export async function fetchData() {
    try {
        const responce = await fetch(url);
        return responce.json();
    } catch (err){
        console.log(err);
    }
}

export async function fetchCountries() {
    try {
        const responce = await fetch(`${url}/countries`);
        return responce.json();
    } catch (err){
        console.log(err);
    }
}
export async function fetchCountry(country) {
    try {
        const responce = await fetch(`${url}/countries/${country}`);
        return responce.json();
    } catch (err){
        console.log(err);
    }
}
export async function fetchDailyData() {
    try {
        const responce = await fetch(`${url}/daily`);
        return responce.json();
    } catch (err){
        console.log(err);
    }
}