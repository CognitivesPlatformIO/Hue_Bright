var AuthController = (function ($) {
    return {
        loginOrSignup: function () {
            AuthController.LoginOrSignup.init();
        },
        socialSignup: function () {
            AuthController.SocialSignup.init();
        },
        forgotPassword: function () {
            AuthController.ForgotPassword.init();
        },
        resetPassword: function () {
            AuthController.ResetPassword.init();
        }
    };
}(jQuery));

AuthController.LoginOrSignup = (function ($) {

    var attachEvents = function () {
        $("#loginForm").validate({
            rules: {
                username: "required",
                password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                username: "Username cannot be blank.",
                password: {
                    required: "Password cannot be blank.",
                    minlength: "Your password must be at least 6 characters"
                }
            }
        });

        $("#signupForm").validate({
            rules: {
                firstname: "required",
                lastname: "required",
                username: "required",
                captcha: "required",
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6
                },
                verifypassword: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                }
            },
            errorElement: "span",
            messages: {
                firstname: "First name cannot be blank.",
                lastname: "Last name cannot be blank.",
                username: "Username cannot be blank.",
                captcha: "Captcha cannot be blank.",
                email: "Email cannot be blank.",
                password: {
                    required: "Password cannot be blank.",
                    minlength: "Password should contain at least 6 characters."
                },
                verifypassword: {
                    required: "Verify password cannot be blank.",
                    minlength: "Verify Password should contain at least 6 characters.",
                    equalTo: "Verify Password should exactly match Password"
                }
            }
        });
    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));

AuthController.SocialSignup = (function ($) {

    var attachEvents = function () {
        $("#signupForm").validate({
            rules: {
                firstname: "required",
                lastname: "required",
                username: "required",
                terms: "required",
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6
                },
                verifypassword: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                }
            },
            errorElement: "span",
            messages: {
                firstname: "First name cannot be blank.",
                lastname: "Last name cannot be blank.",
                username: "Username cannot be blank.",
                email: "Email cannot be blank.",
                terms: "",
                password: {
                    required: "Password cannot be blank.",
                    minlength: "Password should contain at least 6 characters."
                },
                verifypassword: {
                    required: "Verify password cannot be blank.",
                    minlength: "Verify Password should contain at least 6 characters.",
                    equalTo: "Verify Password should exactly match Password"
                }
            }
        });
    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));

AuthController.ForgotPassword = (function ($) {

    var attachEvents = function () {
        $("#forgotPasswordForm").validate({
            rules: {
                email: {
                    required: true
                }
            },
            messages: {
                email: "Email or username cannot be blank."
            }
        });

    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));

AuthController.ResetPassword = (function ($) {

    var attachEvents = function () {
        $('.forgotten-password-modal__container').addClass('active');
        $('.forgotten-password-modal__content--change-password').addClass('active');
        
        function getParameterByName(name, url) {
            if (!url) {
              url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        var token = getParameterByName('token');
        $('#reset-token').val(token);
    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));