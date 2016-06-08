angular.module('mangan.controllers', [])

.controller('HomePageCtrl', function($scope, $state, $ionicPopup, $ionicLoading, $ionicModal, $timeout, LoginServ) {
	if (localStorage.getItem("idUser") !== null && localStorage.getItem("idUser") !== "") {
		$state.go('menu.home');
	} else {
		$scope.showAlert = function(msg) {
			$ionicPopup.alert({
				title: msg.title,
				template: msg.message,
				okText: 'OK',
				okType: 'button-balanced'
			})
		};

		$scope.login = {};

		$scope.login = function() {
			$scope.loading = $ionicLoading.show({
			    content: 'Loading Data',
			    template: '<ion-spinner icon="android"></ion-spinner>',
			    animation: 'fade-in',
			    showBackdrop: true,
			    maxWidth: 200,
			    showDelay: 500
			});
			LoginServ.getIdUser($scope.login.username, $scope.login.password).success(function(data) {
				$scope.idUser = data;
				if ($scope.idUser !== null && $scope.idUser !== "") {
					localStorage.setItem("idUser", $scope.idUser);
					$state.go('menu.home');
					$scope.closeLogin();
					$scope.loading.hide();
				}else{
					$scope.showAlert({
						title: 'Error',
						message: 'Username atau Password salah!'
					});
					$scope.login.password = "";
					$scope.loading.hide();
				}
			});
		};

		$scope.register = function() {
			$state.go('register');
		}

		$ionicModal.fromTemplateUrl('templates/login.html', {
				scope: $scope
			}).then(function(modal) {
				$scope.modal = modal;
			});

			$scope.closeLogin = function() {
		    	$scope.modal.hide();
			};

			$scope.showLogin = function() {
				$scope.modal.show();
			};
	};
})

.controller('RegisterCtrl', function($scope, $state, $ionicPopup, $ionicLoading, RegisterServ) {
	$scope.showAlert = function(msg) {
		$ionicPopup.alert({
			title: msg.title,
			template: msg.message,
			okText: 'OK',
			okType: 'button-balanced'
		})
	};

	$scope.dataRegister = {};

	$scope.register = function() {
		if (!$scope.dataRegister.nama_lengkap) {
			$scope.showAlert({
				title: "Informasi",
				message: "Nama lengkap tidak boleh kosong"
			});
		}else if (!$scope.dataRegister.alamat) {
			$scope.showAlert({
				title: "Informasi",
				message: "Alamat tidak boleh kosong"
			});
		}else if (!$scope.dataRegister.no_telp) {
			$scope.showAlert({
				title: "Informasi",
				message: "Nomor Telepon tidak boleh kosong"
			});
		}else if (!$scope.dataRegister.username) {
			$scope.showAlert({
				title: "Informasi",
				message: "Username tidak boleh kosong"
			});
		}else if (!$scope.dataRegister.password) {
			$scope.showAlert({
				title: "Informasi",
				message: "Password tidak boleh kosong"
			});
		}else{
			$scope.loading = $ionicLoading.show({
			    content: 'Loading Data',
			    template: '<ion-spinner icon="android"></ion-spinner>',
			    animation: 'fade-in',
			    showBackdrop: true,
			    maxWidth: 200,
			    showDelay: 500
			});
			RegisterServ.register({
				nama_lengkap: $scope.dataRegister.nama_lengkap,
				alamat: $scope.dataRegister.alamat,
				no_telp: $scope.dataRegister.no_telp,
				username: $scope.dataRegister.username,
				password: $scope.dataRegister.password
			}).success(function(data) {
				$scope.showAlert({
					title: "Informasi",
					message: "Registrasi berhasil, silahkan login"
				});
				$scope.loading.hide();
				$state.go('homepage');
			});
		}
	};

	$scope.close = function() {
		$state.go('homepage');
	}
})

