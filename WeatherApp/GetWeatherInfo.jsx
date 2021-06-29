import axios from 'axios';
import React, { Component } from 'react';
import localData from './city.list.json';
import './Style.css';
import Logo from './Logo';

class GetWeatherInfo extends Component {
    constructor() {
        super();
        this.apiKey = 'd5298d48ff58696dba94a842194de358';
        this.state = {
            data: [],
            request: {
                cityId: ''
            }
        }

    }

    onSearch(event) {
        event.preventDefault();
        axios
            .get("http://api.openweathermap.org/data/2.5/weather?id=" + this.state.request.cityId + "&appid=" + this.apiKey + "&units=metric")
            .then(response => {
                console.log(response)
                this.setState({
                    data: response.data
                }, this.render)
            })
            .catch(error => { console.log(error) })
    }
    storeCityId(event) {
        this.setState({
            request: {
                cityId: event.target.value
            }
        })
    }
    render() {
        return (
            <React.Fragment>

                <div className="App">
                    <header className="Weather-header">
                        <Logo/>
                        <h1>Weather App</h1>
                    </header>
                    <main>
                        <div className='block'>
                            <form onSubmit={this.onSearch.bind(this)}>
                                <h4>Select City</h4>
                                <select value={this.state.request.cityId} onChange={this.storeCityId.bind(this)}>
                                    <option value=''>Select a city</option>
                                    {localData.length ? localData.map(eachData => <option value={eachData.id} key={eachData.id}>{eachData.name}</option>) : ''}

                                </select>
                                <button>Search</button>
                            </form>

                            {this.state.request.cityId != '' && this.state.data != '' ?
                                <div key={this.state.data.id}>
                                    <table>
                                        <thead><tr className='city'><td><strong>{this.state.data.name}</strong></td></tr></thead>
                                        <tbody><tr><td> Sky - {this.state.data.weather ? this.state.data.weather[0].main : 'Fetching...'}</td></tr></tbody>
                                        <tbody><tr><td>It is currently {Math.round(this.state.data.main.temp)} degrees out with {this.state.data.weather[0].description}.</td></tr></tbody>
                                        {/* <tbody><tr><td className='label'>Description</td><td> {this.state.data.weather ? this.state.data.weather[0].description : 'Fetching...'}</td></tr></tbody>
                                        <tbody><tr><td className='label'>Temperature</td><td> {this.state.data.main.temp ? this.state.data.main.temp + ' *C' : 'Fetching...'}</td></tr></tbody> */}
                                        <tbody><tr><td> It feels like {this.state.data.main.feels_like ? this.state.data.main.feels_like + ' *C' : 'Fetching...'}</td></tr></tbody>
                                    </table>
                                </div>
                                : ''}
                        </div>
                    </main>
                    <footer>
                        App created by Biswajit
                    </footer>
                </div>
            </React.Fragment>
        );
    }
}
export default GetWeatherInfo;