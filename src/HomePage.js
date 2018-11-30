import React, { Component } from 'react';
import search from './baseline-search-24px.svg';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

class HomePage extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegistry = this.handleRegistry.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.toggleModalSubmit = this.toggleModalSubmit.bind(this);
    this.state = {
      searchContent: '',
      modalSubmit: false,
    };
  }

  toggleModalSubmit() {
    this.setState(prevState => ({ modalSubmit: ! prevState.modalSubmit }));
  }

  handleSubmit() {
    console.log('handleSubmit');
    this.toggleModalSubmit();
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
          <Button outline color="secondary" size="sm" className="Header-btn" onClick={this.toggleModalSubmit}>Submit</Button>
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
        <Modal isOpen={this.state.modalSubmit} toggle={this.toggleModalSubmit}>
          <ModalHeader toggle={this.toggleModalSubmit}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggleModalSubmit}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </header>
    );
  }
}

export default HomePage;
