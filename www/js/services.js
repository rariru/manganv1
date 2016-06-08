angular.module('mangan.services', [])

.factory('Mcourses', function() {
	// ganti dengan memanggil fungsi yang mengembalikan json
	var mcourses = [{
		id: 0,
		nama: 'Mr Mesem',
		alamat: 'Ngoresan',
		img: 'img/mcourse/mesem.JPG'
	}, {
		id: 1,
		nama: 'Mr Juneto',
		alamat: 'Belakang Kampus',
		img: 'img/mcourse/juneto.JPG'
	}, {
		id: 2,
		nama: 'Arjes Kitchen',
		alamat: 'Samping RSJ',
		img: 'img/mcourse/arjes.JPG'
	}];

	return {
		all: function() {
			return mcourses;
		},
		get: function(makananId) {
			for (var i = 0; i < mcourses.length; i++) {
				if (mcourses[i].id === parseInt(makananId)) {
					return mcourses[i];
				}
			}
			return null;
		}
	};
})

.factory('Soups', function() {
	var soups = [{
		id: 0,
		nama: 'Haikie',
		alamat: 'Belakang Kampus',
		img: 'img/soup/haikie.JPG'
	}, {
		id: 1,
		nama: 'Sop Matahari',
		alamat: 'Ngoresan',
		img: 'img/soup/sopmatahari.JPG'
	}];

	return {
		all: function() {
			return soups;
		}
	}
})

.factory('Meats', function() {
	var meats = [{
		id: 0,
		nama: 'Bale Enak',
		alamat: 'Ngoresan',
		img: 'img/meat/baleenak.JPG'
	}];

	return {
		all: function() {
			return meats;
		}
	}
})

.factory('Desserts', function() {
	var desserts = [{
		id: 0,
		nama: 'Kesusu',
		alamat: 'Ngoresan',
		img: 'img/dessert/kesusu.JPG'
	}];

	return {
		all: function() {
			return desserts;
		}
	}
})

.factory('MainCourseServ', function($http) {
	var url = "http://mangan.hol.es/mangan/ManganAPI/control/mcourse/";
	return {
		getDataRm: function() {
			return $http.get(url+'selectRm.php');
		}
	};
	
})

.factory('SoupServ', function($http) {
	var url = "http://mangan.hol.es/mangan/ManganAPI/control/soup/";
	return {
		getDataRm: function() {
			return $http.get(url+'selectRm.php');
		}
	};
})

.factory('MeatServ', function($http) {
	var url = "http://mangan.hol.es/mangan/ManganAPI/control/meat/";
	return {
		getDataRm: function() {
			return $http.get(url+'selectRm.php');
		}
	}
})

.factory('DessertServ', function($http) {
	var url = "http://mangan.hol.es/mangan/ManganAPI/control/dessert/";
	return {
		getDataRm: function() {
			return $http.get(url+'selectRm.php');
		}
	}
})

.factory('MenuServ', function($http) {
	var url = "http://mangan.hol.es/mangan/ManganAPI/control/menu/";
	return {
		getDataMenu: function(kategori, idRm) {
			return $http.get(url+'selectMenu.php?kategori='+kategori+'&idRm='+idRm);
		},
		create: function(idUser, menus){
			return $http.post(url+'addTransaksi.php?id='+idUser,menus,{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
				}
			});
		}
	}
})

.factory('TransaksiServ', function($http) {
	var url = "http://mangan.hol.es/mangan/ManganAPI/control/transaksi/";
	return {
		getDataTransaksi: function(transaksiId){
			return $http.get(url+'selectTransaksi.php?id_user='+transaksiId);
		},
		getStatusTransaksi: function(transaksiId){
			return $http.get(url+'getStatusTransaksi.php?id='+transaksiId);
		}
	}
})

.factory('TopUpServ', function($http) {
	var url = "http://mangan.hol.es/mangan/ManganAPI/control/topup/";
	return {
		create: function(topup){
			return $http.post(url+'topup.php',topup,{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
				}
			});
		}
	};
})

.factory('InvoiceServ', function($http) {
	var url = "http://mangan.hol.es/mangan/ManganAPI/control/invoice/";
	return {
		getDataInvoice: function(transaksiId){
			return $http.get(url+'invoice.php?id='+transaksiId);
		}
	}
})

.factory('RegisterServ', function($http) {
	var url = "http://mangan.hol.es/mangan/ManganAPI/control/register/";
	return {
		register: function(dataRegister){
			return $http.post(url+'register.php',dataRegister,{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
				}
			});
		}
	};
})

.factory('LoginServ', function($http) {
	var url = "http://mangan.hol.es/mangan/ManganAPI/control/login/";
	return {
		getIdUser: function(username, password){
			return $http.get(url+'login.php?username='+username+'&password='+password);
		}
	}
})

.factory('ProfilServ', function($http) {
	var url = "http://mangan.hol.es/mangan/ManganAPI/control/profil/";
	return {
		getProfil: function(idUser){
			return $http.get(url+'profil.php?id='+idUser);
		}
	}
});