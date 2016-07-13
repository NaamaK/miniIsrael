<?php

class GoogleAuth{
    protected $client;
    public function __construct(Google_Client $googleClient = null){
        $this->client = $googleClient;
        if($this->client){
            $this->client->setClientId('600513743709-hkr4mlebopa6rqn7q7u0m8p8pvaq7mod.apps.googleusercontent.com');
            $this->client->setClientSecret('iYoXAxJpGPwOyA27R7_tKw9T');
            $this->client->setRedirectUri('http://shenkar.html5-book.co.il/2015-2016/ws1/dev_181/index.php');
            $this->client->setScopes('email');
        }
    }

    public function isLoggedIn(){
        return isset($_SESSION['access_token']);
    }

    public function getAuthUrl(){
        return $this->client->createAuthUrl();
    }

    public function checkRedirectCode(){
        if(isset($_GET['code'])){
            $this->client->authenticate($_GET['code']);
            $this->setToken($this->client->getAccessToken());
            return true;
        }
        return false;
    }

    public function setToken($token){
        $_SESSION['access_token'] = $token;
        $this->client->setAccessToken($token);
    }

    public function logout(){
        unset($_SESSION['access_token']);
    }
}

?>