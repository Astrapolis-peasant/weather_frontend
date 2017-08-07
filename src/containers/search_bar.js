import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

const getting_cache = () => {
  const cached = localStorage.getItem("user_session");
  if (cached) {
    return (JSON.parse(cached));
  }else {
    return ['Queries:']
  };
}

class SearchBar extends Component {
constructor(props) {
  super(props);

  this.state = { term: 'new york',
                history: getting_cache()};
  this.onInputChange = this.onInputChange.bind(this);
};

onInputChange = (event) => {
  this.setState({term:event.target.value})
}

onFormSubmit = (event) => {
  event.preventDefault();
  this.props.fetchWeather(this.state.term);
  this.setState({history:this.state.history.concat(this.state.term)});
  localStorage.setItem("user_session", JSON.stringify(this.state.history.concat(this.state.term)));
  console.log(localStorage)
}

onButtonClick = (event) => {
  console.log(event.target.id);
  this.props.fetchWeather(event.target.id);
}

  render(){
    return (
      <div>
        <ul className="list-inline">{this.state.history.map(history=><li
          key={Date.now()+history}><button
            className="btn btn-secondary"
            onClick={this.onButtonClick}
            id={history}
            >{history}</button></li>)}</ul>
        <form onSubmit={this.onFormSubmit} className='input-group' >
          <input
            placeholder="type any location to check the weather"
            className="form-control"
            value={this.state.term}
            onChange={this.onInputChange}
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">submit</button>
          </span>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators ({ fetchWeather }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar);
