import React from 'react';
import ApiUrl from './Constants';

class SearchHistory extends React.Component {
	state = {
		searches: null,
		isOpen: false,
	};

  componentWillMount() {
		const url = ApiUrl +'searches';
	  return fetch(url, {
	    accept: 'application/json',
	  }).then(response => {
		    return response.json();
	    })
	    .then(data => this.setState({ searches: data }));
  }

	toggleSearchHistoryMenu = () => {
		const { isOpen } = this.state;

		this.setState({
			isOpen: !isOpen,
		});
	}

	deleteSearchHistory = () => {
		const url = ApiUrl + 'searches';
	  return fetch(url, {
	    method: 'delete',
	  }).then(response => {
		    return response.json();
	    })
	    .then(data => this.setState({
	       searches: null,
	       isOpen: false,
	     }));
	}

	render() {
		const {
      searches,
      isOpen,
		} = this.state;

		const noSearches = !searches || searches.length === 0;
		let searchHistoryMenu = null;
		let searchHistoryButton = null;
		if (!noSearches) {
			searchHistoryButton = (
			  <button 
			    className="ui basic button" 
			    onClick={this.toggleSearchHistoryMenu}
			    data-element="menu"
			    data-type="collection"
			  >
			    Search History
			  </button>
			);
		}

		if (!noSearches && isOpen) {
			searchHistoryMenu = (
				<div>
				  <div className="ui list">
				    { searches.map((search, i) => {
				    	return(
				    	  <div className="item" key={i}><a href={'/bookings/' + search.booking_number}>{search.booking_number}</a></div>
				    	);
				    })}
				  </div>
					<button
					  className="negative mini ui button"
						onClick={this.deleteSearchHistory}
					>
						Delete Search History
					</button>
				</div>
			);
		}

		return (
			<div>
				{searchHistoryButton}
				{searchHistoryMenu}
			</div>
		);
  }
}

export default SearchHistory;
