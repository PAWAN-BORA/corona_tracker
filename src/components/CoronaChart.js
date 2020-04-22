import React from 'react';
import {fetchDailyData} from '../api/api';
import {Line, Bar} from 'react-chartjs-2';
import {Button} from '@material-ui/core';
export default class CoronaChart extends React.Component {
    state = {
        dailyData:[],
        graph:"line"
    }
    async componentDidMount() {
        const dailyData = await fetchDailyData();
        this.setState({dailyData:dailyData});
    }
    changeGraph = (graph)=>{
        this.setState({graph:graph});
    }
    render() {
        if(this.state.dailyData.length===0) {
            return null;

        }
        const {dailyData} = this.state;
        const {country, data} = this.props;
        
        let graph;
        if(country==='' && this.state.graph==='line') {
            graph =  <Line 
                data = {{
                    labels:dailyData.map(data=>data.reportDate),
                    datasets:[
                        {
                            data:dailyData.map(data=>data.confirmed.total),
                            label:"Infected",
                            borderColor:"blue",
                            fill:true,
                        },
                        {
                            data:dailyData.map(data=>data.deaths.total),
                            label:"Death",
                            borderColor:"red"
                        }
                    
                    ]
                }}
            />
        } else {
            let dataFor;
            if(country==='') {
                dataFor = "world"
            } else {
                dataFor = country
            }
            graph = <Bar
                data = {{
                    labels:['Confirmed', 'Recovered', 'Deaths'],
                    datasets:[{
                        lable:"People",
                        backgroundColor:["blue", 'green', 'red'],
                        data:[data.confirmed.value, data.recovered.value, data.deaths.value]
                    }]
                }}
                options= {{
                    legend:{display:false},
                    title:{display:true, text:`Current state in ${dataFor}`}
                }}
            />
        }
        
        return(
            <>
             {country===''?
             <div className="select_graph">
                <label htmlFor="graph">Choose the graph:</label>
                <select id="graph" value={this.state.graph} onChange={(event)=>{this.changeGraph(event.target.value)}} >
                    <option value="line">Line Graph</option>
                    <option value="bar">Bar Graph</option>
                    
                </select>
            </div>:null
            }
            <div className="chart_box" id="chart">
                {graph}
            </div>
            <Button variant="contained" color="primary" style={{margin:'0.8rem 0'}} onClick={()=>{fullScreen(document.getElementById("chart"))}}>
                Full Screen
            </Button>
            </>
        )
    }
}

function fullScreen(element) {
    console.log(element);
    let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) 
    if(!isInFullScreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }  else if (element.mozRequestFullScreen) { /* Firefox */
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) { /* IE/Edge */
        element.msRequestFullscreen();
      }
    };
    // var orientation = (window.screen.orientation || {}).type || window.screen.mozOrientation || window.screen.msOrientation;
    // console.log(orientation);
    // if (orientation === "landscape-primary") {
    //     console.log("That looks good.");
    //   } else if (orientation === "landscape-secondary") {
    //     console.log("Mmmh... the screen is upside down!");
    //   } else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
    //     console.log("Mmmh... you should rotate your device to landscape");
    //   } else if (orientation === undefined) {
    //     console.log("The orientation API isn't supported in this browser :("); 
    //   }
    window.screen.orientation.lock("landscape").then(()=>{
        console.log("working");
    }).catch((err)=>{
        console.warn(err);
    });
    // if (window.self.isMobile) {
    //     window.screen.orientation.lock('landscape').catch(function screenLockError(e) {
    //       console.log(e);
    //     });
    //   }
}