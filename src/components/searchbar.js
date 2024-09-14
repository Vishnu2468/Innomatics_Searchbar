import React, { Component } from "react";
import countries from "../countries.json"; // Ensure this path is correct
import './searchbar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      filteredCountries: []
    };
  }

  // Filter countries by name or capital
  filterResults = (query) => {
    return countries.filter(
      (item) =>
        item.country.toLowerCase().includes(query.toLowerCase()) ||
        item.capital.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Handle input change and update state
  handleInputChange = (e) => {
    const query = e.target.value;
    this.setState({
      query: query,
      filteredCountries: query ? this.filterResults(query) : []
    });
  };

  render() {
    return (
      <div className="search-bar-container">
        <div className="input-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search by country or capital..."
            value={this.state.query}
            onChange={this.handleInputChange}
            className="search-input"
          />
        </div>
        {this.state.filteredCountries.length > 0 && (
          <ul className="suggestions-list">
            {this.state.filteredCountries.map((item, index) => (
              <li key={index} className="suggestion-item">
                {item.country} - {item.capital}
              </li>
            ))}
          </ul>
        )}
        {this.state.query && this.state.filteredCountries.length === 0 && (
          <div className="no-results">No results found</div>
        )}
      </div>
    );
  }
}

export default SearchBar;
