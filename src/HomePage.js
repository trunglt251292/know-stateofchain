import React, { Component } from 'react';
import search from './baseline-search-24px.svg';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table,
} from 'reactstrap';
import { searchDiploma } from "./web3Util";

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
      selectedDiplomaTypeId: diplomaTypes[0].id, // select first item
      selectedDiplomaFullName: '',
      selectedDiplomaBirthDay: '',
      selectedDiplomaReleaseDate: '',
      modalDiplomaNotFound: false,
      modalDiplomaFound: false,
      currentDiploma: null,
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

  toggleModalDiplomaNotFound = () => {
    this.setState(prevState => ({ modalDiplomaNotFound: ! prevState.modalDiplomaNotFound }));
  };

  toggleModalDiplomaFound = (currentDiploma) => {
    this.setState(prevState => ({ modalDiplomaFound: ! prevState.modalDiplomaFound, currentDiploma: currentDiploma }));
  };

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
    searchDiploma(this.state.searchContent).then( diploma => {
      console.log('diploma found:', diploma);
      this.toggleModalDiplomaFound(diploma);
    }).catch(error => {
      console.log('diploma not found:', error);
      this.toggleModalDiplomaNotFound();
    });
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

  handleDiplomaFullNameChange = (e) => {
    this.setState({ selectedDiplomaFullName: e.target.value });
  };

  handleDiplomaBirthDayChange = (e) => {
    this.setState({ selectedDiplomaBirthDay: e.target.value });
  };

  handleDiplomaReleaseDateChange = (e) => {
    this.setState({ selectedDiplomaReleaseDate: e.target.value });
  };

  renderModalSubmit() {
    return <Modal isOpen={this.state.modalSubmit} toggle={this.toggleModalSubmit}>
      <ModalHeader toggle={this.toggleModalSubmit}>Submit new Diploma</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="diplomaFullName">Full name</Label>
            <Input onChange={this.handleDiplomaFullNameChange} type="text" name="diplomaFullName" id="diplomaFullName" placeholder="Full name?" />
          </FormGroup>
          <FormGroup>
            <Label for="diplomaBirthDay">Birth day</Label>
            <Input onChange={this.handleDiplomaBirthDayChange} type="text" name="diplomaBirthDay" id="diplomaBirthDay" placeholder="Birth day?" />
          </FormGroup>
          <FormGroup>
            <Label for="diplomaReleaseDate">Release date</Label>
            <Input onChange={this.handleDiplomaReleaseDateChange} type="text" name="diplomaReleaseDate" id="diplomaReleaseDate" placeholder="Release date?" />
          </FormGroup>
          <FormGroup>
            <Label for="diplomaType">Diploma type</Label>
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

  renderModalDiplomaFound() {
    const { currentDiploma } = this.state;
    if ( ! currentDiploma ) {
      console.log('currentDiploma is not defined');
      return null;
    }
    return <Modal isOpen={this.state.modalDiplomaFound} toggle={this.toggleModalDiplomaFound}>
      <ModalHeader toggle={this.toggleModalDiplomaFound}>Diploma details</ModalHeader>
      <ModalBody>
        <Table>
          <tbody>
            <tr>
              <th scope="row">From:</th>
              <td>{currentDiploma.organizer}</td>
            </tr>
            <tr>
              <th scope="row">For:</th>
              <td>{currentDiploma.fullName}</td>
            </tr>
            <tr>
              <th scope="row">Birth day:</th>
              <td>{currentDiploma.birthDay}</td>
            </tr>
            <tr>
              <th scope="row">Release date:</th>
              <td>{currentDiploma.date}</td>
            </tr>
            <tr>
              <th scope="row">Type:</th>
              <td>{currentDiploma._type}</td>
            </tr>
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={this.toggleModalDiplomaFound}>Ok</Button>
      </ModalFooter>
    </Modal>;
  }

  renderNotFoundDiploma() {
    return (
      <Modal isOpen={this.state.modalDiplomaNotFound} toggle={this.toggleModalDiplomaNotFound}>
        <ModalHeader toggle={this.toggleModalDiplomaNotFound}>Diploma not found</ModalHeader>
        <ModalBody>
          We cannot find your diploma by this id, please check your id is correct and try again
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleModalDiplomaNotFound}>Ok</Button>
        </ModalFooter>
      </Modal>
    );
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
          <InputGroupAddon onClick={this.handleSearch} addonType="append" className="Search-icon">
            <InputGroupText>
              <img src={search} alt="Search icon"/>
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <span className="App-link">
          Search for Distributed Certifications and Degrees
        </span>
        {
          this.renderModalSubmit()
        }
        {
          this.renderModalRegistry()
        }
        {
          this.renderNotFoundDiploma()
        }
        {
          this.renderModalDiplomaFound()
        }
      </header>
    );
  }
}

export default HomePage;
