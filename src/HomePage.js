import React, { Component } from 'react';
import Web3 from 'web3';
import search from './baseline-search-24px.svg';
import {
  Button, InputGroup, InputGroupAddon, InputGroupText, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table,
} from 'reactstrap';
import { searchDiploma } from "./web3Util";

const ABI = require('./ABI');
const addressContract = '0x5f303d3951602ed296053b60e62f79605707664a';

const diplomaTypes = {
  Certificate: 0,
  Bachelor: 1,
  Master: 2,
  Doctorate: 3
};

const diplomaRank = {
  Excellent: 0,
  Good: 1,
  Fair: 2
};

const diplomaStatus = {
  Activated: 0,
  Expired: 1,
  Destroyed: 2
};

class HomePage extends Component {
  constructor () {
    super();
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
    this.handleRegistryButton = this.handleRegistryButton.bind(this);
    this.handleButtonSubmit = this.handleButtonSubmit.bind(this);
    this.handleButtonRegistry = this.handleButtonRegistry.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDiplomaIdDegreeChange = this.handleDiplomaIdDegreeChange.bind(this);
    this.handleDiplomaStatusChange = this.handleDiplomaStatusChange.bind(this);
    this.handleDiplomaRankChange = this.handleDiplomaRankChange.bind(this);
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
      selectedDiplomaTypeId: diplomaTypes['Certificate'], // select first item
      diplomaRank: diplomaRank['Excellent'],
      diplomaStatus: diplomaStatus['Activated'],
      diplomaStatus1: diplomaStatus['Activated'],
      selectedDiplomaFullName: '',
      selectedDiplomaBirthDay: '',
      selectedDiplomaReleaseDate: '',
      modalDiplomaNotFound: false,
      modalDiplomaFound: false,
      currentDiploma: null,
      codeDiploma: '',
      rank: '',
    };
    this.web3 = {};
  }

  async handleSubmitButton () {
    let Contract = new this.web3.eth.Contract(ABI.result, addressContract);
    const {
      codeDiploma,
      selectedDiplomaTypeId,
      selectedDiplomaFullName,
      selectedDiplomaBirthDay,
      selectedDiplomaReleaseDate,
      diplomaStatus,
      diplomaRank
    } = this.state;
    //console.log('aaaa', Contract.methods);
    let account = await this.web3.eth.getAccounts();
    Contract.methods.addNewDiploma(
      parseInt(codeDiploma),
      selectedDiplomaFullName,
      selectedDiplomaBirthDay,
      selectedDiplomaReleaseDate,
      parseInt(diplomaStatus),
      parseInt(selectedDiplomaTypeId),
      parseInt(diplomaRank)
    ).send({
      from: account[0]
    }).then((res) => {
      alert(`You had successfully create a diploma with id: ${res.events.AddNewDiploma.returnValues._id}`);
      this.setState({
        modalRegistry: false
      })
    });
  }

  async handleRegistryButton () {
    let Contract = new this.web3.eth.Contract(ABI.result, addressContract);
    // console.log(this.web3.eth.accounts);
    let account = await this.web3.eth.getAccounts();
    Contract.methods.organizerRegistration(this.state.organizationName, this.state.organizationCode).send({
      from: account[0],
      value: '2000000000000000000'
    }).then(function (rs) {
      console.log('Result : ', rs);
    });
  }

  toggleModalSubmit () {
    this.setState(prevState => ({ modalSubmit: !prevState.modalSubmit }));
  }

  toggleDropdown = () => {
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
  };
  toggleDropdown1 = () => {
    this.setState(prevState => ({ dropdownOpen1: !prevState.dropdownOpen1 }));
  };
  toggleDropdown2 = () => {
    this.setState(prevState => ({ dropdownOpen2: !prevState.dropdownOpen2 }));
  };
  toggleDropdown3 = () => {
    this.setState(prevState => ({ dropdownOpen3: !prevState.dropdownOpen3 }));
  };

  toggleModalRegistry () {
    this.setState(prevState => ({
      modalRegistry: !prevState.modalRegistry,
      organizationName: '',
      organizationCode: '',
    }));
  }

  toggleModalDiplomaNotFound = () => {
    this.setState(prevState => ({ modalDiplomaNotFound: !prevState.modalDiplomaNotFound }));
  };

  toggleModalDiplomaFound = (currentDiploma) => {
    this.setState(prevState => ({
      modalDiplomaFound: !prevState.modalDiplomaFound,
      currentDiploma: currentDiploma
    }));
  };

  handleButtonRegistry () {

    if (typeof window.web3 === 'undefined') {
      alert('Please install MetaMask Extension before use function this.')
    } else {
      this.web3 = new Web3(window.web3.currentProvider);
      this.toggleModalRegistry();
    }
  }

  handleButtonSubmit () {
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
      this.web3.eth.getAccounts((err, accounts) => {
          if (err) {
            alert('Error. Please try again')
          } else {
            if (accounts.length === 0) {
              alert('Please login MetaMask before use this function. ')
            } else {
              console.log(accounts[0]);
              this.toggleModalSubmit();
            }
          }
        }
      )
    } else {
      alert('Please install MetaMask Extension before use function this.')
    }
  }

  async handleSearch () {
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
      this.web3.eth.getAccounts((err, accounts) => {
          if (err) {
            alert('Error. Please try again')
          } else {
            if (accounts.length === 0) {
              alert('Please login MetaMask before use this function. ')
            } else {
              console.log('Account : ', accounts[0]);
              console.log(this.state.searchContent);
              let Contract = new this.web3.eth.Contract(ABI.result, addressContract);
              Contract.methods.searchDiplomaByID(this.state.searchContent).send({
                from: accounts[0]
              }).then((rs) =>{
                console.log('Result : ', rs);
                if (!rs.events){
                  this.toggleModalDiplomaNotFound();
                }
                const {returnValues} = rs.events.SearchDiplomaByID;
                this.toggleModalDiplomaFound({
                  birthDay: returnValues.birthDay,
                  date: returnValues.date,
                  diplomaId: returnValues.diplomaStatus,
                  fullName: returnValues.fullName,
                  id: returnValues.id,
                  organizer: returnValues.organizer,
                  rank: returnValues.rank,
                  status: returnValues.status,
                  _type: returnValues._type,
                });
              });
            }
          }
        }
      )
    } else {
      alert('Please install MetaMask Extension before use function this.')
    }
  };

  handleSearchChange (e) {
    this.setState({ searchContent: e.target.value });
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.handleSearch();
    }
  };
  handleDiplomaStatusChange = e => {
    this.setState({
      diplomaStatus: diplomaStatus[e]
    })
  };

  handleDiploma1StatusChange = e => {
    this.setState({
      diplomaStatus1: diplomaStatus[e]
    })
  };

  handleDiplomaIdDegreeChange = (e) => {
    this.setState({ codeDiploma: e.target.value });
  };

  handleDiplomaRankChange = (e) => {
    console.log(e);
    this.setState({ diplomaRank: diplomaRank[e] });
  };

  handleOrganizationNameChange = (e) => {
    this.setState({ organizationName: e.target.value });
  };

  handleOrganizationCodeChange = (e) => {
    this.setState({ organizationCode: e.target.value });
  };

  handleSelectDiplomaType = (diplomaTypeId) => {
    console.log('handleSelectDiplomaType:', diplomaTypeId);
    this.setState({ selectedDiplomaTypeId: diplomaTypes[diplomaTypeId] });
  };

  renderModalRegistry () {
    return (
      <Modal isOpen={this.state.modalRegistry} toggle={this.toggleModalSubmit}>
        <ModalHeader toggle={this.toggleModalRegistry}>Registry your organization</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="organizationName">Organization Name</Label>
              <Input onChange={this.handleOrganizationNameChange} type="text" name="organizationName"
                     id="organizationName" placeholder="Your organization?"/>
            </FormGroup>
            <FormGroup>
              <Label for="organizationCode">Organization Code</Label>
              <Input onChange={this.handleOrganizationCodeChange} type="text" name="organizationCode"
                     id="organizationCode" placeholder="Your code?"/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleModalRegistry}>Cancel</Button>{' '}
          <Button color="primary" onClick={this.handleRegistryButton}>Submit</Button>
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

  renderModalSubmit () {
    return <Modal isOpen={this.state.modalSubmit} toggle={this.handleButtonSubmit}>
      <ModalHeader toggle={this.toggleModalSubmit}>Submit new Diploma</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="diplomaFullName">Full name</Label>
            <Input onChange={this.handleDiplomaFullNameChange} type="text" name="diplomaFullName" id="diplomaFullName"
                   placeholder="Full name?"/>
          </FormGroup>
          <FormGroup>
            <Label for="diplomaBirthDay">Birth day</Label>
            <Input onChange={this.handleDiplomaBirthDayChange} type="text" name="diplomaBirthDay" id="diplomaBirthDay"
                   placeholder="Birth day?"/>
          </FormGroup>
          <FormGroup>
            <Label for="diplomaReleaseDate">Release date</Label>
            <Input onChange={this.handleDiplomaReleaseDateChange} type="text" name="diplomaReleaseDate"
                   id="diplomaReleaseDate" placeholder="Release date?"/>
          </FormGroup>
          <FormGroup>
            <Label for="diplomaReleaseDate">ID Degree</Label>
            <Input onChange={this.handleDiplomaIdDegreeChange} type="text" name="idDegree"
                   id="diplomaReleaseDate" placeholder="Id of degree?"/>
          </FormGroup>
          <FormGroup>
            <Label for="diplomaType">Diploma type</Label>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
              <DropdownToggle caret>
                {Object.keys(diplomaTypes).find(key => diplomaTypes[key] === this.state.selectedDiplomaTypeId)}
              </DropdownToggle>
              <DropdownMenu>
                {
                  Object.keys(diplomaTypes).map(key => (
                    <DropdownItem
                      key={key}
                      active={this.state.selectedDiplomaTypeId === key}
                      onClick={this.handleSelectDiplomaType.bind(this, key)}>
                      {key}
                    </DropdownItem>
                  ))
                }
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <Label for="diplomaRank">Diploma rank</Label>
            <Dropdown isOpen={this.state.dropdownOpen1} toggle={this.toggleDropdown1}>
              <DropdownToggle caret>
                {Object.keys(diplomaRank).find(key => diplomaRank[key] === this.state.diplomaRank)}
              </DropdownToggle>
              <DropdownMenu>
                {
                  Object.keys(diplomaRank).map(key => (
                    <DropdownItem
                      key={key}
                      active={this.state.diplomaRank === key}
                      onClick={this.handleDiplomaRankChange.bind(this, key)}>
                      {key}
                    </DropdownItem>
                  ))
                }
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <Label for="diplomaStatus">Diploma Status</Label>
            <Dropdown isOpen={this.state.dropdownOpen2} toggle={this.toggleDropdown2}>
              <DropdownToggle caret>
                {Object.keys(diplomaStatus).find(key => diplomaStatus[key] === this.state.diplomaStatus)}
              </DropdownToggle>
              <DropdownMenu>
                {
                  Object.keys(diplomaStatus).map(key => (
                    <DropdownItem
                      key={key}
                      active={this.state.diplomaStatus === key}
                      onClick={this.handleDiplomaStatusChange.bind(this, key)}>
                      {key}
                    </DropdownItem>
                  ))
                }
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.handleSubmitButton}>Submit</Button>{' '}
        <Button color="secondary" onClick={this.toggleModalSubmit}>Cancel</Button>
      </ModalFooter>
    </Modal>;
  }

  renderModalDiplomaFound () {
    const { currentDiploma } = this.state;
    if (!currentDiploma) {
      console.log('currentDiploma is not defined');
      return null;
    }
    return <Modal isOpen={this.state.modalDiplomaFound} toggle={this.toggleModalDiplomaFound}>
      <ModalHeader toggle={this.toggleModalDiplomaFound}>Diploma details</ModalHeader>
      <ModalBody>
        <Table>
          <tbody>
          <tr>
            <th scope="row">Id:</th>
            <td>{currentDiploma.id}</td>
          </tr>
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
            <td>{Object.keys(diplomaTypes).find(key => diplomaStatus[key] ==currentDiploma._type)}</td>
          </tr>
          <tr>
            <th scope="row">Status:</th>
            <td>{Object.keys(diplomaStatus).find(key => diplomaStatus[key] ==currentDiploma.status)}</td>

          </tr>
          <tr>
            <th scope="row">Rank:</th>
            <td>{Object.keys(diplomaRank).find(key => diplomaStatus[key] ==currentDiploma.rank)}</td>
          </tr>
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={this.toggleModalDiplomaFound}>Ok</Button>
      </ModalFooter>
    </Modal>;
  }

  renderNotFoundDiploma () {
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

  toggleModalUpdate = () => {
    this.setState(prevState => ({
      updateModalOpen: !prevState.updateModalOpen
    }))
  };

  handleChangeIdUpdate = (e) => {
    this.setState({
      updateId: e.target.value
    })
  };

  renderUpdateModal () {
    return (
      <Modal isOpen={this.state.updateModalOpen} toggle={this.toggleModalUpdate}>
        <ModalHeader>Update Diploma</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="Diplomaid">Diploma id</Label>
              <Input onChange={this.handleChangeIdUpdate} type="text"
                     name="Diplomaid" id="Diplomaid"
                     placeholder="Id?"/>
            </FormGroup>
            <FormGroup>
              <Label for="diplomaStatus">New Diploma Status</Label>
              <Dropdown isOpen={this.state.dropdownOpen3} toggle={this.toggleDropdown3}>
                <DropdownToggle caret>
                  {Object.keys(diplomaStatus).find(key => diplomaStatus[key] === this.state.diplomaStatus1)}
                </DropdownToggle>
                <DropdownMenu>
                  {
                    Object.keys(diplomaStatus).map(key => (
                      <DropdownItem
                        key={key}
                        active={this.state.diplomaStatus1 === key}
                        onClick={this.handleDiploma1StatusChange.bind(this, key)}>
                        {key}
                      </DropdownItem>
                    ))
                  }
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleModalUpdate}>Cancel</Button>
          <Button color="secondary" onClick={this.handleUpdateDiploma}>Update</Button>
        </ModalFooter>
      </Modal>
    );
  }

  handleUpdateDiploma = async () => {
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
      this.web3.eth.getAccounts((err, accounts) => {
          if (err) {
            alert('Error. Please try again')
          } else {
            if (accounts.length === 0) {
              alert('Please login MetaMask before use this function. ')
            } else {
              let Contract = new this.web3.eth.Contract(ABI.result, addressContract);
              Contract.methods.updateDiploma(this.state.updateId, this.state.diplomaStatus1).send({
                from: accounts[0]
              }).then((rs)=> {
                console.log('update result : ', rs);
                if (rs.events) alert(`update for diploma id:${this.state.updateId}`);
                this.setState({
                  updateId: '',
                  diplomaStatus1: diplomaStatus['Activated']
                })
              });
            }
          }
        }
      )
    } else {
      alert('Please install MetaMask Extension before use function this.')
    }

  };

  render () {

    return (
      <div style={{ position: 'relative' }}>
        <header className="App-header">
          <div className="Header-btns">
            <Button outline
                    color="primary"
                    size="sm"
                    className="Header-btn"
                    onClick={this.toggleModalUpdate}
            >Update diploma</Button>
            <Button outline color="primary" size="sm"
                    className="Header-btn"
                    onClick={this.handleButtonSubmit}>Submit
              new Diploma</Button>
            <Button color="primary" size="sm" className="Header-btn"
                    onClick={this.handleButtonRegistry}>Register</Button>
          </div>
          <img src="https://knownetwork.io/images/logo-white2x.png" className="App-logo" alt="logo"/>
          <InputGroup className="Search-bar">
            <Input value={this.state.searchContent} onKeyPress={this.handleKeyPress}
                   onChange={this.handleSearchChange}/>
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
          {
            this.renderUpdateModal()
          }
        </header>

      </div>
    );
  }
}

export default HomePage;
