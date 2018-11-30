import React, {Component} from 'react';
import search from './baseline-search-24px.svg';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

class HomePage extends Component {
  render() {
    return (
      <header className="App-header">
        <div className="Header-btns">
          <Button outline color="secondary" size="sm" className="Header-btn">Submit</Button>
          <Button color="primary" size="sm" className="Header-btn">Registry</Button>
        </div>
        <img src="https://knownetwork.io/images/logo-white2x.png" className="App-logo" alt="logo" />
        <InputGroup className="Search-bar">
          <Input />
          <InputGroupAddon addonType="append" className="Search-icon">
            <InputGroupText>
              <img src={search} alt="Search icon"/>
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
