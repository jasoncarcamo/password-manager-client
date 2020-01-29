const TokenService = {
    getToken(){
        return window.localStorage.getItem("pass-user");
    },
    hasToken(){
        return TokenService.getToken();
    },
    saveToken(token){
        window.localStorage.setItem("pass-user", token);
    },
    deleteToken(){
        window.localStorage.removeItem("pass-user");
    }
};

export default TokenService;