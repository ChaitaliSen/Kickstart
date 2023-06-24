import React, { Component } from "react";
import Layout from "../../../Components/Layout";
import { Button } from "semantic-ui-react";
import {Link} from "next/link";

class RequestIndex extends Component{
    static async getInitialProps(props){
            const {address} = props.query;
            return {address};
    }
    render(){
        
        return(
            <Layout>
                {/* <Link href='/campaigns/new'>
                    <a> */}
                        <Button primary> Add Request </Button>
                    {/* </a>
                </Link> */}
                <h3>Request Lists</h3>
            </Layout>
        )
    }
}
export default RequestIndex;