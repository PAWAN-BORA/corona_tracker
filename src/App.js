import React from 'react';
import CartBox from './components/CartBox'
import CountrySelector from './components/CountrySelector'
import CoronaChart from './components/CoronaChart'
import {fetchData, fetchCountry} from './api/api';
import './Style.css';
class App extends React.Component {
    state = {
        country:'',
        data:{},
    }
    async componentDidMount() {
        let data = await fetchData();
        let newData  = {confirmed:data.confirmed, recovered:data.recovered, deaths:data.deaths, lastUpdate:data.lastUpdate};
        this.setState({data:newData});
    }
    changeCountry = async (country)=> {
        let data;
        if(country!==''){
            data = await fetchCountry(country);

        } else {
            data = await fetchData();
        }
        // console.log(data);
        let newData  = {confirmed:data.confirmed, recovered:data.recovered, deaths:data.deaths, lastUpdate:data.lastUpdate};
        this.setState({country:country, data:newData});
        console.log(this.state.country);
    }
    render() {
        return(
            <div className="container">
                <CountrySelector changeCountry={this.changeCountry}/>
                <CartBox data={this.state.data}/>
                <CoronaChart country={this.state.country} data={this.state.data}/>
            </div>
        )
    }
}

export default App;