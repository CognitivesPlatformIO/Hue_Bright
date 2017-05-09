var LoginController = (function ($) {
    return {
        login: function () {
            LoginController.Login.init();
        }
    };
}(jQuery));

LoginController.Login = (function ($) {

    var attachEvents = function () {
        $('.header__login__link').trigger('click');
        $('.account-modal__content_section--login, .account-modal__navigation_item--login').addClass('active');
        $('.account-modal__navigation_item--signup, .account-modal__content_section--signup').removeClass('active');
    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));