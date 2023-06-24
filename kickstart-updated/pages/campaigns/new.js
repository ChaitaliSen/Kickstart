import React, { Component } from "react";
import { Form, Button, Label,Input, Message } from "semantic-ui-react";
import MyLayout from "../../Components/Layout";
import factory from "../../ethereum/factory"
import web3 from "../../ethereum/web3";
import {Router} from "../../routes";


class CampaignNew extends Component {

    state ={
        minimumContribution : 0,
        errorMessage: '',
        loading:false
    };
    // const onMinimumContributionChange = event => {
    //     setMinimumContribution(event.target.value);
    // };

    // const [minimumContribution, setMinimumContribution] = useState('');

     onSubmit = async (event)=>{
        event.preventDefault();

        this.setState({loading: true, errorMessage :''});
        try{
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        await factory.methods.createCampaign(this.state.minimumContribution)
            .send({
                from: accounts[0]
            });
            Router.pushRoute("/");
        }
        catch(err){
            this.setState({errorMessage:err.message});
            this.setState({loading: false});
        }
    };

    render(){
        return (
        <MyLayout>
         <h3>Create a Campaign</h3>
         <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
             <Form.Field>
                 <Label>Minimum Contribution</Label>
                 <Input 
                 value = {this.state.minimumContribution} label="wei" labelPosition="right"
                 onChange = {event => this.setState({MinimumContributionChange:event.target.value})}/>
             </Form.Field>
             <Message error header="oops!" content={this.state.errorMessage}/>
             <Button loading={this.state.loading} primary>Create!</Button>
         </Form>
        </MyLayout>
        );
    }
}

// export async function getServerSideProps() {
//     return {props: {}};
// }
export default CampaignNew;