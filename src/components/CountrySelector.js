import React from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';
import {fetchCountries} from '../api/api';
export default class Countryselector extends React.Component {
    state = {
        countries:[],
    }
    async componentDidMount() {
        let countries = await fetchCountries();
        this.setState({countries:countries.countries});
    }
    render() {
        return(
            <FormControl className="form_control">
                <NativeSelect onChange={(event)=>{this.props.changeCountry(event.target.value)}}>
                    <option value="">World</option>
                   {this.state.countries.map((country, i)=>{
                       return <option key = {i} value={country.name}>{country.name}</option>
                   })}
                </NativeSelect>
            </FormControl>
        )
    }
}