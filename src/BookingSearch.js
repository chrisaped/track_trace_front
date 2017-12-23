import React from 'react';
import BookingDetails from './BookingDetails';
import SearchHistory from './SearchHistory';

class BookingSearch extends React.Component {
	state = {
		searchValue: '',
		searchStatus: '',
		searchResult: '',
	};

	updateSearchValue = (e) => {
		const value = e.target.value;

		this.setState({
			searchValue: value,
		});
	}

	searchBookings = (query) => {
		let url = `bookings/${query}`;
		if (this.props.location.pathname !== "/") {
			url = `${query}`;
		}

	  return fetch(url, {
	    accept: 'application/json',
	  }).then(response => {
	    	this.setState({ searchStatus: response.status });
	    	return response.json();
	    })
	    .then(data => this.setState({ searchResult: data }));
	}

	render() {
		const {
			searchValue,
			searchStatus,
			searchResult,
		} = this.state;

		const location = this.props.location.pathname;

		if (!searchResult && this.props.match && this.props.match.params.id) {
			this.searchBookings(this.props.match.params.id);
		}

		let bookingResult = null;
		if (searchStatus === 200) {
		  bookingResult = <BookingDetails searchResult={searchResult} searchValue={searchValue} location={location} />;
		} else if (searchStatus === 404) {
			bookingResult = <p>No bookings found. Please try again.</p>;
		}
		let searchHistory = null;
		let bookingSearch = null;
		if (location === "/") {
			searchHistory = <SearchHistory />;
			bookingSearch = (
				<div>
				  <h1>Booking Search</h1>
				  <div className="ui fluid action input">
						<input
							type='text'
							placeholder='Enter a booking number'
							value={searchValue}
							onChange={this.updateSearchValue}
						/>
						<button 
						  className="ui primary button"
						  onClick={() => this.searchBookings(searchValue)}
						  disabled={!searchValue}
						>
					    Search
					  </button>
				  </div>
				</div>
			);
		}

		return (
			<div>
				<div className="ui left aligned container">
			    {searchHistory}
				</div>
				<div className="ui center aligned container">
				  {bookingSearch}
					{bookingResult}
				</div>
			</div>
		);
	}
}

export default BookingSearch;
