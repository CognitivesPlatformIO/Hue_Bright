(function ($) {

    //$('.video-player').videoPlayer();

    $(document).ready(function () {
        $('.is-arrow-down a').click(function (e) {
            if ($(this).parents(".is-section").nextAll('div:not(.is-hidden)').html()) { /* .hidden class can be used as an exception */
                $('html,body').animate({
                    scrollTop: $(this).parents(".is-section").nextAll('div:not(.is-hidden)').offset().top - parseInt($('.is-wrapper').css('padding-top')) /* + 1 Adjustment due to topbar height*/
                }, 800);
            }
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        });
        

        $('.article img').each(function () {
            if (!$(this).hasClass('share-popup__close')) {
                // $(this).attr('data-action', 'zoom');
            }
        });

//        $('.playVideo').videoPlayer({});
    });

    $(document).on('click', '.loginModal', function (e) {
        $('.account-modal__container').addClass('active');
    });

    function draggable() {
        if ($(".banner__container").width() > $(".banner").width()) {
            $(".banner__container").draggable({
                cursor: "move",
                containment: "banner",
                axis: 'x',
                drag: function (event, ui) {
                    ui.position.left = Math.min(0,
                            ($(".banner").width() - $(".banner__container").width()) < ui.position.left ?
                            ui.position.left : ($(".banner").width() - $(".banner__container").width())
                            );
                }
            });
        }
    }
    draggable();

    $(window).resize(function () {
        if ($('.side-navigation').is(':visible')) {
            var currentWidth = $('.side-navigation').width();
            var windowWidth = $(window).width();
            if (currentWidth > windowWidth && windowWidth > 300) {
                var newWidth = windowWidth - 20;
                $('.side-navigation').css('width', newWidth + 'px');
            }
        }
        draggable();
    });

    $('.modal').on('hidden.bs.modal', function () {
        $('.modal .modal-content *').remove();
    });

    $(document).on('click', '.social-modal__image_container', function (e) {
        $('.modal').modal('hide');
    });

    $(document).on('click', '.social-modal__video_wrap', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.social-modal__image_image', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.button__share, .header_actions__share', function (e) {
        $('.share-popup').addClass('active');
        $(document).one('click', '.modal, .share-popup__close, .article', function (e) {
            e.preventDefault();
            $('.share-popup.active').removeClass('active');
        });
        return false;
    });

    $(document).on('click', '.share-popup', function (e) {
        e.stopPropagation();
    });

    $(document).on("focus", '.share-link', function () {
        $(this).select();
    });
    $(document).on("mouseup", '.share-link', function (e) {
        e.preventDefault();
    });

    $(document).on("click", '.share-popup__copy-text', function (e) {
        e.preventDefault();
        var shareLinkBox = $('.share-popup__share-link');
        shareLinkBox.select();
        try {
            var successful = document.execCommand('copy');
            $.fn.General_ShowNotification({message: "Link copied successfully"});
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    });


    if ($('.dropdown-toggle')) {
        $('.dropdown-toggle').dropdown();
    }
    ;


    $("#owl-thumbnails").owlCarousel({
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        itemsMobile: [600, 1],
        pagination: true,
        navigation: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 1000,
        navigationText: [
            "<i class='fa fa-angle-left fa-2x'></i>",
            "<i class='fa fa-angle-right fa-2x'></i>"
        ]
    });

    //Contact form validation
    $('#contactForm').validate({
        rules: {
            name: "required",
            email: "required email",
            message: "required"
        },
        // errorElement: "span",
        messages: {
            name: "Name cannot be blank.",
            email: {
                required: "Email cannot be blank",
                email: "Please enter a valid email address"
            },
            message: "Message cannot be blank."
        }
    });



    /************************************************************************************
     *                  USER EDIT PROFILE PAGE JS
     ************************************************************************************/

//    $('.uploadFileBtn').uploadFile({
//        onSuccess: function (data, obj) {
//            var resultJsonStr = JSON.stringify(data);
//
//            var imgClass = $(obj).data('imgcls');
//            $('.' + imgClass).css('background-image', 'url(' + data.url + ')');
//
//            var fieldId = $(obj).data('id');
//            $('#' + fieldId).val(resultJsonStr);
//
//            $().General_ShowNotification({message: 'Image added successfully'});
//        },
//        onError: function (obj, errorMessage) {
//            $().General_ShowNotification({message: errorMessage, type: 'error', timeout: 4000});
//        }
//    });
    $('.uploadFileBtn').on('click', function () {
        var object = $(this);
        $.fn.uploadImagesModal({
            onSuccess: function (data, obj) {
                var resultJsonStr = JSON.stringify(data);
                var imgClass = $(object).data('imgcls');
                $('.' + imgClass).css('background-image', 'url(' + data.url + ')');
                var fieldId = $(object).data('id');
                $('#' + fieldId).val(resultJsonStr);
                noty({
                    type: "success",
                    text: 'Image added successfully',
                    layout: 'topRight',
                    timeout: 2000,
                    dismissQueue: true,
                    animation: {
                        open: 'animated bounceInRight', // jQuery animate function property object
                        close: 'animated bounceOutRight', // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    }
                });
            },
            onError: function (obj, errorMessage) {
                $.fn.General_ShowNotification({message: errorMessage, type: 'error', timeout: 4000});
            }
        });
    });
    $('.searchArticle').on('click', function (e) {
        var searchTerm = $(this).parent('.searchArticleForm').find('input').val().trim();
        $(this).parent('.searchArticleForm').find('input').val(searchTerm);
        if (!searchTerm) {
            return false;
        }
    });

    $(document).ready(function () {
        var $back, $navigation, $nextItem;
        $navigation = '.responsive-navigation';
        $nextItem = '<span class="next-item"><i class="fa fa-angle-right"></i></span>';
        $back = '<li class="back"><a href="javascript:;"><i class="fa fa-chevron-left"></i>Back</a></li>';
        $(".responsive-navigation .responsive-navigation__list li:has(ul)").prepend($nextItem);
        $(".responsive-navigation .responsive-navigation__list .sub-menu").prepend($back);

        //$('.header__navigation-list').children().clone().appendTo('.responsive-navigation');

        $('#header-responsive').on('click', function () {
            $('body').addClass('no-scroll');
            $('.responsive-navigation').addClass('navigation-active');
        });

        $('.responsive-navigation .next-item').on('click', function (e) {
            e.preventDefault();
            $(this).nextAll('.sub-menu').addClass('navigation-active');
        });

        $('.responsive-navigation .back').on('click', function (e) {
            e.preventDefault();
            $(this).parent('.sub-menu').removeClass('navigation-active');
        });

        $('.close-menu').on('click', function () {
            $('.responsive-navigation').removeClass('navigation-active');
            $('body').removeClass('no-scroll');
        });

        $('.menu-overlay').on('click', function () {
            $('.responsive-navigation').removeClass('navigation-active');
            $('body').removeClass('no-scroll');
        });
    });

    // Side nav close
    $('.side-navigation__cross').on('click', function () {
        $('.header__heading-container').click();
    });

    // Article comments link scroll
    $('.header_actions__comments').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#disqus_thread").offset().top - 100
        }, 500);
    });

    // Landing page
    $('.landing-page-header__arrow').on('click', function () {
        var tag = $(".landing-page-content");
        $('html,body').animate({scrollTop: tag.offset().top}, 1000, 'swing');
    });

    // Landing page side form
    $('#content').on('click', function (e) {
        if ($(e.target).is('.landing-page-header__button, .landing-page-banner__button, .landing-page-content__get-started')) {
            if ($('.landing-page-side-form').hasClass('active')) {
                $(e.target).one('click', function (e) {
                    $('.landing-page-side-form').removeClass('active');
                    $('.landing-page-side-form__overlay').removeClass('active');
                    $(this).removeClass('active');
                    return;
                });
            } else {
                $('.landing-page-side-form').addClass('active');
                $('.landing-page-side-form__overlay').addClass('active');
                $(this).addClass('active');
                return;
            }
        } else if ($(e.target).is('.active')) {
            return;
        }
        $('.landing-page-side-form').removeClass('active');
        $('.landing-page-side-form__overlay').removeClass('active');
        $(this).removeClass('active');
    });

    $('.landing-page-side-form__overlay').on('click', function (e) {
        $('#content').removeClass('active');
        $('.landing-page-side-form').removeClass('active');
        $('.landing-page-side-form__overlay').removeClass('active');
    });

    $('.landing-page-side-form__cross').on('click', function (e) {
        $('#content').removeClass('active');
        $('.landing-page-side-form').removeClass('active');
        $('.landing-page-side-form__overlay').removeClass('active');
    });

    // Side nav dropdown
    $('.side-navigation__item--dropdown').on('click', function (e) {
        if ($(e.target).hasClass('side-navigation__link')) {
            var dropdown = $(this).find('.side-navigation__dropdown').first();
            dropdown.toggleClass('active');
            $('.side-navigation__dropdown').not(dropdown).removeClass('active');
        }
    });

    $('.side-navigation__dropdown_item--dropdown').on('click', function () {
        $(this).find('.side-navigation__dropdown').first().toggleClass('active');
        console.log('seconf');
    });

    $('.side-navigation').on('click', function (e) {
        if ($(e.target).hasClass('.side-navigation__item--dropdown') || !$(e.target).closest('.side-navigation__item--dropdown').length) {
            $('.side-navigation__dropdown').removeClass('active');
            console.log(!$(e.target).hasClass('.side-navigation__item--dropdown'));
        }
    });

    // Header link active state
    $('.header__navigation-item').on('click', function () {
        if (!$(this).hasClass('dropdown')) {
            $(this).addClass('active');
        }
    });

    // Video play

    $('.icons').on('click', function (e) {
        $(this).remove();
    });

    $('.account-modal__buttons_signup--social').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var elem = $(this);
        $('.account-modal__content_section--signup_social').find('.account-modal__input').each(function () {
            if ($(this).val().length === 0) {
                $(this).closest('.account-modal__input-container').addClass('error');
            }
        });
        var verifyPass = $('.account-modal__content_section--signup_social').find('.account-modal__input--password').val() === $('.account-modal__content_section--signup_social').find('.account-modal__input--verifypassword').val();
        var verifyInputs = !$('.account-modal__content_section--signup_social').find('.account-modal__input-container').hasClass('error');
        if (verifyInputs && verifyPass) { // Add in condition for signup
            $(elem).prev().removeClass('active');
            $('#socialSignupForm').submit();
        } else {
            if (!verifyPass) {
                $('.account-modal__content_section--signup').find('.account-modal__input--verify-password').closest('.account-modal__input-container').addClass('error').removeClass('answered');
            }
            $(elem).prev().addClass('active');
        }
    });

}(jQuery));