.controller('MenuCtrl', function($scope, $ionicPopup, $ionicModal, $ionicLoading, $timeout, TopUpServ) {
	$scope.idUser = localStorage.getItem("idUser");
	
	$scope.showAlert = function(msg) {
		$ionicPopup.alert({
			title: msg.title,
			template: msg.message,
			okText: 'OK',
			okType: 'button-balanced'
		});
	};
	// variable untuk menyimpan data topup
	$scope.topup = {};
	// function confirmTopup()
	$scope.confirmTopUp = function() {
		if (!$scope.topup.an) {
			$scope.showAlert({
				title: "Informasi",
				message: "Nama Rekening tidak boleh kosong"
			});
		}else if (!$scope.topup.metode) {
			$scope.showAlert({
				title: "Informasi",
				message: "Metode Pembayaran tidak boleh kosong"
			});
		}else if (!$scope.topup.nominal) {
			$scope.showAlert({
				title: "Informasi",
				message: "Nominal tidak boleh kosong"
			});
		}else{
			var konfirmasi = $ionicPopup.confirm({
					title: 'Konfirmasi',
					template: 'Lanjutkan Top Up?'
				});
			konfirmasi.then(function(res){
				if (res) {
					$scope.loading = $ionicLoading.show({
					    content: 'Loading Data',
					    template: '<ion-spinner icon="android"></ion-spinner>',
					    animation: 'fade-in',
					    showBackdrop: true,
					    maxWidth: 200,
					    showDelay: 500
					});
					TopUpServ.create({
						username: $scope.idUser,
						nama_rekening: $scope.topup.an,
						nama_bank: $scope.topup.metode,
						saldo_topup: $scope.topup.nominal
					}).success(function() {
						$scope.closeTopUp();
						$scope.showAlert({
							title: "Informasi",
							message: "Top Up berhasil, menunggu konfirmasi"
						});
						$scope.topup = {};
						$scope.loading.hide();
					});
				}else {
					$scope.showAlert({
						title: 'Informasi',
						message: 'Top Up dibatalkan'
					});
				}
			});
		}
	};

	$ionicModal.fromTemplateUrl('templates/topup.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.closeTopUp = function() {
    	$scope.modal.hide();
	};

	$scope.topUp = function() {
		$scope.modal.show();
	};

})

.controller('HomeCtrl', function($scope) {
	$scope.idUser = localStorage.getItem("idUser");
})

.controller('MainCourseCtrl', function($scope, $ionicLoading, MainCourseServ) {
	$scope.loading = $ionicLoading.show({
	    content: 'Loading Data',
	    template: '<ion-spinner icon="android"></ion-spinner>',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 500
	});
	$scope.showData = function() {
		MainCourseServ.getDataRm().success(function(data) {
			$scope.mcourses = data;
		}).finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
			$scope.loading.hide();
		});
	};
	$scope.showData();
})

.controller('SoupCtrl', function($scope, $ionicLoading, SoupServ) {
	$scope.loading = $ionicLoading.show({
	    content: 'Loading Data',
	    template: '<ion-spinner icon="android"></ion-spinner>',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 500
	});
	$scope.showData = function() {
		SoupServ.getDataRm().success(function(data) {
			$scope.soups = data;
		}).finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
			$scope.loading.hide();
		});
	};
	$scope.showData();
})

.controller('MeatCtrl', function($scope, $ionicLoading, MeatServ) {
	$scope.loading = $ionicLoading.show({
	    content: 'Loading Data',
	    template: '<ion-spinner icon="android"></ion-spinner>',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 500
	});
	$scope.showData = function() {
		MeatServ.getDataRm().success(function(data) {
			$scope.meats = data;
		}).finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
			$scope.loading.hide();
		});
	};
	$scope.showData();
})

.controller('DessertCtrl', function($scope, $ionicLoading, DessertServ) {
	$scope.loading = $ionicLoading.show({
	    content: 'Loading Data',
	    template: '<ion-spinner icon="android"></ion-spinner>',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 500
	});
	$scope.showData = function() {
		DessertServ.getDataRm().success(function(data) {
			$scope.desserts = data;
		}).finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
			$scope.loading.hide();
		});
	};
	$scope.showData();
})

