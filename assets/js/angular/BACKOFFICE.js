var app = angular.module('started_project', ['angular.filter','socialLogin', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'pascalprecht.translate']);

//---BASE_URL----//
var BASE_URL = '//' + location.host + '/started_project_back/';

app.controller('ProjectBackController', ($scope) =>{
    console.log('Le back office est branché !');
    document.querySelector('#url_de_base').innerHTML=location.host + '/started_project_back/';
});