import React, { Component } from 'react';
import Web3 from 'web3';
import search from './baseline-search-24px.svg';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
const ABI = require('./ABI');
const addressContract = '0xAf948b545C4721853EB01d9Ab81fE24E6f925695';

class HomePage extends Component {
  constructor() {
    super();
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
    this.handleRegistryButton = this.handleRegistryButton.bind(this);
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
    };
    this.web3 = {};
  }
  handleSubmitButton(){
    let Contract = new this.web3.eth.Contract(ABI.result, addressContract);
    console.log(Contract.methods);
    let data = Contract.methods.addNewDiploma('asdasd','25/12/1992','25/12/2010', '1','1').encodeABI();
    this.web3.eth.call({
      to:addressContract,
      data
    }).then(console.log);
  }
  handleRegistryButton(){
    let Contract = new this.web3.eth.Contract(ABI.result, addressContract);
    Contract.methods.organizerRegistration("Cong Nghiep", "HUI").send({
      from:'0xFDb924E9e26C1E44698737122A4bD76Aa2B82FAa',value:'2000000000000000000'
    }).then(function (rs) {
      console.log('Result : ',rs);
    });
  }
  toggleModalRegistry(){
    this.setState(prevState => ({ modalRegistry: ! prevState.modalRegistry }));
  }
  toggleModalSubmit() {
    this.setState(prevState => ({ modalSubmit: ! prevState.modalSubmit }));
  }
  handleRegistry(){
    // let web4 = new Web3(Web3.givenProvider || "http://localhost:3000");
    // console.log(web4);
    if(typeof window.web3 === 'undefined'){
      alert('Please install MetaMask Extension before use function this.')
    }else {
      this.web3 = new Web3(window.web3.currentProvider);
      this.toggleModalRegistry();
    }
  }
  handleSubmit(){
    if(typeof window.web3 !== 'undefined'){
      this.web3 = new Web3(window.web3.currentProvider);
      this.web3.eth.getAccounts((err,accounts)=>{
        if(err){
          alert('Error. Please try again')
        }else{
          if(accounts.length === 0){
            alert('Please login MetaMask before use function this. ')
          }else {
            console.log(accounts[0]);
            this.toggleModalSubmit();
          }
        }}
      )
    }else {
      alert('Please install MetaMask Extension before use function this.')
    }
  }

  // handleSubmit() {
  //   console.log('handleSubmit');
  //   this.toggleModalSubmit();
  // };
  //
  // handleRegistry() {
  //   console.log('handleRegistry');
  //   this.toggleModalRegistry();
  // };

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
        <Modal isOpen={this.state.modalSubmit} toggle={this.toggleModalSubmit}>
          <ModalHeader toggle={this.toggleModalSubmit}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmitButton}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggleModalSubmit}>Cancel</Button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.modalRegistry} toggle={this.toggleModalRegistry}>
          <ModalHeader toggle={this.toggleModalRegistry}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleRegistryButton}>Registry</Button>{' '}
            <Button color="secondary" onClick={this.toggleModalRegistry}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </header>
    );
  }
}

export default HomePage;
