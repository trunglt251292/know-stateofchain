import React, { Component } from 'react';
import search from './baseline-search-24px.svg';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

const diplomaTypes = [
  {
    id: 'certification',
    name: 'Certification',
  },
  {
    id: 'degree',
    name: 'Degree',
  },
];

class HomePage extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegistry = this.handleRegistry.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.toggleModalSubmit = this.toggleModalSubmit.bind(this);
    this.toggleModalRegistry = this.toggleModalRegistry.bind(this);
    this.state = {
      searchContent: '',
      modalSubmit: false,
      modalRegistry: false,
      organizationName: '',
      organizationCode: '',
      dropdownOpen: false,
      selectedDiplomaTypeId: diplomaTypes[0].id,
    };
  }

  toggleModalSubmit() {
    this.setState(prevState => ({ modalSubmit: ! prevState.modalSubmit }));
  }

  toggleDropdown = () => {
    this.setState(prevState => ({ dropdownOpen: ! prevState.dropdownOpen }));
  };

  toggleModalRegistry() {
    this.setState(prevState => ({
      modalRegistry: ! prevState.modalRegistry,
      organizationName: '',
      organizationCode: '',
    }));
  }

  handleSubmit() {
    console.log('handleSubmit');
    this.toggleModalSubmit();
  };

  handleRegistry() {
    console.log('handleRegistry', this.state);
    this.toggleModalRegistry();
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

  handleOrganizationNameChange = (e) => {
    this.setState({ organizationName: e.target.value });
  };

  handleOrganizationCodeChange = (e) => {
    this.setState({ organizationCode: e.target.value });
  };

  handleSelectDiplomaType = (diplomaTypeId) => {
    console.log('handleSelectDiplomaType:', diplomaTypeId);
    this.setState({ selectedDiplomaTypeId: diplomaTypeId });
  };

  renderModalRegistry() {
    return (
      <Modal isOpen={this.state.modalRegistry} toggle={this.toggleModalRegistry}>
        <ModalHeader toggle={this.toggleModalRegistry}>Registry your organization</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="organizationName">Organization Name</Label>
              <Input onChange={this.handleOrganizationNameChange} type="text" name="organizationName" id="organizationName" placeholder="Your organization?" />
            </FormGroup>
            <FormGroup>
              <Label for="organizationCode">Organization Code</Label>
              <Input onChange={this.handleOrganizationCodeChange} type="text" name="organizationCode" id="organizationCode" placeholder="Your code?" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleModalRegistry}>Cancel</Button>{' '}
          <Button color="primary" onClick={this.handleRegistry}>Submit</Button>
        </ModalFooter>
      </Modal>
    );
  }

  renderModalSubmit() {
    return <Modal isOpen={this.state.modalSubmit} toggle={this.toggleModalSubmit}>
      <ModalHeader toggle={this.toggleModalSubmit}>Submit new Diploma</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="organizationName">Full name</Label>
            <Input onChange={this.handleOrganizationNameChange} type="text" name="organizationName" id="organizationName" placeholder="Full name?" />
          </FormGroup>
          <FormGroup>
            <Label for="organizationCode">Birth day</Label>
            <Input onChange={this.handleOrganizationCodeChange} type="text" name="organizationCode" id="organizationCode" placeholder="Birth day?" />
          </FormGroup>
          <FormGroup>
            <Label for="organizationCode">Release date</Label>
            <Input onChange={this.handleOrganizationCodeChange} type="text" name="organizationCode" id="organizationCode" placeholder="Release date?" />
          </FormGroup>
          <FormGroup>
            <Label for="organizationCode">Diploma type</Label>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
              <DropdownToggle caret>
                Diploma types
              </DropdownToggle>
              <DropdownMenu>
                {
                  diplomaTypes.map(diplomaType => (
                    <DropdownItem
                      key={diplomaType.id}
                      active={this.state.selectedDiplomaTypeId === diplomaType.id}
                      onClick={this.handleSelectDiplomaType.bind(this, diplomaType.id)}>
                      {diplomaType.name}
                    </DropdownItem>
                  ))
                }
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.handleSubmit}>Submit</Button>{' '}
        <Button color="secondary" onClick={this.toggleModalSubmit}>Cancel</Button>
      </ModalFooter>
    </Modal>;
  }

  render() {
    return (
      <header className="App-header">
        <div className="Header-btns">
          <Button outline color="secondary" size="sm" className="Header-btn" onClick={this.toggleModalSubmit}>Submit new Diploma</Button>
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
        {
          this.renderModalSubmit()
        }
        {
          this.renderModalRegistry()
        }
      </header>
    );
  }
}

export default HomePage;
