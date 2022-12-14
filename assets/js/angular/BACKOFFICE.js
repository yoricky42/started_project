var app = angular.module('flamma', ['angular.filter','socialLogin', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'pascalprecht.translate']);


//---BASE_URL----//
var BASE_URL = 'http://localhost/flamma_back/public/';

var imgupload = 'images/upload.jpg';
var tokenDeflamma = '';
var tokenDeflammaValCompte = '';

app.factory('userLogged', function ($http, $q, $cookies, $location)
{
    console.log('Dans l\'initialisation des fonctions');
    var urlEnCours = $location.absUrl().split('?')[0];
    var urlEnCours2 = $location.absUrl();

    // REINITIALISATION MOT DE PASSE
    var res = window.location.pathname;
    console.log('aaa='+urlEnCours+'//ffff'+urlEnCours2);

    var searchTerm = 'tokenflamma';
    var reponse = urlEnCours2.indexOf(searchTerm);
    var indexToken, getToken;
    if(reponse !== -1)
    {
        indexToken = urlEnCours2.indexOf('tokenflamma');
        getToken = urlEnCours2.substring(indexToken+(searchTerm.length+1), urlEnCours2.length);
        console.log('token forgot pwd=', getToken);
        tokenDeflamma = getToken;
    }

    // ACTIVATION COMPTE
    searchTerm = 'tokenactivationflamma';
    reponse = urlEnCours2.indexOf(searchTerm);
    if(reponse !== -1)
    {
        indexToken = urlEnCours2.indexOf(searchTerm);
        getToken = urlEnCours2.substring(indexToken+(searchTerm.length+1), urlEnCours2.length);
        console.log('token validation cmp=', getToken);
        tokenDeflammaValCompte = getToken;
        if(tokenDeflammaValCompte === '')
        {
            iziToast.error({
                title: '',
                message: 'Token incorrect',
                position: 'topRight'
            });
        }
        else
        {
            var databi = { token: tokenDeflammaValCompte };
            $http({
                url: BASE_URL + 'activation_compte',
                method: 'POST',
                data: databi,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (data)
            {
                if (data.data.errors)
                {
                    iziToast.error({
                        title: '',
                        message: data.data.errors,
                        position: 'topRight'
                    });
                }
                else
                {
                    iziToast.success({
                        title: '',
                        message: data.data.message,
                        position: 'topRight'
                    });
                    var urlRedirection = "index.html";
                    setTimeout(function () {
                        window.location.href = urlRedirection;
                    }, 500);
                }
            })
        }
    }

    var factory =
    {
        pathCookie: {path:'/'},
        data: false,
        loginUser: function (userData) {
            $cookies.putObject('userData', userData,factory.pathCookie);
        },
        isLogged: function () {
            return $cookies.getObject('userData');
        },
        LogOut: function ($scope) {
            console.log('Dans LOGOUT');
            //$cookies.putObject('userData', null);
            $cookies.remove('userData',factory.pathCookie);
            //$scope.userConnected = null;
        },
        getElementPaginated: function (element, listeattributs) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: BASE_URL + 'graphql?query={' + element + '{metadata{total,per_page,current_page,last_page},data{' + listeattributs + '}}}'
            }).then(function successCallback(response) {
                factory.data = response['data']['data'][!element.indexOf('(') != -1 ? element.split('(')[0] : element];
                deferred.resolve(factory.data);
            }, function errorCallback(error) {
                console.log('erreur serveur', error);
                deferred.reject(error);
            });
            return deferred.promise;
        }
    };
    return factory;
});

app.factory('Init', function ($http, $q) {
    var factory =
    {
        data: false,
        loginUser: function (data) {
            console.log('Dans login');
            var deferred = $q.defer();
            $http({
                url: BASE_URL + 'connexion',
                method: 'POST',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {

                factory.data = response['data'];
                deferred.resolve(factory.data);
            }, function errorCallback(response) {
                    console.log('erreur lors de la connexion', response);
                    deferred.reject("Erreur lors de la connexion");
                });
            return deferred.promise;
        },
        passwordReset: function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: BASE_URL + 'password_reset/',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                factory.data = response['data'];
                deferred.resolve(factory.data);
            }, function errorCallback(response) {
                    console.log('erreur lors de la connexion', response);
                    deferred.reject("Erreur lors de la connexion");
                });
            return deferred.promise;
        },
        activationAccount: function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: BASE_URL + 'validation_compte/',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                factory.data = response['data'];
                deferred.resolve(factory.data);
            }, function errorCallback(response) {
                    console.log('erreur lors de la connexion', response);
                    deferred.reject("Erreur lors de la connexion");
                });
            return deferred.promise;
        },
        getElement:function (element,listeattributs, is_graphQL=true, dataget=null)
        {
            var deferred=$q.defer();
            console.log(dataget);
            $http({
                method: 'GET',
                url: BASE_URL + (is_graphQL ? 'graphql?query= {'+element+' {'+listeattributs+'} }' : element),
                headers: {
                    'Content-Type': 'application/json'
                },
                data:dataget
            }).then(function successCallback(response)
            {
                /*lorsque la requete contient des param??tres, il faut decouper pour recup??rer le tableau*/
                if (is_graphQL)
                {
                    factory.data = response['data']['data'][!element.indexOf('(')!=-1 ? element.split('(')[0] : element];
                }
                else
                {
                    factory.data = response['data'];
                }
                deferred.resolve(factory.data);
            }, function errorCallback(error) {
                console.log('erreur serveur', error);
                deferred.reject(error);
            });
            return deferred.promise;
        },
        getElementPaginated:function (element,listeattributs)
        {
            var deferred=$q.defer();
            $http({
                method: 'GET',
                url: BASE_URL + 'graphql?query={'+element+'{metadata{total,per_page,current_page,last_page},data{'+listeattributs+'}}}'
            }).then(function successCallback(response) {
                factory.data=response['data']['data'][!element.indexOf('(')!=-1 ? element.split('(')[0] : element];
                deferred.resolve(factory.data);
            }, function errorCallback(error) {
                console.log('erreur serveur', error);
                deferred.reject(error);
            });
            return deferred.promise;
        },
        saveAccount: function (data, is_an_update) {
            console.log('Dans inscription');

            var deferred=$q.defer();
            $.ajax
            (
                {
                    url: BASE_URL + (!is_an_update ? 'inscription' : 'update-user'),
                    type:'POST',
                    contentType:false,
                    processData:false,
                    DataType:'text',
                    data:data,
                    beforeSend: function()
                    {
                        //$('#modal_add'+element).blockUI_start();
                    },success:function(response)
                    {
                        console.log('retour saveaccount', response);

                        factory.data=response['data'];
                        if (response['data']==null)
                        {
                            factory.data=response;
                        }
                        //$('#modal_add'+element).blockUI_stop();

                        deferred.resolve(factory.data);
                    },
                    error:function (error)
                    {
                        //$('#modal_add' + element).blockUI_stop();
                        console.log('erreur serveur', error);
                        deferred.reject(msg_erreur);

                    }
                }
            );
            return deferred.promise;

        }
    };
    return factory;
});

// Pour mettre les espaces sur les montants
app.filter('convertMontant', [
    function () { // should be altered to suit your needs
        return function (input) {
            input = input + "";
            return input.replace(/,/g, " ");
        };
    }]);


app.filter('changeDate', [ '$translate',
    function ($translate) { // should be altered to suit your needs
        return function (input) {
            input = input + "";

            var find = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            var replace = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

            return $translate.use().match('en') ? input : input.replaceArray(find, replace);

        };
    }]);


