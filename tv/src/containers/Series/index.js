import React, { Component } from 'react';
import Intro from '../../components/intro';
import SeriesList from '../../components/SeriesList';
import Loader from '../../components/Loader'



class Series extends Component{
 state= {
  series : [],
  seriesName : '',
  isFetching: false
 }


  onSeriesInputChange = e => {

    this.setState({ seriesName: e.target.value, isFetching:true});

     fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
    .then(response=> response.json())
    .then(json => this.setState({ series : json ,isFetching:false}));
    
  }

	render(){
    const {series,seriesName,isFetching} = this.state;
		return(
			<div>
                <Intro message = "here you can find all of your fav tv series"/>

            <div>

      <input value ={seriesName}  type ="text" onChange = {this.onSeriesInputChange}/>
      </div>
      { 
        !isFetching && series.length === 0 && seriesName.trim()===''
        &&
        <p>please enter series name </p>

    }
    {
      !isFetching && series.length === 0 && seriesName.trim()!==''
      &&
      <p> No tv series matching your search</p>
    }
    {
      isFetching && <Loader/>
    }
    {
      !isFetching && <SeriesList list={ this.state.series } />

    }
      
      </div>

			)
	}
}

export default Series;