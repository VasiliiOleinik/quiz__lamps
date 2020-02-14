$(function() {
	// Дата
	moment.locale('ru'); // ru
	$('input[name="dob"]').daterangepicker({
		singleDatePicker: true,
		showDropdowns: true,
		minYear: 1901,
		maxYear: parseInt(moment().format('YYYY'),10)
	}, function(start, end, label) {
		var years = moment().diff(start, 'years');
	});
	// Маска телефона
	maskInit($("#phone"));
	$('.intl-tel-input .selected-flag').css({'height': $('.intl-tel-input').height()});
	// Маска вебмани
	$("#webMoney").mask("Z0000000000000000");
	// Загрузка файлов
	$('#download-avatar, #download-passport').on('change', function(){
		var files = $(this)[0].files[0];
		var size = this.files[0].size;
		var name = this.files[0].name;
		var fileExtension = ['png', 'jpg', 'pdf']; // допустимые типы файлов
		var input = $(this);
		if (files) {
			var reader = new FileReader();
			if(5000000<size){
				input.val('');
				alert("Размер файла не должен превышать 5мб");
			} else if ($.inArray(name.split('.').pop().toLowerCase(), fileExtension) == -1) {
				alert("Неверный  формат файла. Допустимые форматы: PNG, JPG, PDF");
			} else {
				reader.onload = function(e) {
					$(input).siblings('.upload-image').find('.uploaded-image').attr('src', e.target.result);
				};
				reader.readAsDataURL(input[0].files[0]);
			}
		}
	});
	$(".send-auth-form, .green-btn").on('click', function() {
		checkPhone($("#phone"));
	});
	$("#register, #authorizationData, #support-form").on('submit', function(e) {
		if($(this).hasClass('error')) {
			e.preventDefault;
			return false;
		}
	});
	// Валидация форм
	$("#register, #login, #resetPass, #support-form").validate({
		errorClass: "invalid",
		validClass: "success",
		rules: {
			email: {
				email: true,
				required: true,
			},
			authEmail: {
				email: true,
				required: true,
			},
			surname: {
				required: true,
				minlength: 2,
			},
			password: {
				minlength: 6,
				required: true,
			},
			agree: {
				required: true,
			},
			profiePassport: {
				required: true,
			},
			name: {
				required: true,
				minlength: 2,
			},
			supportMessage: {
				required: true,
				minlength: 100,
			},
			secondName: {
				required: true,
				minlength: 2,
			},
			dob: {
				required: true,
			},
		},
		messages: {
			password: {
				required: "Поле обязательно для заполнения",
				minlength: "Минимальная длина пароля - 6 символа",
			},
			email: {
				required: "Поле обязательно для заполнения",
				email: "Введите корректный email",
			},
			agree: {
				required: "Поле обязательно для заполнения",
			},
			secondName: {
				required: "Поле обязательно для заполнения",
				minlength: "Слишком короткое отчество",
			},
			surname: {
				required: "Поле обязательно для заполнения",
				minlength: "Слишком короткая фамилия",
			},
			profiePassport: {
				required: "Поле обязательно для заполнения",
			},
			name: {
				required: "Поле обязательно для заполнения",
				minlength: "Слишком короткое имя",
			},
			supportMessage: {
				required: "Поле обязательно для заполнения",
				minlength: "Минимальная длина сообщения 100 символов",
			},
			dob: {
				required: "Поле обязательно для заполнения",
			},
		},
	});
	$("#personalData").validate({
		errorClass: "invalid",
		validClass: "success",
		rules: {
			surname: {
				required: true,
				minlength: 2,
			},
			profiePassport: {
				required: true,
			},
			name: {
				required: true,
				minlength: 2,
			},
			secondName: {
				required: true,
				minlength: 2,
			},
			dob: {
				required: true,
			},
		},
		messages: {
			secondName: {
				required: "Поле обязательно для заполнения",
				minlength: "Слишком короткое отчество",
			},
			surname: {
				required: "Поле обязательно для заполнения",
				minlength: "Слишком короткая фамилия",
			},
			profiePassport: {
				required: "Поле обязательно для заполнения",
			},
			name: {
				required: "Поле обязательно для заполнения",
				minlength: "Слишком короткое имя",
			},
			supportMessage: {
				required: "Поле обязательно для заполнения",
				minlength: "Минимальная длина сообщения 100 символов",
			},
			dob: {
				required: "Поле обязательно для заполнения",
			},
		},
	});
	$("#authorizationData").validate({
		errorClass: "invalid",
		validClass: "success",
		rules: {
			email: {
				email: true,
				required: true,
			},
			password: {
				minlength: 6,
				required: true,
			},
			oldPassword: {
				minlength: 6,
				required: true,
			},
			newPassword: {
				minlength: 6,
				required: true,
				equalTo: "#password",
			},
			webMoney: {
				minLength: 17,
				required: true,
			},
		},
		messages: {
			password: {
				required: "Поле обязательно для заполнения",
				minlength: "Минимальная длина пароля - 6 символа",
			},
			oldPassword: {
				required: "Поле обязательно для заполнения",
				minlength: "Минимальная длина пароля - 6 символа",
			},
			newPassword: {
				required: "Поле обязательно для заполнения",
				minlength: "Минимальная длина пароля - 6 символа",
				equalTo: "Пароли не совпадают",
			},
			email: {
				required: "Поле обязательно для заполнения",
				email: "Введите корректный email",
			},
			webMoney: {
				required: "Поле обязательно для заполнения",
				minlength: "Длина номера должна быть 17 символов",
			}
		},
	});
});

function checkPhone(phone) {
	var val = phone.val();
	var digitsVal = val.replace(/\D+/g,'');
	phone.removeClass('invalid');
	phone.removeClass('success');
	$('#phone-error').remove();
	if(digitsVal.length == 0) {
		phone.after("<label class='phoneInvalid' id='phone-error' for='phone'>Поле обязательно для заполнения</label>");
		phone.removeClass('success');
		phone.addClass('invalid');
		phone.attr('aria-invalid', true);
		phone.closest('form').addClass('error');
	} else if(digitsVal.length < 10) {
		console.log("digitsVal.length");
		phone.after("<label class='phoneInvalid' id='phone-error' for='phone'>Длина телефона должна быть 10 символов</label>");
		phone.addClass('invalid');
		phone.attr('aria-invalid', true);
		phone.closest('form').addClass('error');
	} else {
		$('#phone-error').remove();
		phone.removeClass('invalid');
		phone.addClass('success');
		phone.attr('aria-invalid', false);
		phone.closest('form').removeClass('error');
	}
}