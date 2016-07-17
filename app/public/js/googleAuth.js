function onSuccess(googleUser) {
    var profile = googleUser.getBasicProfile();
    gapi.client.load('plus', 'v1', function () {
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });
        //Display the user details
        request.execute(function (resp) {
            var profileHTML = '<div class="profile"><div class="head">Welcome '+resp.name.givenName+'! <a href="javascript:void(0);" onclick="signOut();">Sign out</a></div>';
            profileHTML += '<img src="'+resp.image.url+'"/><div class="proDetails"><p>'+resp.displayName+'</p><p>'+resp.emails[0].value+'</p><p>'+resp.gender+'</p><p>'+resp.id+'</p><p><a href="'+resp.url+'">View Google+ Profile</a></p></div></div>';
            $('.userContent').html(profileHTML);
            $('#gSignIn').slideUp('slow');
            document.cookie = "googleEmail=" + resp.emails[0].value;
            document.cookie = "googleUser=" + resp.displayName;
            angular.element(document.getElementById('xhibitController')).scope().getUser();
        });
    });
}

function onFailure(error) {
    alert(error);
}

function renderButton() {
    gapi.signin2.render('gSignIn', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        $('.userContent').html('');
        $('#gSignIn').slideDown('slow');
    });
    document.cookie = "googleEmail=";
    document.cookie = "googleUser=";
    angular.element(document.getElementById('exhibitCtrl')).scope().getUser();
}

/*
function onSuccess(googleUser) {
                var profile = googleUser.getBasicProfile();
 
                gapi.client.load('plus', 'v1', function () {
                    var request = gapi.client.plus.people.get({
                        'userId': 'me'
                    });
                    //Display the user details
                    request.execute(function (resp) {
                        document.cookie = "googleEmail=" + resp.emails[0].value;
                        document.cookie = "googleUser=" + resp.displayName;
                        angular.element(document.getElementById('indexController')).scope().getUser();
                        
                    });
                });
                // $('#gSignIn').click(function(){
                //     var auth2 = gapi.auth2.getAuthInstance();
                //     auth2.disconnect();
                //     document.cookie = "googleEmail=";
                //     document.cookie = "googleUser=";
                //     angular.element(document.getElementById('indexController')).scope().getUser();
                // });
            }
            function onFailure(error) {
                alert(error);
            }
            function renderButton() {
                gapi.signin2.render('gSignIn', {
                    'scope': 'profile email',
                    'width': 240,
                    'height': 50,
                    'longtitle': true,
                    'theme': 'dark',
                    'onsuccess': onSuccess,
                    'onfailure': onFailure
                });
            }
            function signOut() {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.disconnect();
                document.cookie = "googleEmail=";
                document.cookie = "googleUser=";
                angular.element(document.getElementById('indexController')).scope().getUser();
            }
*/