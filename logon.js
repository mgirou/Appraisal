
$(document).ready(function() {
    'use strict';
    var url = window.location.href.slice(0,4) === 'file' ?
        'http://localhost:61116/logon' : 'http://www.leadelitepro.com:61116/logon';
    document.getElementById('login-button').onclick = function() {
        var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        if($('#remember-me').prop('checked')){
            setCookie('username', $('#username').val(),1000) ;
        }
        xhr.open('POST',url, true);
        xhr.setRequestHeader("Content-Type", 'application/json');
        xhr.onreadystatechange = function () {
            if ((xhr.readyState === 4) && (xhr.status === 200)) {
                if (xhr.responseText != '') {
                    var str = JSON.parse(xhr.responseText).firstName;
                    window.location = './nextLayer/home/index.html?firstname=' + encodeURIComponent(str);
                } else {
                    alert('Error, please try again');
                    location.reload(true);
                }
            }
        };
        xhr.send(JSON.stringify({
            username : $('#username').val(),
            password : $('#password').val()
        }));
    };
    function setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires = 'expires='+d.toGMTString();
        document.cookie = cname + '=' + cvalue + '; ' + expires;
    }
    function getCookie(cname) {
        var name = cname + "=",
            ca = document.cookie.split(';'),
            i;
        for(i=0; i < ca.length; i++)
        {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return '';
    }
    $('#password').hover(function() {
        $(this).stop().fadeTo(400, 1);
    });
    $('#username').hover(function() {
        $(this).stop().fadeTo(400, 1);
    });
    $('#bottom-overlay').html('Lead Elite Pro is the latest in innovative technology designed to assist sales'  +
    " professionals in the two critical success areas of driving new business and producing <br> more from existing customers." +
    "The unique, easy to use platform quickly identifies new qualified sales prospects with targeted efficiency. " +
    "A market-tested sales script<br> shortens the time between contact to close. " +
    "Obtaining new business is one challenge, while increasing the value of existing business is another." +
    ' Lead Elite Pro offers<br> an effective "touch point" module that facilitates deeper client relationships ' +
    'through the simple concept of "added value without perceived cost". ' +
    'If increasing the efficiency <br>and effectiveness of your sales force is important, then Lead Elite Pro is the tool for you!' +
    "<br><br>So, logon and let's get started.");
    if(getCookie('username')) {
        $('#username').val(getCookie('username'));
        $('#username').stop().fadeTo(10, 1);
    }
    $('#password').val('');
    $('#remember-me').prop('checked', false);
});