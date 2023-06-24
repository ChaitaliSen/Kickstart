import React, { Component} from "react";
import MyLayout from "../../components/Layout";
import { Button, Card, Grid } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";

class CampaignShow extends Component{

    static async getInitialProps(props) {
        console.log('cs');
        
        const campaign= Campaign(props.query.address);
        const summary= await campaign.methods.getSummary().call();
        
        return { 
            address:campaign,
            minimumContribution:summary[0],
            balance : summary[1],
            requestCount : summary[2],
            approversCount :summary[3],
            manager:summary[4],
        };
    }
    render(){
        const campaignAddress= this.props.address;
        return(
            <MyLayout>
                <h3> Campaign Show </h3>
                <Grid>
                    <Grid.Row>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                        <Link to=''></Link>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address}/>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </MyLayout>
        ) ;
    }

    renderCards(){
        var {
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props;

        if(manager==undefined||this.props==null){
            manager='stringvalue';
            
        }

        const items = [{
            header: minimumContribution,
            meta: 'minimum Contribution in wei',
            description:'You have to contribute minimum this amount to b an approver',
            style:{overflowWrap: 'break-word'}
        },
        {
            header: manager,
            meta: 'Address of manager',
            description:'The Manager created this campaign',
            style:{overflowWrap: 'break-word'}
        },
        {
            header: requestCount,
            meta: 'Number of requests',
            description:'A request tries to withdraw money from the contract. Requests must be approved',
            style:{overflowWrap: 'break-word'}
        },
        {
            header: approversCount,
            meta: 'Number of approvers',
            description:'Number of people who have already donated to this campaign',
            style:{overflowWrap: 'break-word'}
        },
        {
            header: web3.utils.fromWei(balance,'ether'),
            meta: 'Campaign Balance(ether)',
            description:'The balance is how much money this campaign has left to spent',
            style:{overflowWrap: 'break-word'}
        }];
        return <Card.Group items={items}></Card.Group>
    }   
}

export default CampaignShow;