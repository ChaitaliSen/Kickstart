import React, { Component } from 'react';
import {Form, Input, Message} from 'semantic-ui-react'
import { Button } from "semantic-ui-react";
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class ContributeForm extends Component{
    state = {
        value : ''
    }
    onSubmit=async event=>{
        event.preventDefault();
        const campaign = Campaign(this.props.address);

        try{
            const accounts= await web3.eth.getAccounts();
            console.log(accounts);
            console.log(this.state.value);
            await campaign.methods.contribute().send(accounts,{
                from: accounts[0],
                value: web3.utils.toWei('0','ether'),
            });
        }
        catch(err){
            console.log(err);
        }
    }
    render(){
        return(
        <Form onSubmit={this.onSubmit}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input label="ether" labelPosition="right"
                value={this.state.value}
                onChange={event=>this.setState({value:event.target.value})}
                ></Input>
            </Form.Field>
            <Button primary>
                Contribute!
            </Button>
        </Form>
        );
    }
}
export default ContributeForm;