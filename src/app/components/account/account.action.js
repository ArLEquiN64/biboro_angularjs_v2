class AccountAction {
    
    constructor($http,dispatcher) {

        this.ACCOUNT_LOGINED = "ACCOUNT_LOGINED";
        this.ACCOUNT_LOGOUT  = "ACCOUNT_LOGOUT";


        this._dispatcher = dispatcher;
        this._http       = $http;

        this.account = null;

    }

    registerFetchedLoginedAccountCallback(callback) {
        this._dispatcher.register(this.ACCOUNT_FETCHED_LOGINED_ACCOUNT,callback);
    }


    fetchLoginedAccount() {
        var self = this;

        self._http.get('/api/v1/account/userinfo/user.json')
            .success(function(data){
                self.account = data;
                self._dispatcher.dispatch(self.ACCOUNT_FETCHED_LOGINED_ACCOUNT, {"success":true,"result":"success","data":self.account});
            })
            .error(function(){
                console.log("Fail to get account data");
                self._dispatcher.dispatch(self.ACCOUNT_FETCHED_LOGINED_ACCOUNT, {"success":false,"result":"fail to fetch user info."});
            });
        
    }
}

export default AccountStore;
