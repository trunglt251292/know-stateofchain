import React, { Component } from 'react';
import search from './baseline-search-24px.svg';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

class HomePage extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegistry = this.handleRegistry.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.state = {
      searchContent: '',
    };
  }

  handleSubmit() {
    console.log('handleSubmit');
  };

  handleRegistry() {
    console.log('handleRegistry');
  };

  handleSearch() {
    console.log('handleSearch', this.state.searchContent);
  };

  handleSearchChange(e) {
    this.setState({searchContent: e.target.value});
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.handleSearch();
    }
  };

  render() {
    return (
      <header className="App-header">
        <div className="Header-btns">
          <Button outline color="secondary" size="sm" className="Header-btn" onClick={this.handleSubmit}>Submit</Button>
          <Button color="primary" size="sm" className="Header-btn" onClick={this.handleRegistry}>Registry</Button>
        </div>
        <img src="https://knownetwork.io/images/logo-white2x.png" className="App-logo" alt="logo" />
        <InputGroup className="Search-bar">
          <Input value={this.state.searchContent} onKeyPress={this.handleKeyPress} onChange={this.handleSearchChange}/>
          <InputGroupAddon addonType="append" className="Search-icon">
            <InputGroupText>
              <img src={search} alt="Search icon" onClick={this.handleSearch} className="img-btn"/>
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <span className="App-link">
              Distributed Certifications and Degrees
            </span>
      </header>
    );
  }
}

export default HomePage;
