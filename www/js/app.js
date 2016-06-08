// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('mangan', ['ionic', 'mangan.controllers', 'mangan.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
// state menu side
  .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  })

  .state('homepage', {
    url: '/homepage',
    templateUrl: 'templates/homepage.html',
    controller: 'HomePageCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })

// state home, berisi kategori
  .state('menu.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

// state transaksi, berisi daftar riwayat transaksi, get dengan id user
  .state('menu.transaksi', {
    url: '/transaksi/:userId',
    views: {
      'menuContent': {
        templateUrl: 'templates/transaksi.html',
        controller: 'TransaksiCtrl'
      }
    }
  })

// state status transaksi, get by id transaksi, diarahkan dari invoice setelah memesan
  .state('menu.status', {
    url: '/status/:transaksiId',
    views: {
      'menuContent': {
        templateUrl: 'templates/status.html',
        controller: 'StatusCtrl'
      }
    }
  })

// state profil
  .state('menu.profil', {
    url: '/profil/:idUser',
    views: {
      'menuContent': {
        templateUrl: 'templates/profil.html',
        controller: 'ProfilCtrl'
      }
    }
  })

// state maincourse
  .state('menu.maincourse', {
    url: '/maincourse',
    views: {
      'menuContent': {
        templateUrl: 'templates/maincourse.html',
        controller: 'MainCourseCtrl'
      }
    }
  })

// state soup
  .state('menu.soup', {
    url: '/soup',
    views: {
      'menuContent': {
        templateUrl: 'templates/soup.html',
        controller: 'SoupCtrl'
      }
    }
  })  

// state meat
  .state('menu.meat', {
    url: '/meat',
    views: {
      'menuContent': {
        templateUrl: 'templates/meat.html',
        controller: 'MeatCtrl'
      }
    }
  })

// state dessert
  .state('menu.dessert', {
    url: '/dessert',
    views: {
      'menuContent': {
        templateUrl: 'templates/dessert.html',
        controller: 'DessertCtrl'
      }
    }
  })

// state berisi menu makanan dari resto terpilih, get by kategori dan id_rm
  .state('menu.makanan', {
    url: '/makanan/:kategori/:rmId',
    views: {
      'menuContent': {
        templateUrl: 'templates/makanan.html',
        controller: 'MakananCtrl'
      }
    }
  })

// state invoice, get by id_transaksi, ditampilkan dari transaksi
  .state('menu.invoice', {
    url: '/invoice/:transaksiId',
    views: {
      'menuContent': {
        templateUrl: 'templates/invoice.html',
        controller: 'InvoiceCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/homepage');
});
