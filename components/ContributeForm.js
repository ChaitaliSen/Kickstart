import React, { Component } from 'react';
import {Form, Input, Message} from 'semantic-ui-react'
import { Button } from "semantic-ui-react";
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class ContributeForm extends Component{
    state = {
        value : '',
        errorMessage :'',
        loading : false
    }
    onSubmit=async event=>{
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        this.setState({loading:true});
        try{
            const accounts= await web3.eth.getAccounts();
            console.log(accounts);
            await campaign.methods.contribute().send(accounts,{
                from: accounts[0],
                value: web3.utils.toWei(this.state.value,'wei'),
            });

        Router.replaceRouter(`/campaigns/${this.props.address}`);
        }
        catch(err){
            console.log(err);
            this.setState({errorMessage: err.toString()});
        }
        this.setState({loading:false, value:''});
    }
    render(){
        return(
        <Form onSubmit={this.onSubmit} error={this.state.errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input label="ether" labelPosition="right"
                value={this.state.value}
                onChange={event=>this.setState({value:event.target.value})}
                ></Input>
            </Form.Field>
            <Message error header="oops!" content={this.state.errorMessage}/>
            <Button primary loading={this.state.loading}>
                Contribute!
            </Button>
        </Form>
        );
    }
}
export default ContributeForm;