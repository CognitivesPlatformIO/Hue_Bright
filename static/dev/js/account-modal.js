(function ($) {
// Account modal
    $('.account-modal__navigation_item').on('click', function () {
        $('.account-modal__navigation_item').removeClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('account-modal__navigation_item--following')) {
            $('.account-modal__content_section').removeClass('active');
            $('.account-modal__content_section--following').addClass('active');
        } else if ($(this).hasClass('account-modal__navigation_item--profile')) {
            $('.account-modal__content_section').removeClass('active');
            $('.account-modal__content_section--profile').addClass('active');
        } else if ($(this).hasClass('account-modal__navigation_item--account')) {
            $('.account-modal__content_section').removeClass('active');
            $('.account-modal__content_section--account').addClass('active');
        } else if ($(this).hasClass('account-modal__navigation_item--login')) {
            $('.account-modal__content_section').removeClass('active');
            $('.account-modal__content_section--login').addClass('active');
        } else if ($(this).hasClass('account-modal__navigation_item--signup')) {
            $('.account-modal__content_section').removeClass('active');
            $('.account-modal__content_section--signup').addClass('active');
        }
    });

    // Account modal select
    $('.account-modal__select_selected-item-container').each(function () {
        if (!($(this).html().length === 0)) {
            $(this).closest('.account-modal__select').addClass('selected');
        }
    });

    $('.account-modal__select').on('click', function (e) {
        if ($(this).hasClass('account-modal__select--multiple')) {
            if ($(e.target).hasClass('account-modal__select_list-item')) {
            } else if ($(e.target).hasClass('account-modal__select_selected-item-multi')) {
                var selectContainer = $(this);
                var selectedItem = $(e.target).html();
                var selectItems = $(this).find('.account-modal__select_selected-item-multi');
                var selectItemsList = [];
                var selectedItems = [];
                var selectList = $(this).find('.account-modal__select_list-item');

                selectList.each(function () {
                    if ($(this).html() == selectedItem) {
                        $(this).removeClass('active');
                    }
                });
                selectItems.each(function () {
                    var selectClass = $(this).data('title');
                    var selectId = $(this).data('id');
                    if (selectedItem !== selectClass) {
                        selectItemsList.push(selectClass + "|" + selectId);
                    }
                });


                var followCls = 'user-follow';
                selectContainer.find('.account-modal__select_selected-item-container').html(' ');
                if (selectContainer.find('.account-modal__select_selected-item-container').hasClass('blog-follow')) {
                    followCls = 'blog-follow';
                }
                if (selectItemsList.length) {
                    $.each(selectItemsList, function (index, value) {
                        var res = value.split("|");
                        selectedItems.push(res[1]);
                        selectContainer.find('.account-modal__select_selected-item-container').append('<div class="account-modal__select_selected-item-multi selectedItem ' + followCls + '" data-id="' + res[1] + '" data-title="' + res[0] + '">' + res[0] + '</div>');
                    });
                } else {
                    $(this).removeClass('selected');
                }
                var cls = followCls == 'user-follow' ? 'user-following' : 'blog-following';
                var inputName = followCls == 'user-follow' ? 'userArr[]' : 'blogArr[]';
                $('.' + cls).remove();
                $.each(selectedItems, function (index, value) {
                    selectContainer.append('<input type="hidden" value="' + value + '" name="' + inputName + '" class="' + cls + '">');
                });

            } else {
                $(this).toggleClass('active');
            }
        } else {
            $(this).toggleClass('active');
        }
    });

    $('.account-modal__select_list-item').on('click', function () {
        var selectedItem = $(this).html();
        var selectedId = $(this).data('id');
        var selectedItemClass = String(selectedItem);
        var selectContainer = $(this).closest('.account-modal__select');
        var selectItems = selectContainer.find('.account-modal__select_selected-item-multi');
        selectContainer.addClass('selected');
        selectContainer.addClass('changed');

        var selectItemsList = [];
        var selectedItems = [];
        selectItems.each(function () {
            var selectClass = $(this).data('title');
            var selectId = $(this).data('id');
            selectItemsList.push(selectClass + '|' + selectId);
        });

        if (!(selectItemsList.indexOf(selectedItem + '|' + selectedId) > -1)) {
            selectItemsList.push(selectedItem + '|' + selectedId);
        }

        var followCls = 'user-follow';
        if (selectContainer.find('.account-modal__select_selected-item-container').hasClass('blog-follow')) {
            followCls = 'blog-follow';
        }
        if (selectContainer.hasClass('account-modal__select--multiple')) {
            selectContainer.find('.account-modal__select_selected-item-container').html(' ');
            $.each(selectItemsList, function (index, value) {
                var res = value.split("|");
                selectedItems.push(res[1]);
                selectContainer.find('.account-modal__select_selected-item-container').append('<div class="account-modal__select_selected-item-multi selectedItem" data-id="' + res[1] + '" data-title="' + res[0] + '">' + res[0] + '</div>');
            });
            $(this).addClass('active');
        } else {
            selectContainer.find('.account-modal__select_selected-item-container').html(' ');
            selectContainer.find('.account-modal__select_selected-item-container').append('<div class="account-modal__select_selected-item" data-title=" ' + selectedItem + '">' + selectedItem + '</div>');
            selectContainer.find('.account-modal__select_list-item').removeClass('active');
            $(this).addClass('active');
			$('#newsletterFrequency').val(selectedId);
        }

        var cls = followCls == 'user-follow' ? 'user-following' : 'blog-following';
        var inputName = followCls == 'user-follow' ? 'userArr[]' : 'blogArr[]';
        $('.' + cls).remove();
        $.each(selectedItems, function (index, value) {
            selectContainer.append('<input type="hidden" value="' + value + '" name="' + inputName + '" class="' + cls + '">');
        });
    });

    // Account modal input
    $('.account-modal__input').each(function () {
        if (!($(this).val().length === 0)) {
            $(this).closest('.account-modal__input-container').addClass('active');
            $(this).closest('.account-modal__input-container').addClass('unchanged');
        }
    });

    $('.account-modal__input').on('focus', function () {
        $(this).closest('.account-modal__input-container').addClass('active');
        $(this).closest('.account-modal__input-container').removeClass('answered');
        $(this).closest('.account-modal__input-container').removeClass('error');
        $(this).closest('.account-modal__input-container').removeClass('unchanged');
    });

    $('.account-modal__input_label').on('click', function () {
        $(this).closest('.account-modal__input-container').find($('.account-modal__input')).focus();
    });

    $('.account-modal__input--text, .account-modal__input--captcha').on('blur', function () {
        if ($(this).val().length == false) {
            $(this).closest('.account-modal__input-container').removeClass('active');
        } else if (true) { // Add in conditions for input requrements here.
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').addClass('answered');
        } else {
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').removeClass('answered');
            $(this).closest('.account-modal__input-container').addClass('error');
        }
    });

    $('.account-modal__input--email').on('blur', function () {
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if ($(this).val().length == false) {
            $(this).closest('.account-modal__input-container').removeClass('active');
        } else if (testEmail.test(this.value)) {
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').addClass('answered');
        } else {
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').removeClass('answered');
            $(this).closest('.account-modal__input-container').addClass('error');
        }
    });

    $('.account-modal__input--username').on('blur', function () {
        if ($(this).val().length == false) {
            $(this).closest('.account-modal__input-container').removeClass('active');
        } else if ($(this).val().length > 3 && $(this).val().length < 33) { // Add in conditions for input requrements here.
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').addClass('answered');
            $(this).closest('.account-modal__input-container').find('.account-modal__input_requirement--error').html('Incorrect Length.');
        } else {
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').removeClass('answered');
            $(this).closest('.account-modal__input-container').addClass('error');
        }
    });

    $('.account-modal__input--password').on('blur', function () {
        if ($(this).val().length == false) {
            $(this).closest('.account-modal__input-container').removeClass('active');
        } else if ($(this).val().length > 5 && $(this).val().length < 33) { // Add in conditions for input requrements here.
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').addClass('answered');
            $(this).closest('.account-modal__input-container').find('.account-modal__input_requirement--error').html('Incorrect Length.');
        } else {
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').removeClass('answered');
            $(this).closest('.account-modal__input-container').addClass('error');
        }
    });

    $('.account-modal__input--verifypassword').on('blur', function () {
        if ($(this).val().length == false) {
            $(this).closest('.account-modal__input-container').removeClass('active');
        } else if ($(this).closest('.account-modal__content_section').find('.account-modal__input--password').val() == $(this).val()) { // Add in conditions for input requrements here.
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').addClass('answered');
        } else {
            $(this).closest('.account-modal__input-container').removeClass('active');
            $(this).closest('.account-modal__input-container').removeClass('answered');
            $(this).closest('.account-modal__input-container').addClass('error');
        }
    });

    $('.account-modal__image_button, .account-modal__image_upload').on('click', function () {
        $('.account-modal__image_input').click();
    });

    // Upload image JS
    if (document.getElementById('account-modal__image_input--profile')) {
        document.getElementById('account-modal__image_input--profile').addEventListener('change', readURL, true);
    }
    function readURL() {
        console.log('hello');
        var file = document.getElementById("account-modal__image_input--profile").files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            document.getElementById('account-modal__image_upload--profile').style.backgroundImage = "url(" + reader.result + ")";
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
        }
    }

    $('.account-modal__image_input').on('change', function () {
        if ($(this).val().length > 0) { // Add in conditions for input requrements here.
            $(this).closest('.account-modal__image').removeClass('error');
            $(this).closest('.account-modal__image').addClass('active');
            $(this).prev().addClass('active');
            $(this).prev().removeClass('error');
            $(this).prev().html($(this).val().replace(/.*[\/\\]/, ''));
        } else {
            $(this).closest('.account-modal__image').removeClass('active');
            $(this).closest('.account-modal__image').addClass('error');
            $(this).prev().removeClass('active');
            $(this).prev().addClass('error');
            $(this).prev().html('Browse...');
        }
    });

    // Account modal toggle
    $('.account-modal__container').on('click', function (e) {
        if ($(e.target).hasClass('account-modal__container') || $(e.target).hasClass('account-modal__content_cross')) {
            $(this).removeClass('active');
            $('body').removeClass('active');
        }
    });

    $('.account-modal__content').on('click', function (e) {
        // If the user clicks on the account modal content but doesnt click on the account modal select it removes the active class.
        if (!($(e.target).parents('.account-modal__select').length) && !($(e.target).hasClass('account-modal__select_selected-item-multi'))) {
            $('.account-modal__select').removeClass('active');
        }
    });

    // User Dropdown
    $('.header__heading-link--profile').on('click', function (e) {
        e.preventDefault();
        $('.user-dropdown').toggleClass('active');
    });

    $('.account-modal-link').on('click', function (e) {
        $('.user-dropdown').removeClass('active');
        $('.account-modal__container').addClass('active');
        $('body').addClass('active');
        $('.account-modal__content_section').removeClass('active');
        $('.account-modal__navigation_item').removeClass('active');
        if ($(this).hasClass('link--profile')) {
          $('.account-modal__content_section--profile').addClass('active');
          $('.account-modal__navigation_item--profile').addClass('active');
        } else if ($(this).hasClass('link--following')) {
          $('.account-modal__content_section--following').addClass('active');
          $('.account-modal__navigation_item--following').addClass('active');
        } else if ($(this).hasClass('link--account')) {
          $('.account-modal__content_section--account').addClass('active');
          $('.account-modal__navigation_item--account').addClass('active');
        }
    });

    $('body').on('click', function (e) {
        if (!$(e.target).hasClass('user-dropdown') && !$(e.target).closest('.user-dropdown').length && !$(e.target).hasClass('header__heading-link--profile') && !$(e.target).closest('.header__heading-link--profile').length) {
            $('.user-dropdown').removeClass('active');
        } else {
        }
    });

    $('.header__login__link, .loginModal').on('click', function (e) {
        $('.account-modal__input').each(function () {
            if (!($(this).val().length === 0) && !$(this).closest('.account-modal__input-container').hasClass('error')) {
                $(this).closest('.account-modal__input-container').addClass('active');
                $(this).closest('.account-modal__input-container').addClass('unchanged');
            }
        });

        $('body').addClass('active');
        $('.account-modal__container').addClass('active');
        $('.account-modal__navigation_item').removeClass('active');
        $('.account-modal__content_section').removeClass('active');
        if ($(this).hasClass('header__login__link--signup')) {
            $('.account-modal__navigation_item--signup').addClass('active');
            $('.account-modal__content_section--signup').addClass('active');
        } else {
            $('.account-modal__content_section--login').addClass('active');
            $('.account-modal__navigation_item--login').addClass('active');
        }
    });

    $('.side-navigation__link--login').on('click', function () {
        $('.account-modal__input').each(function () {
            if (!($(this).val().length === 0) && !$(this).closest('.account-modal__input-container').hasClass('error')) {
                $(this).closest('.account-modal__input-container').addClass('active');
                $(this).closest('.account-modal__input-container').addClass('unchanged');
            }
        });

        $('body').addClass('active');
        $('.account-modal__container').addClass('active');
        $('.account-modal__navigation_item').removeClass('active');
        $('.account-modal__content_section').removeClass('active');
        $('.header__heading-container').click();
        if ($(this).hasClass('side-navigation__link--signup')) {
            $('.account-modal__content_section--signup').addClass('active');
            $('.account-modal__navigation_item--signup').addClass('active');
        } else {
            $('.account-modal__content_section--login').addClass('active');
            $('.account-modal__navigation_item--login').addClass('active');
        }
    });

    // Forgotten Password Modal
    $('.forgotten-password-modal__submit').on('click', function () {
        if ($('.forgotten-password-modal__content--forgotten').find('.account-modal__input').val().length === 0) {
            $('.forgotten-password-modal__content--forgotten').find('.account-modal__input-container').addClass('error');
        } else if (!$('.forgotten-password-modal__content--forgotten').find('.account-modal__input-container').hasClass('error')) {
            var email = $('.forgotten-password-modal__content--forgotten').find('.account-modal__input').val();
            $.ajax({
                type: 'POST',
                url: _appJsConfig.appHostName + '/api/auth/forgot-password',
                dataType: 'json',
                data: {email: email},
                success: function (data, textStatus, jqXHR) {
                    if (data.success === 1) {
                        $('.forgotten-password-modal__content').removeClass('active');
                        $('.forgotten-password-modal__content--email-sent').addClass('active');
                        $('.forgotten-password-modal__container').addClass('success');
                    } else {
                        $('.forgotten-password-modal__content--forgotten').find('.account-modal__input-container').addClass('error');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                },
                beforeSend: function (jqXHR, settings) {
                    $(this).html('Please wait..');
                },
                complete: function (jqXHR, textStatus) {
                    $(this).html('Save');
                }
            });

        }
    });

    $('.forgotten-password-modal__container').on('click', function (e) {
        if ($(e.target).hasClass('forgotten-password-modal__container') || $(e.target).hasClass('forgotten-password-modal__cross')) {
            $(this).removeClass('active');
            $('body').removeClass('active');
        }
    });

    $('.account-modal__forgotten-password-link').on('click', function (e) {
        $('.forgotten-password-modal__container').addClass('active');
        $('.forgotten-password-modal__container').removeClass('success');
        $('.forgotten-password-modal__container').removeClass('delete');
        $('.account-modal__container').removeClass('active');
        $('.forgotten-password-modal__content').removeClass('active');
        $('.forgotten-password-modal__content--forgotten').addClass('active');
    });

    // Submit Errors
    $('.account-modal__buttons_login').on('click', function (e) {
        if (true) { // Add in condition for login

        } else {
            e.preventDefault();
            $(this).prev().addClass('active');
        }
    });

    $('.account-modal__buttons_signup').on('click', function (e) {
        e.preventDefault();
        var elem = $(this);
        $('.account-modal__content_section--signup').find('.account-modal__input').each(function () {
            if ($(this).val().length === 0) {
                $(this).closest('.account-modal__input-container').addClass('error');
            }
        });
        var verifyPass = $('.account-modal__content_section--signup').find('.account-modal__input--password').val() === $('.account-modal__content_section--signup').find('.account-modal__input--verifypassword').val();
        var verifyInputs = !$('.account-modal__content_section--signup').find('.account-modal__input-container').hasClass('error');
        if (verifyInputs && verifyPass) { // Add in condition for signup
            $(this).prev().removeClass('active');
            var formData = {};
            $.each($('#signupForm').serializeArray(), function () {
                formData[this.name] = this.value;
            });
            $.ajax({
                type: 'POST',
                url: _appJsConfig.appHostName + '/api/auth/signup',
                dataType: 'json',
                data: formData,
                success: function (data, textStatus, jqXHR) {
                    if (data.success === 1) {
                        location.reload();
                    } else {
                        Object.keys(data.error).forEach(function (key) {
                            var container = $('.account-modal__input--' + key).closest('.account-modal__input-container');
                            container.removeClass('active').removeClass('answered').addClass('error');
                            container.find('.account-modal__input_requirement--error').html(data.error[key]);
                        });
                        $('.captcha img').trigger('click');
                        $('.captcha input').val('');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                },
                beforeSend: function (jqXHR, settings) {
                    $(elem).html('Please wait..');
                },
                complete: function (jqXHR, textStatus) {
                    $(elem).html('Signup');
                }
            });
        } else {
            if (!verifyPass) {
                $('.account-modal__content_section--signup').find('.account-modal__input--verifypassword').closest('.account-modal__input-container').addClass('error').removeClass('answered');
            }
            $(this).prev().addClass('active');
        }
    });

    $('.accountLogin').on('click', function (e) {
        e.preventDefault();
        var elem = $(this);
        var verify = true;
        $('.account-modal__content_section--login').find('.account-modal__input').each(function () {
            if ($(this).val().length === 0) {
                $(this).closest('.account-modal__input-container').addClass('error');
                verify = false;
            }
        });
        if (verify) {
            $(this).prev().removeClass('active');
            var formData = {};
            $.each($('#loginForm').serializeArray(), function () {
                formData[this.name] = this.value;
            });
            $.ajax({
                type: 'POST',
                url: _appJsConfig.appHostName + '/api/auth/login',
                dataType: 'json',
                data: formData,
                success: function (data, textStatus, jqXHR) {
                    if (data.success === 1) {
                        location.reload();
                    } else {
                        $('#loginForm').find('.account-modal__error').removeClass('hide').addClass('active');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $(elem).prop('disabled', false).html('Login');
                },
                beforeSend: function (jqXHR, settings) {
                    $(elem).prop('disabled', true).html('Please wait..');
                },
                complete: function (jqXHR, textStatus) {
                    $(elem).prop('disabled', false).html('Login');
                }
            });
        }
    });

    $('.account-modal__content_section--account').find('.account-modal__input').on('focus', function () {
        $('.account-modal__buttons_account').removeClass('active');
        $('.account-modal__buttons_account').html('Save');
    });

    $('.account-modal__buttons_account').on('click', function (e) {
        e.preventDefault();
        var elem = $(this);
        if ($('#accountForm').find('input[name="username"]').val().length === 0) {
            $('#accountForm').find('input[name="username"]').closest('.account-modal__input-container').addClass('error');
        }
        var userPass = $('.account-modal__content_section--account').find('.account-modal__input--password').val();
        var verifyPass = $('.account-modal__content_section--account').find('.account-modal__input--password').val() === $('.account-modal__content_section--account').find('.account-modal__input--verify-password').val();
        var verifyInputs = !$('.account-modal__content_section--account').find('.account-modal__input-container').hasClass('error');

        if (verifyPass && verifyInputs) { // Add in condition for error
            var formData = {};
            $.each($('#accountForm').serializeArray(), function () {
                formData[this.name] = this.value;
            });
            $.ajax({
                type: 'POST',
                url: _appJsConfig.appHostName + '/api/user/edit-profile',
                dataType: 'json',
                data: formData,
                success: function (data, textStatus, jqXHR) {
                    if (data.success === 1) {
                        elem.html('Saved');
                        elem.addClass('active');
                        elem.prev().removeClass('active');
                        $('.account-modal__content_section--account').find('.account-modal__input-container').removeClass('answered');
                        $('.account-modal__content_section--account').find('.account-modal__input-container').each(function () {
                            if ($(this).find('.account-modal__input').val().length > 0) {
                                $(this).addClass('active');
                                $(this).addClass('unchanged');
                            }
                        });
                        if(userPass !== '') {
                            $('.forgotten-password-modal__container').addClass('active').removeClass('success').removeClass('delete');
                            $('.account-modal__container').removeClass('active');
                            $('.forgotten-password-modal__content').removeClass('active');
                            $('.forgotten-password-modal__content--email-sent').addClass('active');
                            $('.forgotten-password-modal__content--email-sent').find('div').html('Password Chagned Successfully. Please Login again!!');
                            $('.forgotten-password-modal__container').addClass('success');
                            setTimeout(function(){
                                window.location = _appJsConfig.appHostName + '/auth/logoff'; 
                            }, 3000);  
                        } else {
                            location.reload();
                        }
                    } else {
                        elem.prev().addClass('active');
                        elem.prev().find('div').html(data.error);
                        elem.removeClass('active');
                        elem.html('Save');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    elem.prop('disabled', false).html('Save');
                },
                beforeSend: function (jqXHR, settings) {
                    elem.prop('disabled', true).html('Please wait..');
                },
                complete: function (jqXHR, textStatus) {
                    elem.prop('disabled', false).html('Save');
                }
            });

        } else {
            if (!verifyPass) {
                $('.account-modal__content_section--account').find('.account-modal__input--verify-password').closest('.account-modal__input-container').addClass('error').removeClass('answered').removeClass('unchanged');
            }
            $(elem).prev().addClass('active');
            elem.prev().find('div').html('Not all fields entered correctly.');
            $(elem).removeClass('active');
            $(elem).html('Save');
        }
    });

    $('.account-modal__content_section--profile').find('.account-modal__input').on('focus', function () {
        $('.account-modal__buttons_profile').removeClass('active');
        $('.account-modal__buttons_profile').html('Save');
    });

    $('.account-modal__content_section--profile').find('.account-modal__select').on('click', function () {
        $('.account-modal__buttons_profile').removeClass('active');
        $('.account-modal__buttons_profile').html('Save');
    });

    $('.account-modal__buttons_profile').on('click', function (e) {
        e.preventDefault();
        var elem = $(this);
        // Declare variables and check if they have length on submit.
        var firstName = $('.account-modal__content_section--profile').find('input[name="firstname"]').val().length > 0;
        var lastName = $('.account-modal__content_section--profile').find('input[name="lastname"]').val().length > 0;
        var Bio = $('.account-modal__content_section--profile').find('textarea[name="bio"]').val().length > 0;
        var checkList = {firstname: firstName, lastname: lastName, bio: Bio};
        var checkText = '';
        if (!checkList.firstname) {
            checkText += 'First Name, ';
            $('.account-modal__content_section--profile').find('input[name="firstname"]').closest('.account-modal__input-container').addClass('error');
        }
        if (!checkList.lastname) {
            checkText += 'Last Name, ';
            $('.account-modal__content_section--profile').find('input[name="lastname"]').closest('.account-modal__input-container').addClass('error');
        }
        if (!checkList.bio) {
            checkText += 'Bio, ';
            $('.account-modal__content_section--profile').find('textarea[name="bio"]').closest('.account-modal__input-container').addClass('error');
        }
        checkText = checkText.replace(/,\s*$/, "");

        if (firstName && lastName && Bio) {
            var formData = {};
            $.each($('#profileForm').serializeArray(), function () {
                formData[this.name] = this.value;
            });
            $.ajax({
                type: 'POST',
                url: _appJsConfig.appHostName + '/api/user/edit-profile',
                dataType: 'json',
                data: formData,
                success: function (data, textStatus, jqXHR) {
                    if (data.success === 1) {
                        $(elem).html('Saved');
                        $(elem).addClass('active');
                        $(elem).prev().removeClass('active');
                        $('.account-modal__content_section--profile').find('.account-modal__select').removeClass('changed');
                        $('.account-modal__content_section--profile').find('.account-modal__input-container').removeClass('answered');
                        $('.account-modal__content_section--profile').find('.account-modal__input-container').each(function () {
                            if ($(this).find('.account-modal__input').val().length > 0) {
                                $(this).addClass('active');
                                $(this).addClass('unchanged');
                            }
                        });
                        location.reload();
                    } else {
                        $(elem).prev().addClass('active');
                        $(elem).prev().html('<div class="account-modal__error_text">Error saving profile.</div>');
                        $(elem).removeClass('active');
                        $(elem).html('Save');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $(elem).prop('disabled', false).html('Save');
                },
                beforeSend: function (jqXHR, settings) {
                    $(elem).prop('disabled', true).html('Please wait...');
                },
                complete: function (jqXHR, textStatus) {
                    $(elem).prop('disabled', false).html('Save');
                }
            });
        } else {
            $(this).prev().addClass('active');
            $(this).prev().html('<div class="account-modal__error_text">Error: ' + checkText + ' is required.</div>');
            $(this).removeClass('active');
            $(this).html('Save');
        }
    });

    $('.account-modal__content_section--following').find('.account-modal__select').on('click', function () {
        $('.account-modal__buttons_following').removeClass('active');
        $('.account-modal__buttons_following').html('Save');
    });

    $('.account-modal__buttons_following').on('click', function (e) {
        e.preventDefault();
        var elem = $(this);
        if (true) { // Add in condition for error

            $.ajax({
                type: 'POST',
                url: _appJsConfig.appHostName + '/api/user/follow',
                dataType: 'json',
                data: $('#followForm').serializeArray(),
                success: function (data, textStatus, jqXHR) {
                    if (data.success === 1) {
                        $(elem).toggleClass('active');
                        $('.account-modal__content_section--following').find('.account-modal__select').removeClass('changed');
                        $(elem).prev().removeClass('active');
                        $('.followingSuccess').children().html('Your Section(s) & User(s) Saved.');
                    } else {
                        $(elem).prev().addClass('active');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $(elem).prop('disabled', false).html('Save');
                },
                beforeSend: function (jqXHR, settings) {
                    $(elem).prop('disabled', true).html('Please wait..');
                },
                complete: function (jqXHR, textStatus) {
                    $(elem).prop('disabled', false).removeClass('active').html('Save');
                }
            });

        } else {
            $(this).prev().addClass('active');
        }
    });

    $('.account-modal__delete-account_checkbox').change(function () {
        if (this.checked) {
            $(this).closest('.account-modal__delete-account').addClass('active');
        } else {
            $(this).closest('.account-modal__delete-account').removeClass('active');
        }
    });

    $('.account-modal__buttons_delete-account').on('click', function (e) {
        e.preventDefault();
    });

    $('.reset-password-modal__submit').on('click', function (e) {
        e.preventDefault();
        var elem = $(this);
        if ($('#resetPasswordForm').find('input[name="password"]').val().length < 6) {
            $('#resetPasswordForm').find('input[name="password"]').closest('.account-modal__input-container').addClass('error');
        }

        var verifyPass = $('#resetPasswordForm').find('input[name="password"]').val() === $('#resetPasswordForm').find('input[name="verifypassword"]').val();
        var verifyInputs = !$('.forgotten-password-modal__content--change-password').find('.account-modal__input-container').hasClass('error');
        if (verifyPass && verifyInputs) {
            $.ajax({
                type: 'POST',
                url: _appJsConfig.appHostName + '/api/auth/reset-password?token=' + $('#reset-token').val(),
                dataType: 'json',
                data: $('#resetPasswordForm').serializeArray(),
                success: function (data, textStatus, jqXHR) {
                    if (data.success === 1) {
                        $('.forgotten-password-modal__content').removeClass('active');
                        $('.forgotten-password-modal__content--email-sent').addClass('active');
                        $('.forgotten-password-modal__content--email-sent').find('div').html('Password Reset Successfully!!');
                        $('.forgotten-password-modal__container').addClass('success');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $(elem).prop('disabled', false).html('Submit');
                },
                beforeSend: function (jqXHR, settings) {
                    $(elem).prop('disabled', true).html('Please wait...');
                },
                complete: function (jqXHR, textStatus) {
                    $(elem).prop('disabled', false).html('Submit');
                }
            });
        }
    });
}(jQuery));