app.filter('changeDatePart', [ '$translate',
    function ($translate) { // should be altered to suit your needs
        return function (input) {
            input = input + "";

            var find = ['Mond', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            var replace = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

            return $translate.use().match('en') ? input : input.replaceArray(find, replace);

        };
    }]);


app.factory('panier', function ($http, $q, $cookies) {
    var cookieName = 'panier_yv';
    var factory =
        {
            data: false,
            update: function (panier) {
                $cookies.putObject(cookieName, panier);
            },
            get: function () {
                return $cookies.getObject(cookieName) == null ? [] : $cookies.getObject(cookieName);
            },
            remove: function () {
                $cookies.remove('panier_yv');
            }
        };
    return factory;
});

app.factory('panierLocalStorage', function ($http, $q) {
    var localname = 'panier_flamma';
    var factory =
        {
            data: false,
            update: function (panier) {
                localStorage.setItem(localname, JSON.stringify(panier));
            },
            get: function () {
                return localStorage.getItem(localname) == null ? [] : JSON.parse(localStorage.getItem(localname));
            },
            remove: function () {
                localStorage.remove(localname);
            }
        };
    return factory;
});

// Configuration du routage au niveau de l'app

//-------DEBUT = POUR LA TRADUCTION----------------------//
app.config(function ($translateProvider) {
    $translateProvider.translations('fr', {
        ACCUEIL: 'Accueil',
        TEACHER: 'L\'??quipe',
        GALLERY: 'Galerie photos',
        PRATIQUE: 'Pratiques',
        PRATIQUE1: 'Pratiques',
        TARIF: 'Tarifs',
        PLANNING: 'Planning',
        PLANNING_INFO: '* A la demande des professeurs, pour tout cours collectif,',
        PLANNING_INFO1:'un minimum de 2 personnes est exig??, sans quoi le cours sera malheureusement annul??.',
        CONTACT: 'Contacts',
        CONNEXION: 'CONNEXION',
        EQUIPE: 'L\'Equipe',
        BOUTIQUE: 'La Boutique',
        EQUIPEMIN: 'L\'??quipe',
        WELCOMEHOME: 'Bienvenue Chez',
        RESTEFORME: 'Restez inform??s, inscrivez-vous ?? notre newsletter',
        TEXTRESTEFORME: 'Abonnez-vous gratuitement ?? notre newsletter',
        HOME1: 'Yogi Vida accueille des talents de tous horizons et de toutes formations, attentifs, g??n??reux, authentiques et centr??s. Yogi Vida est un lieu o?? chacun peut se ressourcer ?? son rythme vers une connexion du corps, de l???esprit et du c??ur, pour mieux se tourner vers l???essence m??me de n??tre ??tre et de la vie.',
        HOME2: 'Un univers feutr??, des bougies, des couleurs chaudes, un m??lange de mati??res, de la musique pour oublier le quotidien et s???offrir une parenth??se de bien-??tre suspendue hors du temps. Yogi Vida est une invitation au l??cher prise, au respect et ?? l???amour de soi, pour une connexion ultime du corps et de l???esprit.',
        HOME3: 'Apprendre ?? s???aimer, ?? s?????couter, ?? se respecter est notre vocation ?? partager avec vous. Entendre les signaux de son corps, de son c??ur et de son ??me, savoir comprendre chaque ??motion en conscience, et d??celer les zones d???inconforts sont une partie int??grante du chemin qui nous m??ne vers un mieux-??tre.',
        HOME_PRATIQUE: 'Le club vous offre des pratiques dynamiques dans un atmosph??re propice ?? la d??tente et au bien-??tre',
        HOME_TARIF: 'YOGI VIDA accueille ses membres ou visiteurs du lundi au vendredi, de 10h30 ?? 21h et samedi, de 8h30 ?? 12h30',
        HOME_PLANNING: 'Une vingtaine de cours hebdomadaires pour r??pondre aux attentes de chacun',
        HOME_ALLPLAN: 'Tout le planning',
        HOME_BTN_VOIR: 'Voir details',
        HOME_BTN_LOG: 'Se connecter',
        HOME_ESPRIT: 'L\'ESPRIT DE YOGI VIDA',
        HOME_ESPRIT1: 'Bien-??tre',
        HOME_COMM: 'Commander maintenant',
        HOME_CARD_DECOUVRIR: 'Decouvrir',
        HOME_ESPRIT2: 'Une bulle Zen',
        HOME_RESTO: 'Goutez ?? notre cuisine vari??e, saine et naturellement gourmande',
        HOME_PLANNINGCOURS: 'Planning des cours',
        BUTTON_LANG_FR: 'Fr',
        BUTTON_LANG_EN: 'En',
        RIGHTS: 'tous droits r??serv??s',
        EQUIPE_SESPRATIQUES: 'Ses pratiques',
        APROPOS: 'Notre Histoire',
        APROPOS3: 'Notre historique',
        APROPOS1: 'Fondatrice de Yogi Vida',
        APROPOS2: "Apr??s 15 ann??es pass??es ?? Paris, d???abord ?? ??tudier puis ?? travailler dans la recherche clinique, Sarah Charara rentre ?? Dakar en 2011 pour s???installer en tant que chef de projet free-lance dans l???industrie pharmaceutique. Avec des pr??dispositions et un attrait ??vident depuis tr??s jeune, pour la psychologie, le d??veloppement personnel, et toutes les m??thodes visant le mieux-vivre d???un individu, elle se retrouve face ?? de nombreux questionnements une fois retourn??e dans son pays natal. A partir de 2011, elle m??ne une vie professionnelle tr??s riche et pleine de succ??s, elle parcourt l???Afrique, rencontre ??norm??ment de monde et finit Directrice des Op??rations Cliniques de la soci??t?? qui l???a faite venir au S??n??gal. En 2017, une ??preuve marquera un tournant d??cisif dans la direction qu???elle voudra donner ?? sa vie, tant professionnelle que priv??e. Elle fera des retraites, des voyages, des s??minaires, avalera des dizaines de livres, s???int??ressera aux ??nergies, au chamanisme, ?? la m??ditation mais surtout elle va pratiquer de mani??re plus assidue, et presque salvatrice, qu???elle ne le faisait depuis 2008, le yoga dans tous ses aspects. En mars 2018, elle quitte la recherche clinique pour se consacrer ?? des activit??s moins lucratives mais plus ??panouissantes. En juillet 2018, une retraite au Costa Rica avec Deepak Chopra provoquera le d??clic et l???intention de retranscrire quelque chose en rapport avec le yoga et le d??veloppement personnel en Afrique sera pos??e. En septembre 2018, apr??s un trek ??prouvant au Mustang, elle d??couvre ?? Paris un studio de Yoga qui est la r??plique am??lior??e d???un concept new-yorkais dont elle est fan : le d??clic est d??cupl??. L???intention devient cette fois visc??rale. L???attention fix??e. L???Univers a fait le reste : la dynamique YOGI VIDA ??tait lanc??e.",
        BOUTIQUE_TEXT1: 'Nous aimons le yoga, et nous aimons partager sa pratique tout en soutenant des marques originales. Nous choisissons nos produits en vente selon ' +
            'des crit??res de qualit??, de style, et surtout d?????thique.',
        BOUTIQUE_NOSMARQUES: 'Nos marques',
        BOUTIQUE_CATEGORIE: 'CATEGORIE DES PRODUITS',
        BOUTIQUE_RECHERCHE: 'Recherche ...',
        HOME_PL_COURS: 'Planning des cours',
        HOME_PL_ALLPLAN: 'Tout le planning',
        PRATIQUE_MIN: 'Les pratiques',
        TARIF_TINF: 'Tarifs & Infos',
        TARIF_Y1: 'Yoga en Entreprise',
        TARIF_BTN_MORE: 'En savoir plus',
        TARIF_Y2: 'Veuillez contacter',
        TARIF_Y3: 'info@flammayogaclub.com pour plus d\'informations.',
        TARIF_YO: 'L?????tiquette de Studio',
        TATIF_YOG: 'Afin de respecter le temps et les horaires personnels de chacun, nous d??butons nos cours ?? l???heure \n\
      et nous n???acceptons pas les retardataires. \n\
      Arrivez 15 minutes ?? l???avance pour vous enregistrer ?? l???accueil. \n\
      Pri??re de vous enregistrer ?? votre cours ?? l\'avance, et nous pr??venir 2 heures ?? l???avance pour toute annulation ou changement de programme. \n\
      Des tapis de yoga sont disponibles gratuitement. \n\
      Les serviettes sont disponibles en location. \n\
      Gardez le silence une fois dans les salles de pratique; les t??l??phones sont interdits. \n\
      Informez votre professeur pour tout souci de sant??. \n\
      Ecoutez votre corps et n???essayez pas d???aller au del?? de vos limites. \n\
      Faites des pauses autant que n??cessaire, personne ne vous jugera. \n\
      Venez avec un esprit ouvert. Laissez votre ego ?? la porte et le reste se fera tout seul.',
      TARIF_ABONNER: 'S\'abonner',
      PLANNING_MIN: 'Planning',
      PLANNING_DESCRIPTION: 'Nos locaux sont pr??ts ?? vous accueillir. Nos playlists sont ??nergisantes et nos professeurs inspirants et sympathiques. \n\
    Nous enseignons ce que nous aimons ?? flamma, et nous sommes pr??sents pour vous accompagner dans votre propre aventure',
    PLANNING_ALLCOURS: 'Toutes les pratiques',
    PLANNING_ALLZONES: 'Toutes les zones',
    PLANNING_RESERVER: 'R??servation',
    PLANNING_ATTENTE: 'File d\'attente',

    PLANNING_HORAIRE: 'Debut',
    PLANNING_HORAIRE_FIN: 'Fin',
    PLANNING_A: 'Au',
    PLANNING_D: 'Du',
    PLANNING_FILTRER: 'FILTRER',
    CONTACT_TXT: 'Pour toutes informations compl??mentaires,',
    CONTACT_TXT1: 'n\'h??sitez pas ?? utiliser le formulaire ci-dessous pour nous laisser un message. Nous vous r??pondrons dans les plus brefs d??lais.',
        CONTACT_CONTACTER: 'NOUS CONTACTER',
        CONTACT_PHOLDER1: 'Entrez votre nom',
        CONTACT_PHOLDER2: 'Nom de votre entreprise',
        CONTACT_PHOLDER3: 'Entrez votre email',
        CONTACT_PHOLDER4: 'Entrez votre num??ro de t??l??phone',
        CONTACT_PHOLDER5: 'Mettez votre message ici',
        CONTACT_BTN: 'Envoyer',
        CONNEXION_T1: 'Se connecter ?? YOGI VIDA',
        CONNEXION_T2: 'Adresse Email',
        CONNEXION_T3: 'Nouveau mot de passe',
        CONNEXION_T31: 'R??p??ter mot de passe',
        CONNEXION_T32: 'Valider',
        CONNEXION_T4: 'Connexion',
        CONNEXION_T5: 'Pas encore de compte',
        CONNEXION_T6: 'Creer un compte',
        CONNEXION_T7: 'Mot de passe oubli?? ?',
        CONNEXION_T8: 'Se rappeler de moi',
        CONNEXION_PHOLDER1: 'Entrez votre adresse email',
        CONNEXION_PHOLDER2: 'Entrez votre mot de passe',
        INSCRIPTION_T1: 'Rejoindre yogi vida',
        INSCRIPTION_T2: 'Pr??nom',
        INSCRIPTION_T11: 'Nom',
        INSCRIPTION_T3: 'Adresse Email',
        INSCRIPTION_T4: 'Num??ro mobile',
        INSCRIPTION_T5: 'Mot de passe',
        INSCRIPTION_T6: 'Confirmer votre mot de passe',
        INSCRIPTION_T7: 'Genre',
        INSCRIPTION_T8: 'Inscription',
        INSCRIPTION_T9: 'Homme',
        INSCRIPTION_T10: 'Femme',
        INSCRIPTION_PHOLDER1: 'Pr??nom',
        INSCRIPTION_PHOLDER2: 'Nom',
        INSCRIPTION_PHOLDER3: 'Adresse email',
        INSCRIPTION_PHOLDER4: 'Num??ro de t??l??phone',
        INSCRIPTION_PHOLDER5: 'Entrez un mot de passe',
        INSCRIPTION_PHOLDER6: 'Confirmer le mot de passe',
        FORGOTPWD_TXT: 'R??nitialiser votre mot de passe',
        FORGOTPWD_PHOLDER: 'Entrez votre adresse email',
        FORGOTPWD_BTN: 'Valider',
        FORGOTPWD2_PHOLDER1: 'Entrez votre nouveau mot de passe',
        FORGOTPWD2_PHOLDER2: 'Confirmez votre nouveau mot de passe',
        RESTO_PANIER: 'PANIER',
        BTN_PANIER: 'Ajouter au panier',
        COL_PANIER: 'Taille',
        QTE_PANIER: 'Quantit??',
        PROFIL_P0: 'Attendez SVP...',
        PROFIL_P1: 'Bienvenue sur votre espace client YOGI VIDA',
        PROFIL_P2: 'D??connexion',
        PROFIL_P3: 'Que souhaitez-vous faire?',
        PROFIL_P4: 'Vous pouvez changer vos informations de connexion, acc??dez ?? vos r??servations, ?? vos abonnements et mettre ?? jour votre compte.',
        PROFIL_P5: 'Mes abonnements',
        PROFIL_P6: 'Mes r??servations',
        PROFIL_P6_2: 'Mes lignes de cr??dit',
        PROFIL_P7: 'Modifier votre compte',
        PROFIL_P8: 'Acc??der au pratique',
        PROFIL_P9: 'Acc??der au planning',
        PROFIL_P9_2: 'Nous contacter',
        PROFIL_P10: 'La <br/>Boutique',
        PROFIL_ABONNE1: 'Vos abonnements',
        PROFIL_ABONNE2: 'Vous n\'avez pas encore effectu?? d\'abonnements!',
        PROFIL_RSV1: 'Vos r??servations',
        PROFIL_RSV2: 'Vous n\'avez pas encore de r??servation en cours!',
        PROFIL_LC1: 'Vos lignes de cr??dit',
        PROFIL_LC2: 'Vous n\'avez pas encore de ligne de cr??dit ?? votre actif!',
        PROFIL_CMD1: 'Vos commandes',
        PROFIL_CMD2: 'Vous n\'avez pas encore pass?? de commandes!',
        PROFIL_USER1: 'Modifier votre compte',
        PROFIL_USER2: 'Informations personnelles',
        PROFIL_USER3: 'Nom',
        PROFIL_USER4: 'Pr??nom',
        PROFIL_USER5: 'Changement de mot de passe',
        PROFIL_USER6: 'Veuillez remplir les champs suivants seulement si vous souhaitez changer votre mot de passe actuel. A d??faut, vous pouvez les laisser vides!',
        PROFIL_USER7: 'Votre nouveau mot de passe',
        PROFIL_USER8: 'Confirmer votre nouveau mot de passe',
        PROFIL_USER9: 'Sauvegarder',
        PROFIL_USER10: 'ou',
        PROFIL_USER11: 'Annuler',
        PROFIL_USER12: 'Modifier votre avatar',
        PROFIL_USER13: 'choisir une photo',
        PROFIL_USER14: 'R??activer',
        PROFIL_USER15: 'Relancer',
        PROFIL_RSV_1: 'Date cours',
        PROFIL_RSV_2: 'Pratique',
        PROFIL_RSV_3: 'Zone Pratique',
        PROFIL_RSV_4: 'Horaires',
        PROFIL_RSV_5: 'Etat',
        PROFIL_RSV_6: 'Salle de reservation',
        PROFIL_LC_1: 'Date',
        PROFIL_LC_2: 'Montant',
        PROFIL_LC_3: 'Type de paiement',
        PROFIL_AB_1: 'DEBUT SEANCE',
        PROFIL_AB_2: 'NOM PACK',
        PROFIL_AB_3: 'TYPE PACK',
        PROFIL_AB_4: 'NOMBRE DE SEANCE',
        PROFIL_AB_5: 'DATE FIN SEANCE',
        PROFIL_AB_6: 'MONTANT PAY??',
        PROFIL_AB_7: 'SEANCE RESTANCE',
        NEWSLETTER_PHOLDER: 'Entrez votre adresse mail ici...',
        NEWSLETTER_BTN: 'S\'inscrire',
        ALLRIGHTS: 'tous droits r??serv??s',
        PLACEH_RECHERCHE_PRATIQUE:'Recherche pratrique...',
        WEEK_SCHEDULE:'PLANNING DE LA SEMAINE',
        YOGI_SHOP: 'La boutique yogi vida',
        PLANNING_BTN1:'FERM??',
        PLANNING_BTN2:'OUVERT',
        DAY_1:'Lundi',
        DAY_2:'Mardi',
        DAY_3:'Mercredi',
        DAY_4:'Jeudi',
        DAY_5:'Vendredi',
        DAY_6:'Samedi',
        DAY_7:'Dimanche',
        MON_PANNIER_1:'Mon panier',
        MON_PANNIER_PRIX:'Prix',
        MON_PANNIER_DESC:'Description',
        MON_PANNIER_Q:'Quantit??',
        MON_PANNIER_CONTINUER:'CONTINUER MES ACHATS',
        MON_PANNIER_RECAP:'R??CAPITULATIF',
        MON_PANNIER_TTC:'TTC',
        MON_PANNIER_FINIR:'FINALISER MA COMMANDE',
        MON_PANNIER_SOUS_TOTAL:'Sous total TTC',
        MON_PANNIER_LIVRAISON:'Livraison',
        MON_PANNIER_2:'Adresse et paiement',
        MON_PANNIER_2_VC:'Votre commande',
        MON_PANNIER_2_ML:'Mode livraison',
        MON_PANNIER_2_ML_Q:'Comment voulez vous que votre commande soit livr??e ?',
        MON_PANNIER_2_ML_FRAIS:'Frais de livraison',
        MON_PANNIER_2_ML_EMP:'Emporter',
        MON_PANNIER_2_MP:'Mode de paiement',
        MON_PANNIER_2_MP_Q:'Quel moyen de paiement voulez vous utiliser ?',
    });
    $translateProvider.translations('en', {
        ACCUEIL: 'Home',
        TEACHER: 'Team',
        GALLERY: ' Photos Gallery',
        PRATIQUE: 'Practices',
        PRATIQUE1: 'Practices',
        TARIF: 'The Prices',
        PLANNING: 'The Schedule',
        PLANNING_INFO: '* At the request of professors, for any collective class,',
        PLANNING_INFO1:'a minimum of 2 people is required, otherwise the course will be canceled',
        CONTACT: 'Contact us',
        CONNEXION: 'Connexion',
        EQUIPE: 'The Team',
        BOUTIQUE: 'The Shop',
        EQUIPEMIN: 'The team',
        WELCOMEHOME: 'Welcome to',
        RESTEFORME: 'Stay informed, subscribe to our newsletter',
        TEXTRESTEFORME: 'Subscribe for free to our newsletter',
        HOME1: 'Yogi Vida welcomes talents from all backgrounds and all formations, attentive, generous, authentic and centered. Yogi Vida is a place where everyone can relax at their own pace towards a connection of body, mind and heart, to better turn to the essence of our being and life.',
        HOME2: 'A subdued universe, candles, warm colors, a mix of materials, music to forget the everyday and offer a parenthesis of well-being suspended timeless. Yogi Vida is an invitation to let go, respect and self-love, for an ultimate connection of body and mind.',
        HOME3: 'Learning to love oneself, to listen to oneself, to respect oneself is our vocation to share with you. Hearing the signals of one\'s body, one\'s heart and one\'s soul, knowing how to understand each emotion in consciousness, and identifying areas of discomfort are an integral part of the path to wellness.',
        HOME_PRATIQUE: 'The club offers dynamic practices in an atmosphere conducive to relaxation and well-being',
        HOME_TARIF: 'YOGI VIDA welcomes its members or visitors from Monday to Friday, from 10:30 to 21h and Saturday from 8:30 to 12:30',
        HOME_PLANNING: 'Twenty weekly classes to meet everyone\'s expectations',
        HOME_ALLPLAN: 'All the planning',
        HOME_BTN_VOIR: 'See details',
        HOME_BTN_LOG: 'Log in',
        HOME_ESPRIT: 'THE SPIRIT OF YOGI VIDA',
        HOME_ESPRIT1: 'Welfare',
        HOME_COMM: 'Order now',
        HOME_CARD_DECOUVRIR: 'Discover',
        HOME_ESPRIT2: 'A Zen bubble',
        HOME_RESTO: 'Taste our varied cuisine, healthy and naturally greedy',
        HOME_PLANNINGCOURS: 'Course schedule',
        BUTTON_LANG_FR: 'Fr',
        BUTTON_LANG_EN: 'En',
        RIGHTS: 'all rights reserved',
        EQUIPE_SESPRATIQUES: 'His courses',
        APROPOS: 'Our history',
        APROPOS3: 'Our history',
        APROPOS1: 'Founder of Yogi Vida',
        APROPOS2: "After 15 years in Paris, first studying and then working in clinical research, Sarah Charara returned to Dakar in 2011 to settle as a freelance project leader in the pharmaceutical industry. With predispositions and an obvious attraction since very young, for the psychology, the personal development, and all the methods aiming at the well-being of an individual, she is faced with many questions once returned to her native country. From 2011, she leads a very rich and successful professional life, she travels Africa, meets a lot of people and ends up Director of Clinical Operations of the company that made her come to Senegal. In 2017, an event will mark a turning point in the direction she will want to give to her life, both professional and private. She will make retreats, travels, seminars, will swallow dozens of books, will be interested in energies, shamanism, meditation but above all she will practice more assiduously, and almost saving, than she has done since 2008, yoga in all its aspects. In March 2018, she left clinical research to devote herself to less lucrative but more fulfilling activities. In July 2018, a retreat in Costa Rica with Deepak Chopra will trigger and the intention to transcribe something related to yoga and personal development in Africa will be asked. In September 2018, after a demanding trek in Mustang, \n" +
            "she discovers in Paris a Yoga studio which is the improved replica of a New York concept of which she is a fan: the click is increased tenfold. The intention becomes visceral this time. The attention fixed. The Universe did the rest: the dynamic YOGI VIDA was launched.",
        BOUTIQUE_TEXT1: 'We love yoga, and we love to share his practice while supporting original brands. We choose our products for sale according to criteria of quality,' +
            ' style, and especially ethics.',
        BOUTIQUE_NOSMARQUES: 'Our brands',
        BOUTIQUE_CATEGORIE: 'CATEGORY OF PRODUCTS',
        BOUTIQUE_RECHERCHE: 'Search ...',
        HOME_PL_COURS: 'Course schedule',
        HOME_PL_ALLPLAN: 'All schedule',
        PRATIQUE_MIN: 'The Pratices',
        PRATIQUE_DESC: 'Anyone who wants to do and discover the world of yoga can do it and benefit from it more than interesting. No matter what your age, level of physical activity or degree of flexibility, we have the courses you need! Looking for a meditation experience or a high intensity yoga class? Our premises are ready to welcome you; our playlists are energizing and our teachers friendly. We teach what we love about flamma, and we are ready to accompany you in your own adventure.',
        TARIF_TINF: 'Rates & Info',
        TARIF_Y1: 'Yoga in Business',
        TARIF_Y2: 'Please contact',
        TARIF_BTN_MORE:'Learn more...',
        TARIF_Y3: 'info@flamma.com for more informations.',
        TARIF_YO: 'The Studio label',
        TATIF_YOG: 'In order to respect the time and the personal schedules of each one, we start our lessons on time \n\
and we do not accept latecomers. \n\
Arrive 15 minutes in advance to register at the reception. \n\
Please register at your class in advance, and notify us 2 hours in advance for any cancellation or program change. \n\
Yoga mats are available for free. \n\
Towels are available for rent. \n\
Keep quiet once in the practice rooms; phones are forbidden. \n\
Inform your teacher about any health concerns. \n\
Listen to your body and do not try to go beyond your limits. \n\
Take breaks as much as necessary, no one will judge you. \n\
Come with an open mind. Leave your ego at the door and the rest will be done alone.',
        TARIF_ABONNER: 'Subscribe',
        PLANNING_DESCRIPTION: 'Our premises are ready to welcome you. Our playlists are energizing and our teachers inspiring and friendly. \n\
We teach what we love at flamma, and we are here to accompany you on your own adventure',
        PLANNING_ALLCOURS: 'All practices',
        PLANNING_ALLZONES: 'All zones',
        PLANNING_RESERVER: 'Booking',
        PLANNING_ATTENTE: 'Waiting',
        PLANNING_HORAIRE: 'Early',
        PLANNING_HORAIRE_FIN: 'End',
        PLANNING_A: 'Of',
        PLANNING_D: 'The',
        PLANNING_FILTRER: 'FILTER',
        CONTACT_TXT: 'For any further information,',
        CONTACT_TXT1: 'please use the form below to leave us a message. We will respond as soon as possible.',
        CONTACT_CONTACTER: 'CONTACT US',
        CONTACT_PHOLDER1: 'Enter your name',
        CONTACT_PHOLDER2: 'Name of your company',
        CONTACT_PHOLDER3: 'Enter your email',
        CONTACT_PHOLDER4: 'Enter your phone number',
        CONTACT_PHOLDER5: 'Write your message here',
        CONTACT_BTN: 'Send',
        CONNEXION_T1: 'Connect to YOGI VIDA',
        CONNEXION_T2: 'E-mail adress',
        CONNEXION_T3: 'New password',
        CONNEXION_T31: 'Repeat password',
        CONNEXION_T32: 'Validate',
        CONNEXION_T4: 'Login',
        CONNEXION_T5: 'No account yet',
        CONNEXION_T6: 'Register',
        CONNEXION_T7: 'Forgot your password ?',
        CONNEXION_T8: 'Remember me',
        CONNEXION_PHOLDER1: 'Enter your email adress',
        CONNEXION_PHOLDER2: 'Entrer your password',
        INSCRIPTION_T1: 'Join YOGI VIDA',
        INSCRIPTION_T2: 'Last name',
        INSCRIPTION_T11: 'First name',
        INSCRIPTION_T3: 'E-mail adress',
        INSCRIPTION_T4: 'Mobile number',
        INSCRIPTION_T5: 'Password',
        INSCRIPTION_T6: 'Confirm your password',
        INSCRIPTION_T7: 'Gender',
        INSCRIPTION_T8: 'Registration',
        INSCRIPTION_T9: 'Man',
        INSCRIPTION_T10: 'Woman',
        INSCRIPTION_PHOLDER1: 'First name',
        INSCRIPTION_PHOLDER2: 'Last name',
        INSCRIPTION_PHOLDER3: 'Email adress',
        INSCRIPTION_PHOLDER4: 'Phone number',
        INSCRIPTION_PHOLDER5: 'Enter a password',
        INSCRIPTION_PHOLDER6: 'Confirm the password',
        FORGOTPWD_TXT: 'Reset your password',
        FORGOTPWD_PHOLDER: 'Entrer your email adress',
        FORGOTPWD_BTN: 'Submit',
        FORGOTPWD2_PHOLDER1: 'Entrer your new password',
        FORGOTPWD2_PHOLDER2: 'Confirm your new password',
        RESTO_PANIER: 'CART',
        BTN_PANIER: 'Add to Cart',
        COL_PANIER: 'Size',
        QTE_PANIER: 'Amount',
        PROFIL_P0: 'Please wait...',
        PROFIL_P1: 'Welcome to your profile YOGI VIDA',
        PROFIL_P2: 'Log out',
        PROFIL_P3: 'What do you want to do?',
        PROFIL_P4: 'You can change your login information, access your bookings, subscriptions, and update your account.',
        PROFIL_P5: 'My subscriptions',
        PROFIL_P6: 'My bookings',
        PROFIL_P6_2: 'My credit lines',
        PROFIL_P7: 'Edit your account',
        PROFIL_P8: 'Go to the practice',
        PROFIL_P9: 'Go to the planning',
        PROFIL_P9_2: 'Contact us',
        PROFIL_P10: 'Go to <br/>the shop',
        PROFIL_ABONNE1: 'Your subscriptions',
        PROFIL_ABONNE2: 'You have not done any subscriptions yet',
        PROFIL_RSV1: 'Your bookings',
        PROFIL_RSV2: 'You have not any booking in progress',
        PROFIL_LC1: 'Your credit lines',
        PROFIL_LC2: 'You don\'t have a credit line yet',
        PROFIL_CMD1: 'Your orders',
        PROFIL_CMD2: 'You have not done any orders yet!',
        PROFIL_USER1: 'Edit your account',
        PROFIL_USER2: 'Your personal informations',
        PROFIL_USER3: 'Last name',
        PROFIL_USER4: 'First name',
        PROFIL_USER5: 'Change your password',
        PROFIL_USER6: 'Please complete the following fields only if you want to change your current password. Otherwise, you can leave them empty!',
        PROFIL_USER7: 'Your new password',
        PROFIL_USER8: 'Confirm your new password',
        PROFIL_USER9: 'Save',
        PROFIL_USER10: 'or',
        PROFIL_USER11: 'Cancel',
        PROFIL_USER12: 'Edit your avatar',
        PROFIL_USER13: 'choose a photo',
        PROFIL_USER14: 'Reactivate',
        PROFIL_USER15: 'Resume',
        PROFIL_RSV_1: 'Date course',
        PROFIL_RSV_2: 'Practice',
        PROFIL_RSV_3:'PRACTICAL AREA',
        PROFIL_RSV_4:'Schedule',
        PROFIL_RSV_5:'State',
        PROFIL_RSV_6:'BOOK ROOM',
        PROFIL_LC_1: 'Date',
        PROFIL_LC_2: 'Amount',
        PROFIL_LC_3: 'Type of payment',
        PROFIL_AB_1:'Start session',
        PROFIL_AB_2:'NAME PACK',
        PROFIL_AB_3:'Pack type',
        PROFIL_AB_4:'NUMBER OF RESERVATION',
        PROFIL_AB_5:'DATE FIN SESSION',
        PROFIL_AB_6:'AMOUNT PAY',
        PROFIL_AB_7:'SEANCE RESTANCE',
        NEWSLETTER_PHOLDER: 'Enter your email address here ...',
        NEWSLETTER_BTN: 'Register',
        ALLRIGHTS: 'all rights reserved',
        PLACEH_RECHERCHE_PRATIQUE:'Practical research',
        WEEK_SCHEDULE:'PLANNING OF THE WEEK',
        YOGI_SHOP:'The shop YOGI VIDA',
        PLANNING_BTN1:'CLOSED',
        PLANNING_BTN2:'OPEN',
        DAY_1:'Monday',
        DAY_2:'Tuesday',
        DAY_3:'Wednesday',
        DAY_4:'Thursday',
        DAY_5:'Friday',
        DAY_6:'Saturday',
        DAY_7:'Sunday',
        MON_PANNIER_1:'My basket',
        MON_PANNIER_PRIX:'Price',
        MON_PANNIER_DESC:'Description',
        MON_PANNIER_Q:'Quantity',
        MON_PANNIER_CONTINUER:'CONTINUE MY PURCHASES',
        MON_PANNIER_RECAP:'SUMMARY',
        MON_PANNIER_TTC:'TI',
        MON_PANNIER_FINIR:'FINALIZE MY ORDER',
        MON_PANNIER_SOUS_TOTAL:'Subtotal including VAT',
        MON_PANNIER_LIVRAISON:'Delivery',
        MON_PANNIER_2:'Address and payment',
        MON_PANNIER_2_VC:'Your order',
        MON_PANNIER_2_ML:'Delivery method',
        MON_PANNIER_2_ML_Q:'How do you want your order to be delivered?',
        MON_PANNIER_2_ML_FRAIS:'Delivery costs',
        MON_PANNIER_2_ML_EMP:'Carrier',
        MON_PANNIER_2_MP:'Payment method',
        MON_PANNIER_2_MP_Q:'Which payment method do you want to use?',
    });
    $translateProvider.preferredLanguage('fr');
});

//-------FIN = POUR LA TRADUCTION----------------------//

app.config(function (socialProvider) {
    socialProvider.setGoogleKey("572267196269-ghd2qbp1etdnu9diobkv5pnra4ghd62q.apps.googleusercontent.com");
    socialProvider.setLinkedInKey("791991711135843");
    socialProvider.setFbKey({ appId: "YOUR FACEBOOK APP ID", apiVersion: "API VERSION" });
});

app.controller('afterLoginCtl', function (Init,panierLocalStorage, panier, userLogged, $location, $scope, $cookies, $filter, socialLoginService, $log, $q, $translate, $http, $window) {
    $scope.showPopover = false;

    var listofrequests_assoc =
    {
        "typeoffres"                           : "id,designation,validite_requise,description,offres{id,designation,prix,type_offre{id,designation,validite_requise},nb_seance,nb_jour_validite,text_validity,souscriptions{id},offre_type_pratiques{id,type_pratique{id,designation},nb_seance}}",
        "typepratiques"                        : "id,designation,pratiques{id,designation,image,description,description_en,type_pratique_id,type_pratique{id,designation},professeur_pratiques{id},salle_pratiques{id}},offre_type_pratiques{id}",
        "pratiques"                            : "id,designation,image,description,description_en,type_pratique_id,type_pratique{id,designation},professeur_pratiques{id},salle_pratiques{id}",
        "professeurs"                          : "id,description,description_en,telephone,user_id,user{id,name,email,image},professeur_pratiques{id,pratique{designation}},nb_contrat,nb_programme,created_at_fr",
        "typetarifs"                           : "id,designation,description,tarifs{id, designation, prix, frequence_seance{id,designation},nb_seance},frequence_duree{id,designation,nb_jour},duree",
        "marques"                              : "id,designation,image,showatwebsite,produits{id},nb_sous_produit",
        "familleproduits"                      : "id,designation,",
        "produits"                             : "id,designation,description,marque_id,marque{id,designation},image,prix,famille_produit_id,famille_produit{id,designation},current_quantity",
        "imggaleries"                          : "id,description,image,showatwebsite",
        "programmes"                           : "id,date,file_attente,date_fr,date_fr_day,heure_debut,heure_fin,etat,salle_pratique{id,salle_id,salle{id,designation}},professeur_pratique{id,professeur_id,pratique{designation},professeur{id,user{name}},pratique_id},contrat{id},programme_langues{id,langue_id,langue{id,designation}},programme_niveaus{id,niveau_id,niveau{id,designation}},type_personne{id},reservations{id},displayetat,displaycoloretat,user{name,image}",
        "zones"                                : "id,designation,adresse,salles{id}",
        "reservations"                         : "id,etat,displayetat,displaycoloretat,with_ligne_credit,en_attente,created_at_fr,programme{id,salle_pratique{salle{designation,zone{designation}}},date_fr,heure_debut,heure_fin,professeur_pratique{id,professeur_id,pratique{designation},professeur{id,user{name}},pratique_id}},souscription{id,client{id,nom_complet}}",
        "souscriptions"                        : "id,with_ligne_credit,with_ligne_credit,nb_seance_restant,date,date_fr,date_expiration,offre_id,offre{id,designation,nb_seance,type_offre{id,designation}},client_id,client{id,nom_complet,telephone,email},reservations{id},total_amount,displayetat,displaycoloretat,user{name,image},etat,prix_offre",
        "planningsemaines"                     : "id,user_id,start_date,start_date_fr,end_date,end_date_fr,fichier,created_at_fr,user{name,image}",
        "niveaus"                              : "id,designation",
        "lignecredits"                         : "id,date,date_fr,client_id,client{id,nom_complet,telephone,email},montant,type_paiement_id,type_paiement{designation},created_at",
        "clients"                              : "id,nom_complet,email,image,telephone,etat,type_personne_id,type_personne{id,nom},current_credit,created_at_fr",

        "panierproduits"                       : "id,qte,prix,total,taille_id,taille{id,designation},panier{id,etat,prix,total},produit_id,produit{id,designation,marque{id,designation},image,prix,famille_produit{id,designation}}}",
        "favoris"                              : "id,produit_id,produit{id,designation,marque{id,designation},image,prix,famille_produit{id,designation},current_quantity}",

    };


    $scope.trierElement=function (type,element,propriete="") {

        console.log('trierElement');
        if (type.indexOf('pratique')!==-1)
        {
            if (propriete.match('selected'))
            {
                $scope.pratiqueSelected = element;
                // Si la langue est en anglais, on change le contenu de la variable "description" par d??faut
                if ($translate.use().match('en'))
                {
                    $scope.pratiqueSelected.description = element.description_en;
                }
            }
        }
        else if (type.indexOf('professeur')!==-1)
        {
            if (propriete.match('selected'))
            {
                console.log($scope.professeurSelected)
                $scope.professeurSelected = element;
                console.log($scope.professeurSelected)
                // Si la langue est en anglais, on change le contenu de la variable "description" par d??faut
                if ($translate.use().match('en'))
                {
                    $scope.professeurSelected.description = element.description_en;
                }
            }
        }
        else if (type.indexOf('produit')!==-1)
        {
            if (propriete.match('selected'))
            {
                $scope.produitSelected = element;
                // Si la langue est en anglais, on change le contenu de la variable "description" par d??faut
                if ($translate.use().match('en'))
                {
                    $scope.produitSelected.description = element.description_en;
                }
            }
        }
        else if (type.indexOf('offre')!==-1)
        {
            if (propriete.match('selected'))
            {
                $scope.offreSelected = element;
            }
        }
    };

    $scope.chngeLog = function(conpart){
        return conpart;
    }

    $scope.getelements = function (type, addData=null)
    {
        rewriteType = type;
        if (type.indexOf("marque")!==-1 || type.indexOf("pratiques")!==-1 || type.indexOf("typeoffres")!==-1 || type.indexOf("professeurs")!==-1)
        {
            rewriteType = rewriteType + "(showatwebsite:true)";
            console.log('rewriteType', rewriteType);
        }
        if (type.indexOf("planningsemaines")!==-1)
        {
            rewriteType = rewriteType + "(current_day:true)";
            console.log('rewriteType', rewriteType);
        }
        Init.getElement(rewriteType, listofrequests_assoc[type]).then(function(data)
        {
            console.log('donn??es yi = ', type, data);

            if (type.indexOf("pratiques")!==-1)
            {
                $scope.pratiques = data;
            }
            if (type.indexOf("typepratiques")!==-1)
            {
                $scope.typepratiques = data;
            }
            if (type.indexOf("typeoffres")!==-1)
            {
                $scope.typeoffres = data;
            }
            else if (type.indexOf("professeurs")!==-1)
            {
                $scope.professeurs = data;
            }
            else if (type.indexOf("marques")!==-1)
            {
                $scope.marques = data;
            }
            else if (type.indexOf("familleproduits")!==-1)
            {
                $scope.familleproduits = data;
            }
            else if (type.indexOf("produits")!==-1)
            {
                $scope.produits = data;
            }
            else if (type.indexOf("zones")!==-1)
            {
                $scope.zones = data;
            }
            else if (type.indexOf("planningsemaines")!==-1)
            {
                $scope.planningsemaines = data;
                $scope.current_planningweek = data[0];
            }
            else if (type.indexOf("niveaus")!==-1)
            {
                $scope.niveaus = data;
            }
            else if (type.indexOf("panierproduits")!==-1)
            {
                $scope.panierproduits = data;
            }
        }, function (msg) {
            iziToast.error({
                title: "ERREUR",
                message: "Erreur depuis le serveur, veuillez contactez l'administrateur",
                position: 'topRight'
            });
            console.log('Erreur serveur ici = ' + msg);
        });
    };


    $scope.pageChanged = function(currentpage)
    {
        console.log('pageChanged', currentpage, "liste des pratiques:" , $('#pratique_listprogramme').val());

        if ( currentpage.indexOf('programme')!==-1 )
        {
            rewriteelement = 'programmespaginated(page:'+ $scope.paginationprogramme.currentPage +',count:'+ $scope.paginationprogramme.entryLimit
                /* = listprogramme*/ + ($('#zone_listprogramme').val() ? ',zone_id:' + $('#zone_listprogramme').val() : "" )
                /* = listprogramme*/ + ($('#pratique_listprogramme').val() ? ',pratique_ids:' + '"' +$('#pratique_listprogramme').val() + '"' : "" )
                /* = listprogramme*/ + ($('#niveau_listprogramme').val() ? ',niveau_ids:' + '"' +$('#niveau_listprogramme').val() + '"' : "" )
                /* = listprogramme*/ + ($('#heure_debut_listprogramme').val() ? ',heure_debut:' + '"' + $('#heure_debut_listprogramme').val() + '"' : "" )
                /* = listprogramme*/ + ($('#heure_fin_listprogramme').val() ? ',heure_fin:' + '"' + $('#heure_fin_listprogramme').val() + '"' : "" )
                /* = listprogramme*/ + ($('#date_start_listprogramme').val() ? ',date_start:' + '"' + $('#date_start_listprogramme').val() + '"' : "" )
                /* = listprogramme*/ + ($('#date_end_listprogramme').val() ? ',date_end:' + '"' + $('#date_end_listprogramme').val() + '"' : "" )
                +',is_front:true)';
            if ($.fn.blockUI_start)
            {
                $('body').blockUI_start();
            }
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["programmes"]).then(function (data)
            {
                if ($.fn.blockUI_start)
                {
                    $('body').blockUI_stop();
                }

                $scope.paginationprogramme = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationprogramme.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.programmes = data.data;
            },function (msg)
            {
                $('body').blockUI_stop();
                console.log('programme', msg);
            });
        }
        else if ( currentpage.indexOf('imggalerie')!==-1 )
        {
            rewriteelement = 'imggaleriespaginated(page:'+ $scope.paginationimggalerie.currentPage +',count:'+ $scope.paginationimggalerie.entryLimit
                + "(showatwebsite:true)"
                +')';
            if ($.fn.blockUI_start)
            {
                $('body').blockUI_start();
            }
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["imggaleries"]).then(function (data)
            {
                if ($.fn.blockUI_start)
                {
                    $('body').blockUI_stop();
                }

                $scope.paginationimggalerie = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationimggalerie.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.imggaleries = data.data;
            },function (msg)
            {
                $('body').blockUI_stop();
                console.log('reservation', msg);
            });
        }
        else if (currentpage.indexOf('lignecredit')!==-1 )
        {
            console.log('ligne de credit')
            rewriteelement = 'lignecreditspaginated(page:'+ $scope.paginationlignecredit.currentPage +',count:'+ $scope.paginationlignecredit.entryLimit
                + ($scope.userConnected ? ',client_id:' + $scope.userConnected.id : "" )
                +')';
            if ($.fn.blockUI_start)
            {
                $('body').blockUI_start();
            }
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["lignecredits"]).then(function (data)
            {
                if ($.fn.blockUI_start)
                {
                    $('body').blockUI_stop();
                }

                $scope.paginationlignecredit = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationlignecredit.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.lignecredits = data.data;
            },function (msg)
            {
                $('body').blockUI_stop();
                console.log('reservation', msg);
            });
        }
        else if ( currentpage.indexOf('reservation')!==-1 )
        {
            rewriteelement = 'reservationspaginated(page:'+ $scope.paginationreservation.currentPage +',count:'+ $scope.paginationreservation.entryLimit
                + ($scope.userConnected ? ',client_id:' + $scope.userConnected.id : "" )
                +')';
            if ($.fn.blockUI_start)
            {
                $('body').blockUI_start();
            }
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["reservations"]).then(function (data)
            {
                console.log('tu as pris les donn??es,cool', data);
                if ($.fn.blockUI_start)
                {
                    $('body').blockUI_stop();
                }

                $scope.paginationreservation = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationreservation.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.reservations = data.data;
            },function (msg)
            {
                $('body').blockUI_stop();
                console.log('reservation', msg);
            });
        }
        else if ( currentpage.indexOf('souscription')!==-1 )
        {
            rewriteelement = 'souscriptionspaginated(page:'+ $scope.paginationsouscription.currentPage +',count:'+ $scope.paginationsouscription.entryLimit
                + ($scope.userConnected ? ',client_id:' + $scope.userConnected.id : "" )
                +')';

            if ($.fn.blockUI_start)
            {
                $('body').blockUI_start();
            }
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["souscriptions"]).then(function (data)
            {
                if ($.fn.blockUI_start)
                {
                    $('body').blockUI_stop();
                }

                $scope.paginationsouscription = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationsouscription.entryLimit,
                    totalItems: data.metadata.total
                };
                $scope.souscriptions = data.data;
            },function (msg)
            {
                $('body').blockUI_stop();
                console.log('souscription', msg);
            });
        }

        else if ( currentpage.indexOf('produit')!==-1 )
        {
             rewriteelement = 'produitspaginated(page:'+ $scope.paginationproduit.currentPage +',count:'+ $scope.paginationproduit.entryLimit
                 + ($scope.userConnected ? ',client_id:' + $scope.userConnected.id : "" )
                  + (',showatwebsite:"true"')
                 +')';

             if ($.fn.blockUI_start)
             {
                 $('body').blockUI_start();
             }
             Init.getElementPaginated(rewriteelement, listofrequests_assoc["produits"]).then(function (data)
             {
                 if ($.fn.blockUI_start)
                 {
                     $('body').blockUI_stop();
                 }

                 $scope.paginationproduit = {
                     currentPage: data.metadata.current_page,
                     maxSize: 10,
                     entryLimit: $scope.paginationproduit.entryLimit,
                     totalItems: data.metadata.total
                 };
                 $scope.produits = data.data;
             },function (msg)
             {
                 $('body').blockUI_stop();
                 console.log('produit', msg);
             });
        }

        else if ( currentpage == "panier"  || currentpage == "paniers" )
        {
            /*rewriteelement = 'panierproduitspaginated(page:'+ $scope.paginationpanierproduit.currentPage +',count:'+ $scope.paginationpanierproduit.entryLimit
                + ($scope.userConnected ? ',token:' + '"' + $scope.userConnected.token + '"' : "")
                +')';

            if ($.fn.blockUI_start)
            {
                $('body').blockUI_start();
            }

            Init.getElementPaginated(rewriteelement, listofrequests_assoc["panierproduits"]).then(function (data)
            {
                if ($.fn.blockUI_start)
                {
                    $('body').blockUI_stop();
                }

                $scope.paginationpanierproduit = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationpanierproduit.entryLimit,
                    totalItems: data.metadata.total
                };

                $scope.panierproduits = data.data;

            },function (msg)
            {
                $scope.ischargement = false;
                console.log('panierproduits', msg);
            });*/
        }

        else if ( currentpage.indexOf('liste_envie')!==-1 )
        {
            rewriteelement = 'favorispaginated(page:'+ $scope.paginationfavoris.currentPage +',count:'+ $scope.paginationfavoris.entryLimit
                + ($scope.userConnected ? ',token:' + '"' + $scope.userConnected.token + '"' : "")
                +')';
            if ($.fn.blockUI_start)
            {
                $('body').blockUI_start();
            }
            $scope.ischargement = true;
            Init.getElementPaginated(rewriteelement, listofrequests_assoc["favoris"]).then(function (data)
            {
                if ($.fn.blockUI_start)
                {
                    $('body').blockUI_stop();
                }

                $scope.paginationfavoris = {
                    currentPage: data.metadata.current_page,
                    maxSize: 10,
                    entryLimit: $scope.paginationfavoris.entryLimit,
                    totalItems: data.metadata.total
                };

                $scope.favoris = data.data;
            },function (msg)
            {
                console.log('favoris', msg);
            });
        }
    };


    // Mettre la langue dans un cookie pour que le site traduise quelque soit la page
    var caretSelectionLanguage = ' <span uk-icon="triangle-down"></span>';
    if($cookies.getObject('langage'))
    {
        $translate.use($cookies.getObject('langage'));
        var selectionLangage = $cookies.getObject('langage').toUpperCase() + caretSelectionLanguage;
        angular.element(document.querySelectorAll('.langChoose')).html(selectionLangage);
    }
    else
    {
        $translate.use('fr');
        var selectionLangage = 'FR'+ caretSelectionLanguage;
        angular.element(document.querySelectorAll('.langChoose')).html(selectionLangage);
    }

    $scope.langState = $cookies.getObject('langage');
    $scope.baseURL = window.location.origin+'/flamma_front';


    $scope.changeLanguage = function (key, contant)
    {
        // Mettre langage dasn cookies pour qu'il garde ca pour toutes les pages
        $cookies.putObject('langage', key);
        console.log($cookies)
        // Garder le langage s??lectionn?? (FR ou EN) en changeant de page
        var selectionLangage = key.toUpperCase() + caretSelectionLanguage;
        angular.element(document.querySelectorAll('.langChoose')).html(selectionLangage);
        $translate.use(key);
        langState = $cookies.getObject('langage');

    };


    $scope.donneesReservation = {'idClient':'', 'message':'', 'evenement':'', 'planning_id':''};

    $scope.reserverPlanning = function (e, idPlanning, sans_abonnement=false) {
        e.preventDefault();
        if ($scope.userConnected) {
            //let data = [];
            var data = {
                'client': $scope.userConnected.id,
                'programme': idPlanning,
            };
            if(sans_abonnement){
                data.sans_abonnement = true;
            }

            $('body').blockUI_start();
            $http({
                url: BASE_URL + 'reservation',
                method: 'POST',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (data) {
                $('body').blockUI_stop();
                    if (data.data.errors) {
                        iziToast.error({
                            title: '',
                            message: data.data.errors,
                            position: 'topRight'
                        });
                    }else{
                        $('body').blockUI_stop();
                        iziToast.success({
                            title: '',
                            message: 'Votre r??servation a bien ??t?? prise en compte',
                            position: 'topRight'
                        });
                    }
                })
        } else {
            iziToast.info({
                title: '',
                message: 'Veuillez vous connecter pour r??server',
                position: 'topRight'
            });
        }
        return 'yes';
    }

    $scope.planning_zone_id = null;
    $scope.planning_pratique_id = null;
    $scope.planningFilter = function (idFilter, ByFilter)
    {
        //----Affichage des planning par zone-----//
        angular.element(document.querySelectorAll('.planBy'+ByFilter)).removeClass('selected');
        angular.element(document.querySelector('#'+ByFilter+idFilter)).addClass('selected');
        if (ByFilter.indexOf('Zone')!==-1)
        {
            $scope.planning_zone_id = null;
        }
        else if (ByFilter.indexOf('Pratik')!==-1)
        {
            $scope.planning_pratique_id = null;
        }

        if(idFilter != 0)
        {
            if (ByFilter.indexOf('Zone')!==-1)
            {
                $scope.planning_zone_id = idFilter;
            }
            else if (ByFilter.indexOf('Pratik')!==-1)
            {
                $scope.planning_pratique_id = idFilter;
            }
        }
        $scope.pageChanged('planning');
    };


    $scope.abonnerPack = function (e, idPack) {
        e.preventDefault();
        if ($scope.userConnected) {
            //let data = [];
            var data = {
                'client': $scope.userConnected.id,
                'tarif': idPack,
            }
            $('body').blockUI_start();
            $http({
                url: BASE_URL + 'abonnement',
                method: 'POST',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (data) {
                $('body').blockUI_stop();
                console.log("dd = "+JSON.stringify(data.data));
                    if (data.data.errors) {
                        iziToast.error({
                            title: '',
                            message: data.data.errors,
                            position: 'topRight'
                        });
                    }else{
                        iziToast.success({
                            title: '',
                            message: "Votre abonnement a ??t?? effectu?? avec succ??s",
                            position: 'topRight'
                        });
                    }
                })
        } else {
            iziToast.info({
                title: '',
                message: 'Veuillez vous connecter pour s\'abonner ?? un pack',
                position: 'topRight'
            });
        }
        return 'yes';
    }

    $scope.annulerReservaton = function (e, idReservation, idEtat) {
        e.preventDefault();
        if ($scope.userConnected)
        {
            var data = {
                'etat': idEtat,
                'id': idReservation,
            }
            var messUser = "R??servation annul??e";
            if(idEtat == 0){
                var messUser = "R??servation r??actualis??e";
            }
            $('body').blockUI_start();
            $http({
                url: BASE_URL + 'reservation/statut',
                method: 'POST',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (data) {
                $('body').blockUI_stop();
                    if (data.data.errors)
                    {
                        iziToast.error({
                            title: '',
                            message: data.data.errors,
                            position: 'topRight'
                        });
                    }
                    else
                    {
                        iziToast.success({
                            title: '',
                            message: messUser,
                            position: 'topRight'
                        });
                        var urlRedirection = "./reservations.html";
                        setTimeout(function () {
                            window.location.href = urlRedirection;
                        }, 1000);
                    }
                })
        }
        else
        {
            iziToast.info({
                title: '',
                message: 'Veuillez vous connecter',
                position: 'topRight'
            });
        }
        return 'yes';
    };

    $scope.relancerReservation = function (e, idReservation, idAttente) {
        e.preventDefault();
        if ($scope.userConnected)
        {
            var data = {
                'en_attente': idAttente,
                'id': idReservation,
            }
            var messUsers = "R??servation en attente";
            if(idAttente == 0){
                var messUsers = "R??servation relanc??e";
            }
            $('body').blockUI_start();
            $http({
                url: BASE_URL + 'reservation/attente',
                method: 'POST',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (data) {
                $('body').blockUI_stop();
                if (data.data.errors)
                {
                    iziToast.error({
                        title: '',
                        message: data.data.errors,
                        position: 'topRight'
                    });
                }
                else
                {
                    iziToast.success({
                        title: '',
                        message: messUsers,
                        position: 'topRight'
                    });
                    var urlRedirection = "./reservations.html";
                    setTimeout(function () {
                        window.location.href = urlRedirection;
                    }, 1000);
                }
            })
        }
        else
        {
            iziToast.info({
                title: '',
                message: 'Veuillez vous connecter',
                position: 'topRight'
            });
        }
        return 'yes';
    };

    $scope.contactezNous = function (e)
    {
        e.preventDefault();
        var prefixeForm = 'contacteznous';
        var form = $('#' + prefixeForm);
        senddata = form.serializeObject();
        console.log('senddata form', senddata);

        if (form.validate(prefixeForm))
        {
            form.blockUI_start();
            $http({
                url: BASE_URL + 'contact',
                method: 'POST',
                data: senddata,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (data) {
                form.blockUI_stop();
                console.log('retour formulaire = '+JSON.stringify(data.data));
                if (data.data.errors) {
                    iziToast.error({
                        title: '',
                        message: data.data.errors,
                        position: 'topRight'
                    });
                }else{
                    iziToast.success({
                        title: '',
                        message: data.data.success,
                        position: 'topRight'
                    });
                    console.log("datadata ", data)
                    $scope.emptyForm(prefixeForm);
                }
            });
        }
    };


    $scope.resetPwd = function (e)
    {
        e.preventDefault();
        var form = $('#form_forgotpassword');
        senddata = form.serializeObject();
        //if ($scope.panier.length > 0) {
        form.blockUI_start();
        $http({
            url: BASE_URL + 'password-create',
            method: 'POST',
            data: senddata,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (data)
        {
            form.blockUI_stop();
            if (data.data.errors)
            {
                iziToast.error({
                    title: '',
                    message: data.data.errors,
                    position: 'topRight'
                });
            }
            else
            {
                iziToast.success({
                    title: '',
                    message: data.data.message,
                    position: 'topRight'
                });
                var urlRedirection = "./index.html";
                setTimeout(function () {
                    window.location.href = urlRedirection;
                }, 500);
            }
        })
    };


    $scope.resetPwdConfirm = function (e)
    {
        e.preventDefault();
        var form = $('#form_resetpassword');
        senddata = form.serializeObject();
        console.log("form serialize=", senddata);
        //if ($scope.panier.length > 0) {
        form.blockUI_start();
        if(senddata.password != senddata.repassword)
        {
            form.blockUI_stop();
            iziToast.error({
                title: '',
                message: 'Les deux mots de passe ne correspondent pas',
                position: 'topRight'
            });
        }
        else
        {
            if(tokenDeflamma == '')
            {
                form.blockUI_stop();
                iziToast.error({
                    title: '',
                    message: 'Le token n\'est pas bon',
                    position: 'topRight'
                });
            }
            else
            {
                var data = {
                    password: senddata.password,
                    token: tokenDeflamma
                };
                $http({
                    url: BASE_URL + 'password-reset',
                    method: 'POST',
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (data)
                {
                    form.blockUI_stop();
                    if (data.data.errors)
                    {
                        iziToast.error({
                            title: '',
                            message: 'Une erreur est survenue',
                            position: 'topRight'
                        });
                    }
                    else
                    {
                        iziToast.success({
                            title: '',
                            message: data.data.message,
                            position: 'topRight'
                        });
                        var urlRedirection = "./index.html";
                         setTimeout(function () {
                            window.location.href = urlRedirection;
                        }, 500);
                    }
                })
            }
        }
    };


    $scope.newsLetter = function (e)
    {
        e.preventDefault();
        var prefixeForm = "newsletter";
        var form = $('#' + prefixeForm);
        senddata = form.serializeObject();
        console.log("senddata form=", JSON.stringify(senddata));
        if (form.validate(prefixeForm))
        {
            form.blockUI_start();
            $http({
                url: BASE_URL + 'newsletter',
                method: 'POST',
                data: senddata,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (data)
            {
                form.blockUI_stop();
                if (data.data.errors)
                {
                    iziToast.error({
                        title: '',
                        message: data.data.errors,
                        position: 'topRight'
                    });
                }
                else
                {
                    $scope.emptyForm(prefixeForm);
                    iziToast.success({
                        title: '',
                        message: data.data.message,
                        position: 'topRight'
                    });
                }
                $scope.emptyForm(prefixeForm);
            });
        }
    };

    $scope.addElement = function (type, idItem, stepp, items)
    {
        console.log("type => 1", type,)
        var prefixeForm = "id_" + type ;
        var form = $('#' + prefixeForm);
        // var panier_final = $('#panier_final');

        senddata = form.serializeObject();

        // si user connected = true.
        if ($scope.userConnected) {

            if(type == 'favoris') {
                senddata = {
                    'token'       : $scope.userConnected.token,
                    'produit_id'  : idItem,
                };
            }
            else if(type == 'panier_client') {
                senddata = {
                    'token'       : $scope.userConnected.token,
                    'produit_id'  : idItem,
                    'taille_id'   : $scope.tailleSelected,
                    'qte'         : $scope.qte ? parseInt($scope.qte) : 1,
                }
            }

            console.log("senddata form=", senddata);

            $http({
                url: BASE_URL + type,
                method: 'POST',
                data: senddata,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (data)
            {
                console.log("ici le retour data 001", data);

                if (data.data.error)
                {
                    iziToast.error({
                        title: '',
                        message: data.data.error,
                        displayMode: 'once',
                        position: 'topRight'
                    });
                }
                else
                {
                    iziToast.success({
                        title: '',
                        message: data.data.success,
                        displayMode: 'once',
                        position: 'topRight'
                    });

                    if (type == 'favoris') {
                        if (whereAreWe.indexOf('boutique')!==-1) {
                            console.log("data ici ", data)
                            $.each($scope.produits, function (keyItem, oneItem)
                            {
                                if (oneItem.id === idItem) {
                                    $scope.produits[keyItem].liste_envie = data.data.dataone;
                                    return false;
                                }
                            });
                        }
                        else if (whereAreWe.indexOf('favoris')!==-1) {
                            $scope.pageChanged('favoris');
                        }
                    }

                    else if(type == 'commande_client') {
                        if (stepp == 0)
                        {
                            $cookies.put('route_valide', type)
                            $cookies.put('titleBtnValide', 'commande');
                            $scope.pageChanged("panier");

                            setTimeout(function () {
                                window.location.href = 'panier-final.html';
                            }, 500);
                        }
                        if (stepp == 1 && (type == 'commande_client'))
                        {
                            $scope.showModalAdd("paiement");
                            setTimeout(function () {
                                $("#modal_addpaiement").modal('hide');
                            }, 1500);
                        }
                    }
                }
            }, function (msg)
            {
                iziToast.error({
                    message: '<span class="h4">Un probl??me est survenu <br> Veuillez contactez l\'administrateur</span>',
                    position: 'topRight'
                });
                console.log('Erreur serveur ici = ' + msg);
            });
        }
        else {
            // si user connected = false.
            if(type == 'panier_client') {
                $scope.addToPanierOffLine(type,items);
            }
            else
            {
                iziToast.info({
                    title: '',
                    message: 'Veuillez vous connecter !',
                    displayMode: 'once',
                    position: 'topRight'
                });
                return false;
            }
        }
    };

    // Permet d'ajout dans le panier
    var i = 0;
    $scope.qte = 1;
    $scope.qtebtn = 1;
    $scope.isbtn = false;

    $scope.addToPanier = function (type, opr, label, item, index_yv) {
        var qte = 1;
        label = label+'_'+item.id+'_'+index_yv;

        // minus
        if (opr == 0) {
            $('.' + label).val(function (i, val0) {
                if (val0 <= 0) {
                    qte =  0;
                    return qte
                }
                qte =  --val0;
                return qte
            });
        }
        // add
        else if (opr == 1) {
            $('.' + label).val(function (i, val0) {
                console.log("ici  la  qte ", val0);
                qte =  ++val0;
                return qte
            });
        }
        else if (opr == 2){
            qte = $('.'+label).val()
        }
        // delete
        else if (opr == 3){
            qte = 0;
        }

        $scope.qte = qte;
        $scope.qtebtn = qte;
        $scope.isbtn = true;
        console.log("ici qte=<", qte);

        $scope.addElement(type, item.id, null, item);
        $scope.calculTotalTtc();

    }


    $scope.monpanier = panierLocalStorage.get();
    $scope.addToPanierOffLine = function (type, produit) {
        console.log("pour voir ici => ", produit);
        try {
            var quantite;
            quantite = $scope.qtebtn;

            $scope.monpanier = panierLocalStorage.get();
            var index = $scope.monpanier.findIndex(e => e.id == produit.id);

            console.log("index index => ", index, quantite, $scope.monpanier);

            if(isNaN(parseInt(quantite)) == true || parseInt(quantite) < 0 )
            {
                iziToast.error({
                    message: "Mettre une quantit?? valide",
                    displayMode: 'once',
                    position: 'topRight'
                });
                return false;
            }
            else if (parseInt(quantite) == 0)
            {
                $scope.panierproduits_init = panierLocalStorage.get();
                for(var i = 0;i < $scope.panierproduits_init.length ; i++) {
                    if($scope.panierproduits_init[i].id === produit.id) {
                        $scope.panierproduits_init.splice(i, 1);
                    }
                }
                panierLocalStorage.update($scope.panierproduits_init);
                $scope.monpanier = $scope.panierproduits = panierLocalStorage.get();
                $scope.showToast('Votre panier ?? ??t?? mis ?? jour avec succ??s', true);
            }
            else {
                var total;
                total = parseInt(quantite) * [parseInt(produit.prix)];

                if (index >= 0)
                {
                    $scope.showToast('Votre panier ?? ??t?? mis ?? jour avec succ??s', true);

                    $.each($scope.monpanier, function (key, value) {
                        if (value.id === produit.id) {
                            console.log("index index 11 => ", index, quantite, $scope.monpanier);
                            $scope.monpanier[key].qte = parseInt(quantite);
                            $scope.monpanier[key].total = total;
                            return false;
                        }
                    });
                }
                else {
                    $scope.showToast('Votre panier ?? ??t?? mis ?? jour avec succ??s', true);

                    $scope.monpanier.push({
                        "id"                               : produit.id,
                        "qte"                              : parseInt(quantite),
                        "prix"                             : produit.prix,
                        "total"                            : total,
                        "produit_id"                       : produit.id,
                        "produit"                          : {id: produit.id,"designation": produit.designation,qte: produit.current_quantity,"famille" : {id: produit.famille_id,"designation": produit.famille_produit.designation},"image": produit.image,"tailles" : {"taille" : {id: $scope.tailleSelected ,"designation": $scope.tailleSelectedDesignation }}},
                    });
                }

                panierLocalStorage.update($scope.monpanier);
                $scope.monpanier = $scope.panierproduits = panierLocalStorage.get();
                console.log("ici le panier test ", $scope.monpanier)

            }
        }
        catch (e) {
            console.log('erreur panier = ', e);
        }

        console.log("ici le panier test ", $scope.monpanier.length)

        $scope.getPanierLength();
        $scope.calculTotalTtc();
    };

    $scope.calculTotalTtc = function () {
        $scope.prixlivraison = 0;
        $scope.monpanier = panierLocalStorage.get();
        var total = 0;
        if($scope.monpanier != null){
            for (var i = 0; i < $scope.monpanier.length; i++) {
                total += $scope.monpanier[i].qte * $scope.monpanier[i].prix;
            }
        }
        $scope.totalttc = total + $scope.prixlivraison;
    }

    $scope.calculTotalTtc();

    $scope.showToast = function(msg, success = true){
        if(success){
            iziToast.success({
                message: msg,
                displayMode: 'once',
                position: 'topRight'
            });
        }else{
            iziToast.error({
                message: msg,
                position: 'topRight'
            });
        }
    }

    $scope.formatPrice = function (num, toFixed = 2, round = undefined) {
        if (!num) num = 0;
        var numParsei = parseFloat(num).toFixed(toFixed); // always 0 decimal digit
        numParsei = parseFloat(numParsei);
        if (round !== undefined) numParsei = round ? Math.round(numParsei) : Math.round(numParsei - numParsei % 1);

        return (
            numParsei
                .toString().replace('.', ',')
                .toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$& ') + ''
        )
    };

    $scope.getPanierLength = function(){
        let panierLength = 0;

        if ($scope.userConnected)
        {
           // $scope.pageChanged("panier");

           // panierLength = $scope.panierproduits.length()
        }
        else {
           // $scope.panierproduits = $scope.monpanier = panierLocalStorage.get();
            if ($scope.monpanier != null && $scope.monpanier.length > 0)
            {
                panierLength = $scope.monpanier.length;
                console.log("Nombre panier ", panierLength);
            }
        }


        return panierLength;
    }

    // $locale.NUMBER_FORMATS.GROUP_SEP = ' ';
    $scope.userConnected = userLogged.isLogged();
    $scope.userLogged = { login: "", password: "" };
    $scope.resetPassword = "";

    whereAreWe = window.location.href;
    $scope.currentLink=whereAreWe
    console.log('whereAreWe', whereAreWe);


    $scope.paginationpanierproduit = {
        currentPage: 1,
        maxSize: 8,
        entryLimit: 7,
        totalItems: 0
    };

    if ($scope.userConnected)
    {
        // $scope.pageChanged("panier")
    }
    else {
        $scope.panierproduits = $scope.monpanier = panierLocalStorage.get();
    }

    if (whereAreWe.indexOf('pratiques')!==-1)
    {
        $scope.getelements("typepratiques");
        $scope.getelements("pratiques");
    }
    else if (whereAreWe.indexOf('equipe')!==-1)
    {
        $scope.getelements("professeurs");
    }
    else if (whereAreWe.indexOf('tarif')!==-1)
    {
        $scope.getelements("typeoffres");
    }
    else if (whereAreWe.indexOf('profil')!==-1)
    {
        if ($scope.userConnected==null)
        {
            iziToast.warning({
                title: 'Vous n\'??tes pas connect??',
                position: 'topRight'
            });

            var urlRedirection = "../index.html";
            setTimeout(function () {
                window.location.href = urlRedirection;
            }, 500);
        }
        else
        {
            rewriteelement = 'clients('
                + ($scope.userConnected ? ',id:' + $scope.userConnected.id : "" )
                +')';

            // GET CURRENT INFOS USER CONNECTED
            Init.getElement(rewriteelement, listofrequests_assoc["clients"]).then(function(data)
            {
                if (data.length>0)
                {
                    userLogged.loginUser(data[0]);
                    $scope.userConnected = userLogged.isLogged();
                }
                else
                {
                    $scope.LogOut();
                }
            }, function (msg) {
                console.log('Erreur serveur ici = ' + msg);
            });

            var type = "saveaccount";
            if (whereAreWe.indexOf('update-profil')!==-1)
            {
                console.log('userInfos', $scope.userConnected);
                $('#id_' + type).val($scope.userConnected.id);
                $('#nom_complet_' + type).val($scope.userConnected.nom_complet);
                $('#telephone_' + type).val($scope.userConnected.telephone);
                $('#email_' + type).val($scope.userConnected.email);
                $('#genre_' + type + '_' + $scope.userConnected.type_personne_id).prop('checked', true);
                $("input[id*=password]").each(function () {
                    $(this).val("");
                });
            }
            else if (whereAreWe.indexOf('ligne-de-credit')!==-1)
            {
                $scope.paginationlignecredit = {
                    currentPage: 1,
                    maxSize: 8,
                    entryLimit: 7,
                    totalItems: 0
                };
                $scope.pageChanged("lignecredit");
            }
            else if (whereAreWe.indexOf('reservations')!==-1)
            {
                $scope.paginationreservation = {
                    currentPage: 1,
                    maxSize: 8,
                    entryLimit: 7,
                    totalItems: 0
                };
                $scope.pageChanged("reservation");
            }
            else if (whereAreWe.indexOf('abonnements')!==-1)
            {
                $scope.paginationsouscription = {
                    currentPage: 1,
                    maxSize: 8,
                    entryLimit: 7,
                    totalItems: 0
                };
                $scope.pageChanged("souscription");
            }
        }
    }
    else if (whereAreWe.indexOf('galerie')!==-1)
    {
        $scope.paginationimggalerie = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 6,
            totalItems: 0
        };
        $scope.pageChanged("imggalerie");
    }
    else if (whereAreWe.indexOf('boutique')!==-1)
    {
        $scope.paginationproduit = {
            currentPage: 1,
            maxSize: 8,
            entryLimit: 8,
            totalItems: 0
        };

        $scope.getelements("marques");
        $scope.getelements("familleproduits");
        $scope.pageChanged("produit");
    }
    else if (whereAreWe.indexOf('planning')!==-1)
    {
        $scope.paginationprogramme = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 7,
            totalItems: 0
        };
        $scope.getelements("pratiques");
        $scope.getelements("zones");
        $scope.getelements("niveaus");
        $scope.getelements("planningsemaines");
        $scope.pageChanged("programme");
    }
    else
    {
        $scope.paginationprogramme = {
            currentPage: 1,
            maxSize: 10,
            entryLimit: 5,
            totalItems: 0
        };
        $scope.pageChanged("programme");
    }
    //----Affichage des types tarifs et des tarifs-----//

    //--Pour les donn??es de l'utilisateur--//
    var globalUserId = 0;
    if($scope.userConnected)
    {
        globalUserId = $scope.userConnected.id
    }

    $scope.signout = function () {
        socialLoginService.logout();
    };

    $scope.$on('event:social-sign-in-success', (event, userDetails) => {
        $scope.result = userDetails;
        //console.log('userDetails', userDetails);
        $scope.$apply();
    });
    $scope.$on('event:social-sign-out-success', function (event, userDetails) {
        $scope.result = userDetails;
        //console.log('deconnexion', userDetails);
    });

    //----Au rechargement de a la page, recuperer le panier de l'utilisateur

    // Connexion utilisateur
    $scope.loginUser = function (e) {
        console.log('Dans la fonction LOGIN');
        e.preventDefault();

        var form = $('#form_login');
        var data = form.serializeObject();
        console.log('data form', data);

        console.log('data form', data);
        form.blockUI_start();
        Init.loginUser(data).then(function (data) {
            console.log('data form login', data);
            form.blockUI_stop();
            if (data.errors) {
                console.log('erreur data', data);

                iziToast.error({
                    title: 'Connexion',
                    message: data.errors,
                    position: 'topRight'
                });
            }
            else
            {
                // Save user connected
                userLogged.loginUser(data.data);
                $scope.userConnected = userLogged.isLogged();

                iziToast.success({
                    title: 'Connexion',
                    message: 'Vous ??tes connect??',
                    position: 'topRight'
                });

                var urlRedirection = "profil/index.html";
                setTimeout(function () {
                    window.location.href = urlRedirection;
                }, 500);
            }
        },
        function (msg)
        {
            form.blockUI_stop();
            iziToast.error({
                title: 'Connexion',
                message: "Param??tres incorrectes",
                position: 'topRight'
            });
            console.log('erreur', msg);
        });
    };

    $scope.passwordReset = function (e)
    {
        e.preventDefault();
        var form = $('#form_passwordreset');
        var data = form.serializeObject();
        $('#form_passwordreset').blockUI_start();
        Init.passwordReset(data).then(function (data)
        {
            $('#form_passwordreset').blockUI_stop();
            if (data != null && !data.errors)
            {
                iziToast.success({
                    title: 'Mot de passe oubli??',
                    message: data.success,
                    position: 'topRight'
                });
                $scope.emptyForm('passwordreset');
                $('#seconnecter').trigger('click');
            }
            else
            {
                iziToast.error({
                    title: 'Mot de passe oubli??',
                    message: data.errors,
                    position: 'topRight'
                });
            }
        }, function (msg)
        {
            $('#form_passwordreset').blockUI_stop();
            iziToast.error({
                title: 'Mot de passe oubli??',
                message: "Erreur depuis le serveur, contactez le support technique",
                position: 'topRight'
            });
        });
    };

    $scope.activationAccount = function (e) {
        e.preventDefault();

        var form = $('#form_activationaccount');
        var data = form.serializeObject();

        $('#form_activationaccount').blockUI_start();
        Init.activationAccount(data).then(function (data) {
            $('#form_activationaccount').blockUI_stop();
            if (data != null && !data.errors)
            {
                iziToast.success({
                    title: 'Compte',
                    message: data.success,
                    position: 'topRight'
                });
                $('#sincrire').trigger('click');
                $scope.emptyForm("saveaccount");
                $scope.emptyForm("activationaccount");
            }
            else
            {
                iziToast.error({
                    title: 'Activation de votre compte',
                    message: data.errors,
                    position: 'topRight'
                });
            }
        }, function (msg) {
                $('#form_activationaccount').blockUI_stop();
                iziToast.error({
                    title: 'Activation de votre compte',
                    message: "Erreur depuis le serveur, contactez le support technique",
                    position: 'topRight'
                });
            });
    };

    $scope.LogOut = function () {
        console.log('Dans d??connexion');
        userLogged.LogOut();
        $scope.userConnected = userLogged.isLogged();
        iziToast.info({
            title: 'Vous vous ??tes d??connect??',
            position: 'topRight'
        });
        var urlRedirection = "../";
        setTimeout(function () {
            window.location.href = urlRedirection;
        }, 500);
    };

    $scope.saveAccount = function (e, is_updated = false) {
        e.preventDefault();

        var form = $('#member-profile');

        console.log("formulaire", form.html());
        //senddata = form.serializeObject();
        var formdata=(window.FormData) ? ( new FormData(form[0])): null;
        var senddata=(formdata!==null) ? formdata : form.serialize();

        send_dataObj = form.serializeObject();


        console.log("form serialize data =", senddata);
        // console.log(senddata);

        form.blockUI_start();
        Init.saveAccount(senddata, (send_dataObj.id ? true : false)).then(function (retour)
        {
            console.log('retour', retour);
            form.blockUI_stop();
            // console.log('create account',retour);
            if (retour != null && !retour.errors)
            {
                if (!send_dataObj.id)
                {
                    // Inscription
                    $scope.emptyForm('saveaccount');
                    iziToast.success({
                        title: ('Information'),
                        //message: retour.success,
                        message: 'Inscription r??ussie, un mail d\'activation vous a ??t?? envoy?? dans votre boite mail',
                        position: 'topRight'
                    });
                    var urlRedirection = "connexion.html";
                    setTimeout(function () {
                        window.location.href = urlRedirection;
                    }, 500);
                }
                else
                {

                    var userData = null;
                    if (send_dataObj.id)
                    {
                        userData = retour.clients[0];
                        delete userData.ca_souscription;
                        delete userData.ca_vente;
                        delete userData.nb_souscription;
                        delete userData.nb_reservation;
                        delete userData.nb_vente;
                        delete userData.souscriptions;
                        delete userData.type_personne;
                    }
                    else
                    {
                        // On modifie les informations du user actuellement connect??
                        userData = retour.data;
                    }

                    userLogged.loginUser(userData);
                    $scope.userConnected = userLogged.isLogged();

                    $("input[id*=password]").each(function () {
                        $(this).val("");
                    });

                    iziToast.success({
                        title: 'Information',
                        message: "Mise ?? jour effectu??e avec succ??s",
                        position: 'topRight'
                    });
                }
            }
            else
            {
                iziToast.error({
                    title: "Erreur",
                    message: retour.errors,
                    position: 'topRight'
                });
            }
        }, function (msg) {
                form.blockUI_stop();
                iziToast.error({
                    title: ('INSCRIPTION'),
                    message: "Le service est en maintenance, veuillez contactez le support technique",
                    position: 'topRight'
                });
                console.log('erreur', msg);
            });
    };

    $scope.emptyForm = function (type) {
        $("input[id$=" + type + "], textarea[id$=" + type + "], select[id$=" + type + "]").each(function () {
            $(this).val("");
        });
    };


    $scope.verifLink = function (link) {
        if (currentRoute.templateUrl && angular.lowercase(currentRoute.templateUrl).indexOf("home") == -1) {
            $location.path('/');
        }
    };


});


// V??rification de l'extension des elements upload??s
function isValide(fichier)
{
    var Allowedextensionsimg=new Array("jpg","JPG","jpeg","JPEG","gif","GIF","png","PNG");
    var Allowedextensionsvideo=new Array("mp4");
    for (var i = 0; i < Allowedextensionsimg.length; i++)
        if( ( fichier.lastIndexOf(Allowedextensionsimg[i]) ) != -1)
        {
            return 1;
        }
    for (var j = 0; j < Allowedextensionsvideo.length; j++)
        if( ( fichier.lastIndexOf(Allowedextensionsvideo[j]) ) != -1)
        {
            return 2;
        }
    return 0;
}

function Chargerphoto(idform)
{
    var fichier = document.getElementById("img"+idform);
    (isValide(fichier.value)!=0) ?
        (
            fileReader=new FileReader(),
                (isValide(fichier.value)==1) ?
                    (
                        fileReader.onload = function (event) { $("#affimg"+idform).attr("src",event.target.result);},
                            fileReader.readAsDataURL(fichier.files[0]),
                            (idform=='produit') ? $("#imgproduit_recup").val("") : ""
                    ):null
        ):(
            alert("L'extension du fichier choisi ne correspond pas aux r??gles sur les fichiers pouvant ??tre uploader"),
                $('#img'+idform).val(""),
                $('#affimg'+idform).attr("src",""),
                $('.input-modal').val("")
        );
}