.controller('MakananCtrl', function($scope, $ionicPopup, $stateParams, $state, $ionicLoading, MenuServ) {
	$scope.idUser = localStorage.getItem("idUser");
	
	$scope.showAlert = function(msg){
		$ionicPopup.alert({
			title: msg.title,
			template: msg.message,
			okText: 'OK',
			okType: 'button-balanced'
		});
	};

	$scope.showData = function() {
		$scope.loading = $ionicLoading.show({
		    content: 'Loading Data',
		    template: '<ion-spinner icon="android"></ion-spinner>',
		    animation: 'fade-in',
		    showBackdrop: true,
		    maxWidth: 200,
		    showDelay: 500
		});
		MenuServ.getDataMenu($stateParams.kategori, $stateParams.rmId).success(function(data) {
			$scope.menus = data;
		}).finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
			$scope.loading.hide();
		});
	};

	$scope.showData();
	$scope.pembayaran = {};

	$scope.Order = function() {
		var konfirmasi = $ionicPopup.confirm({
			title: 'Konfirmasi',
			template: 'Apa anda yakin ingin memesan?'
		});

		konfirmasi.then(function(res) {
			if(res) {
				$scope.loading = $ionicLoading.show({
				    content: 'Loading Data',
				    template: '<ion-spinner icon="android"></ion-spinner>',
				    animation: 'fade-in',
				    showBackdrop: true,
				    maxWidth: 200,
				    showDelay: 500
				});
				// console.log('You are sure');
				MenuServ.create($scope.idUser, $scope.menus).success(function(data) {
					$scope.idTransaksi = data;
					$scope.loading.hide();
					$state.go('menu.invoice', {transaksiId: $scope.idTransaksi}, {reload: true});
				});
			} else {
				$scope.showAlert({
					title: "Informasi",
					message: "Transaksi dibatalkan"
				});
				// console.log('You are not sure');
			}
		});
	};
})

.controller('InvoiceCtrl', function($scope, $stateParams, $state, $ionicLoading, InvoiceServ) {
	$scope.showData = function() {
		$scope.loading = $ionicLoading.show({
		    content: 'Loading Data',
		    template: '<ion-spinner icon="android"></ion-spinner>',
		    animation: 'fade-in',
		    showBackdrop: true,
		    maxWidth: 200,
		    showDelay: 500
		});
		InvoiceServ.getDataInvoice($stateParams.transaksiId).success(function(data) {
			$scope.invoices = data;
		}).finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
			$scope.loading.hide();
		});
	};

	$scope.showData();

	$scope.cekStatus = function(idTransaksi) {
		$state.go('menu.status', {userId: idTransaksi});
	};
})

.controller('TransaksiCtrl', function($scope, $stateParams, $state, $ionicLoading, TransaksiServ) {
	$scope.showData = function() {
		$scope.loading = $ionicLoading.show({
		    content: 'Loading Data',
		    template: '<ion-spinner icon="android"></ion-spinner>',
		    animation: 'fade-in',
		    showBackdrop: true,
		    maxWidth: 200,
		    showDelay: 500
		});
		TransaksiServ.getDataTransaksi($stateParams.userId).success(function(data) {
			$scope.transaksis = data;
		}).finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
			$scope.loading.hide();
		});
	};

	$scope.showData();

	$scope.back = function() {
		$state.go('menu.home');
	}
})

.controller('ProfilCtrl', function($scope, $state, $stateParams, $ionicLoading, ProfilServ) {
	$scope.showData = function() {
		$scope.loading = $ionicLoading.show({
		    content: 'Loading Data',
		    template: '<ion-spinner icon="android"></ion-spinner>',
		    animation: 'fade-in',
		    showBackdrop: true,
		    maxWidth: 200,
		    showDelay: 500
		});
		ProfilServ.getProfil($stateParams.idUser).success(function(data) {
			$scope.profils = data;
			$scope.loading.hide();
		});
	}

	$scope.showData();

	$scope.logOut = function() {
		localStorage.setItem("idUser", "");
		$state.go('homepage');
	}
})

.controller('StatusCtrl', function($scope, $stateParams, $state, $ionicLoading, TransaksiServ) {
	$scope.showData = function() {
		$scope.loading = $ionicLoading.show({
		    content: 'Loading Data',
		    template: '<ion-spinner icon="android"></ion-spinner>',
		    animation: 'fade-in',
		    showBackdrop: true,
		    maxWidth: 200,
		    showDelay: 500
		});
		TransaksiServ.getStatusTransaksi($stateParams.transaksiId).success(function(data) {
			$scope.transaksis = data;
		}).finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
			$scope.loading.hide();
		});
	};

	$scope.showData();
});