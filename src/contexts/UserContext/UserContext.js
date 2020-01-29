import React from "react";
import TokenService from "../../services/TokenService/TokenService";

const UserContext = React.createContext({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    accounts: [],
    refreshAccounts: ()=>{},
    addAccounts: ()=>{},
    deleteAccount: ()=>{}
});

export default UserContext;

export class UserProvider extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id: "",
            first_name: "",
            last_name: "",
            email: "",
            accounts: [],
            error: ""
        };
    };

    componentDidMount(){
        if(TokenService.hasToken()){

            Promise.all([fetch("http://localhost:8000/api/user", {
                headers: {
                    "content-type": "application/json",
                    "authorization": `bearer ${TokenService.getToken()}`
                }
            }), fetch(`http://localhost:8000/api/accounts`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": `bearer ${TokenService.getToken()}`
                }
            })])
                .then( ([userRes, accountsRes]) => {
                    
                    if( !userRes.ok){
                        return userRes.json().then ( e => Promise.reject(e))
                    };

                    if(!accountsRes.ok){
                        return accountsRes.json().then( e => Promise.reject(e));
                    };

                    return Promise.all([userRes.json(), accountsRes.json()])
                })
                .then( ([userData, accountsData]) => {
                
                    this.setState({
                        id: userData.user.id,
                        first_name: userData.user.first_name,
                        last_name: userData.user.last_name,
                        email: userData.user.email,
                        accounts: accountsData.accounts
                    });

                })
                .catch( err => this.setState({ error: err.error}));      
        };
    };

    addAccounts = async (account)=>{
        const accounts = this.state.accounts.concat([account]);
        
        this.componentDidMount();

        return await accounts
    }

    refreshAccounts = async (account, id)=>{
        this.componentDidMount();

        let accounts = this.state.accounts;
        let index = accounts.findIndex( account => account.id == id);

        accounts.splice( index, 1, account);
        
        return await accounts;
    }

    deleteAccount= async (id)=>{
        this.componentDidMount();

        let accounts = this.state.accounts;
        let index = accounts.findIndex( account => account.id == id);

        accounts.splice( index, 1);
        
        return await accounts;
    }

    render(){
        
        const value = {
            id: this.state.id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            accounts: this.state.accounts,
            addAccounts: this.addAccounts,
            refreshAccounts: this.refreshAccounts,
            deleteAccount: this.deleteAccount
        };

        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        );
    };
};