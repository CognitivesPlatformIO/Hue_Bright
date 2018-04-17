var HomeController = (function ($) {
    return {
        listing: function () {
            HomeController.Listing.init();
        },
        blog: function() {
            HomeController.Blog.init();
        },
        article: function() {
            HomeController.Article.init();
        }
    };
}(jQuery));

HomeController.Listing = (function ($) {

    var bindPinUnpinArticle = function(){
        $('.PinArticleBtn').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var obj = $(this);
            var articleId = parseInt($(obj).data('id'));
            var position = parseInt($(obj).data('position'));
            var existingStatus = $(obj).data('status');
            var isSocial = $(obj).data('social');
            $.fn.pinUnpinArticle({
                articleId: articleId,
                isPinned: existingStatus,
                position: position,
                isSocialArticle: isSocial,
                onSuccess: function (data) {
                    $(obj).data('status', ((existingStatus == 1) ? 0 : 1));
                    (existingStatus == 1) ? $(obj).removeClass('selected') : $(obj).addClass('selected');
                    var status = $(obj).data('status');
                    (status == 1)
                            ? $(obj).attr('title', 'Un-Pin Article')
                            : $(obj).attr('title', 'Pin Article');
                    (status == 1)
                            ? $(obj).find('span').first().html('UN-PIN')
                            : $(obj).find('span').first().html('PIN');
                    var message = (status == 1)
                            ? 'Article pinned successfully'
                            : 'Article unpinned successfully';
							
					noty({
                        type: 'success',
                        text: message,
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
                beforeSend: function () {
                    $(obj).find('.fa').addClass('fa fa-spin fa-spinner').removeClass('fa-map-marker');
                },
                onComplete: function () {
                    $(obj).find('.fa').removeClass('fa-spin fa-spinner').addClass('fa-map-marker');
                }
            });
        });
    };
    
    var bindDeleteHideArticle = function () {
        $('.HideBlogArticle').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var obj = $(this);
            var isSocial = $(obj).data('social');
            var articleGuid = $(obj).data('guid');		
            var msgStr = (isSocial == 1) ? "Do you really want to delete this article?" : "Do you really want to hide this article?";
            var result = confirm(msgStr);
            if (result !== true) {
                    return;
            }
            $.fn.deleteArticle({
                articleGuid: articleGuid,
                isSocialArticle: isSocial,
                onSuccess: function (data) {
                    $(obj).closest('div.card_view').remove();
                },
                beforeSend: function (obj) {
                }
            });
        });
    };
    
    var bindSocialPostPopup = function () {

        $('body').on('click', 'div.admin-actions__action--edit', function (e) {
            e.stopPropagation();
        });
        
        $('body').on('click', '.close__lg-modal', function (e) {
            e.stopPropagation();
            $('.modal .modal-content').html('');
        });

        $('body').on('click', 'a.socialCard', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var blogGuid = $(this).data('blog-guid');
            var postGuid = $(this).data('guid');

            var csrfToken = $('meta[name="csrf-token"]').attr("content");
            $.ajax({
                type: 'POST',
                url: _appJsConfig.appHostName + '/api/social/get-social-post',
                dataType: 'json',
                data: {blog_guid: blogGuid, guid: postGuid, _csrf: csrfToken},
                success: function (data, textStatus, jqXHR) {
                    data.hasMediaVideo = false;
                    if (data.media['type'] === 'video') {
                        data.hasMediaVideo = true;
                    }
                    data.templatePath = _appJsConfig.templatePath;

                    if (data.source == 'youtube') {
                        var watch = data.media.videoUrl.split("=");
                        data.media.videoUrl = "https://www.youtube.com/embed/" + watch[1];
                    }

                    if (data.source == 'twitter') {
                        data.user.name = '@' + data.user.name;
                    }

                    var articleTemplate = Handlebars.compile(socialPostPopupTemplate);
                    var article = articleTemplate(data);

                    $('.modal .modal-content').html(article);
                    setTimeout(function () {
                        $('.modal').modal('show');
                    }, 500);
                },
                error: function (jqXHR, textStatus, errorThrown) {

                },
                beforeSend: function (jqXHR, settings) {

                },
                complete: function (jqXHR, textStatus) {

                }
            });
        });
    };
    
    var attachEvents = function () { 
        bindSocialPostPopup();
        
        if(_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
            //Bind pin/unpin article event
            bindPinUnpinArticle();

            //Bind delete social article & hide system article
            bindDeleteHideArticle();
        }
        
        function initSwap() {
            initDroppable();
            initDraggable();
        }

        function initDraggable() {
            $('.swap').draggable({
                helper: 'clone',
                revert: true,
                zIndex: 100,
                scroll: true,
                scrollSensitivity: 100,
                cursorAt: { left: 150, top: 50 },
                appendTo:'body',
//                containment: false,
                start: function( event, ui ) {
                    ui.helper.attr('class', '');
                    var postImage = $(ui.helper).data('article-image');
                    var postText = $(ui.helper).data('article-text');
                    if(postImage !== "") {
                        $('div.SwappingHelper img.article-image').attr('src', postImage);
                    }
                    else {
                        $('div.SwappingHelper img.article-image').attr('src', 'http://www.placehold.it/100x100/EFEFEF/AAAAAA&amp;text=no+image');
                    }
                    $('div.SwappingHelper p.article-text').html(postText);
                    $(ui.helper).html($('div.SwappingHelper').html());    
                }
            });
        }

        function initDroppable() {
            $('.swap').droppable({
                hoverClass: "ui-state-hover",
                drop: function(event, ui) {
                    var sourceObj = $(ui.draggable);
                    var $this = $(this);
                    //get positions
                    var sourcePosition = sourceObj.data('position');
                    var sourcePostId = parseInt($(sourceObj).data('id'));
                    var sourceIsSocial = parseInt($(sourceObj).data('social'));
                    var destinationPosition = $this.data('position');
                    var destinationPostId = parseInt($($this).data('id'));
                    var destinationIsSocial = parseInt($($this).data('social'));
                    
                    $(this).after(ui.draggable.clone().removeAttr('style'));
                    $(ui.draggable).after($(this).clone());
                    $(ui.helper).remove(); //destroy clone
                    $(ui.draggable).remove();
                    $(this).remove();
                    
                    //swap positions
                    if(sourceIsSocial == 1) {
                        $('#Social'+sourcePostId).attr('data-position', destinationPosition);
                        $('#Social'+sourcePostId).find('.PinArticleBtn').attr('data-position', destinationPosition);
                    }
                    else {
                        $('#Article'+sourcePostId).attr('data-position', destinationPosition);
                        $('#Article'+sourcePostId).find('.PinArticleBtn').attr('data-position', destinationPosition);
                    }

                    if(destinationIsSocial == 1) {
                        $('#Social'+destinationPostId).attr('data-position', sourcePosition);
                        $('#Social'+destinationPostId).find('.PinArticleBtn').attr('data-position', sourcePosition);
                    }
                    else {
                        $('#Article'+destinationPostId).attr('data-position', sourcePosition);
                        $('#Article'+destinationPostId).find('.PinArticleBtn').attr('data-position', sourcePosition);
                    }
                    
                    var csrfToken = $('meta[name="csrf-token"]').attr("content");
                    var postData = {
                        sourcePosition: sourcePosition,
                        sourceArticleId: sourcePostId,
                        sourceIsSocial: sourceIsSocial,
                        
                        destinationPosition: destinationPosition,
                        destinationArticleId: destinationPostId,
                        destinationIsSocial: destinationIsSocial,
                        
                        _csrf: csrfToken
                    };
                    
                    $.ajax({
                        url: _appJsConfig.baseHttpPath + '/home/swap-article',
                        type: 'post',
                        data: postData,
                        dataType: 'json',
                        success: function(data){
                            if (data.success) {
                                noty({
                                    type: "success",
                                    text: "Articles swapped successfully",
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
                            }
//                            $(".card p, .card h1").dotdotdot();
                            
                            initSwap();
                            
                            //Bind pin/unpin article event
                            bindPinUnpinArticle();

                            //Bind delete social article & hide system article
                            bindDeleteHideArticle();
                            
                            bindSocialPostPopup();
                            
                            return $(".card p, .card h1").dotdotdot();
                        },
                        error: function(jqXHR, textStatus, errorThrown){
                            //$().General_ShowErrorMessage({message: jqXHR.responseText});
                            $().General_ShowNotification({message: errorMessage, type: 'error', timeout: 4000});
                        },
                        beforeSend: function(jqXHR, settings) { 
                        },
                        complete: function(jqXHR, textStatus) {
                        }
                    });

                }
            }); 
        }

        if(_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
            initSwap();
        }
        
        $('.loadMoreArticles').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            var btnObj = $(this);
            $.fn.LoadBlogArticles({
                offset: $('.ajaxArticles').data('offset'),
                limit: 20,
                viewTotalNonPinnedPost: $('.ajaxArticles').data('existing-nonpinned-count'),
                onSuccess: function(data, textStatus, jqXHR){
                    if (data.success == 1) {
                        $('.ajaxArticles').data('existing-nonpinned-count', data.existingNonPinnedCount);

                        if (data.articles.length < 20) {
                            $(btnObj).css('display', 'none');
                        }
                        
                        for (var i in data.articles) { 
                            data.articles[i]['containerClass'] = 'col-third';
                            data.articles[i]['templatePath'] = _appJsConfig.templatePath;
                            data.articles[i]['pinTitle'] = (data.articles[i].isPinned == 1) ? 'Un-Pin Article' : 'Pin Article';
                            data.articles[i]['pinText'] = (data.articles[i].isPinned == 1) ? 'UN-PIN' : 'PIN';
                            data.articles[i]['readingTime']= renderReadingTime(data.articles[i].readingTime);
                            
                            data.articles[i]['blogClass']= '';
                            if(data.articles[i].blog['title'] !== null) {
                               data.articles[i]['blogClass']= data.articles[i].blog['title'].replace(' ', '').toLowerCase();
                            }  
                            
                            var ImageUrl = $.fn.image({media: data.articles[i]['featuredMedia'], mediaOptions: {width: 500, height: 350, crop: 'limit'}});
                            data.articles[i]['imageUrl'] = ImageUrl;

                            Handlebars.registerHelper('trimString', function(passedString,len) {
                                var theString = passedString.substring( 0, len );
                                
                                if(passedString.length > len) {
                                    theString += '...';
                                }
                                return new Handlebars.SafeString(theString)
                            });
                          
                            var articleId = parseInt(data.articles[i].articleId);
                            var articleTemplate;
                            if (isNaN(articleId) || articleId <= 0) {
                                data.articles[i]['hasMediaVideo']= 0;
                                if(data.articles[i]['social']['media']['type'] === 'video') {
                                    data.articles[i]['hasMediaVideo'] = 1;
                                }
                                data.articles[i]['isTwitter']= 0;
                                if(data.articles[i]['social']['source'] === 'twitter') {
                                    data.articles[i]['isTwitter'] = 1;
                                }
                                
                                articleTemplate = Handlebars.compile(socialCardTemplate); 
                            } else {
                                articleTemplate = Handlebars.compile(systemCardTemplate);
                            }
                            var article = articleTemplate(data.articles[i]);
                            $('.ajaxArticles').append(article);
                        }
                        
                        bindSocialShareButton();
                        if (_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
                            //Bind pin/unpin article event
                            bindPinUnpinArticle();
                            //Bind delete social article & hide system article
                            bindDeleteHideArticle();
                            
                            bindSocialUpdatePost();
                            
                            initSwap();
                        }
                        
                        bindSocialPostPopup();
                        
                        $(".card p, .card h1").dotdotdot();
                    }
                },
                beforeSend: function(jqXHR, settings){
                    $(btnObj).html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Please wait...');
                },
                onComplete: function(jqXHR, textStatus){
                    $(btnObj).html('<i class="fa fa-arrow-down" aria-hidden="true"></i> Load More');
                }
            });
        });
        
        var renderReadingTime = function (time) {
            if (time <= '59') {
                return ((time <= 0) ? 1 : time) + ' min read';
            } else {
                var hr = Math.round(parseInt(time) / 100);
                return hr + ' hour read';
            }
        };
        
        var bindSocialShareButton = function () {
            $(".card__social-share").on("click", function (e) {
                e.preventDefault();
                var elem = $(this);
                if (elem.hasClass('selected')) {
                    $(this).removeClass("selected");
                } else {
                    $(".card__social-share").removeClass('selected');
                    $(this).addClass("selected");
                }
            });
        };
        var bindSocialUpdatePost = function () {
            $('.editSocialPost').on('click', function (e) {
                e.preventDefault();
                var elem = $(this);
                var url = elem.data('url');
                var popup = window.open(url, '_blank', 'toolbar=no,scrollbars=yes,resizable=false,width=360,height=450');
                popup.focus();

                var intervalId = setInterval(function () {
                    if (popup.closed) {
                        clearInterval(intervalId);
                        var socialId = elem.parents('article.card--social').data('id');
                        if ($('#updateSocial' + socialId).data('update') == '1') {
                            $().General_ShowNotification({message: 'Social Post(s) updated successfully.'});
                        }
                    }
                }, 50);

                return;
            });
        };
        
    };
    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));

HomeController.Blog = (function ($) {
    
    var attachEvents = function () {
       
        //attach follow blog
        $('.followBlog').followBlog({
            'onSuccess': function(data, obj){
                var message = ($(obj).data('status') === 'follow') ? 'Blog unfollowed successfully' : 'Blog followed successfully';
                $.fn.General_ShowNotification({message: message});
            },
            'beforeSend': function(obj){
                $(obj).html('Please wait...');
            },
            'onError': function (obj, errorMessage) {
                $().General_ShowNotification({message: errorMessage, type: 'error', timeout: 4000});
            },
            'onComplete': function(obj){
                ($(obj).data('status') === 'follow') ? $(obj).html('Follow') : $(obj).html('Following');
            }
        });
        
        //attach follow user
        $('.followUser').followUser({
            'onSuccess': function(data, obj){
                
            },
            'beforeSend': function(obj){
                $(obj).html("Please wait...");
            },
            'onComplete': function(obj){
                ($(obj).data('status') === 'follow') ? $(obj).html("Follow +") : $(obj).html("Following -");
            }
        });
        
    };
    
    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));

HomeController.Article = (function ($) {
    
    var attachEvents = function () {

        $('.video-player').videoPlayer();

        $('.followArticleBtn').followUser({
            onSuccess: function (data, obj) {
                ($(obj).data('status') === 'follow') ? $(obj).html("Follow") : $(obj).html("Unfollow");
                var message = ($(obj).data('status') === 'follow') ? 'User unfollowed successfully' : 'User followed successfully';
                $.fn.General_ShowNotification({message: message});
            },
            beforeSend: function (obj) {
                $(obj).html('please wait...');
            },
            'onComplete': function(obj){
                ($(obj).data('status') === 'follow') ? $(obj).html("Follow") : $(obj).html("Unfollow");
            }
        });
        
        $('.followBlog').followBlog({
            'onSuccess': function(data, obj){
                var message = ($(obj).data('status') === 'follow') ? 'Blog unfollowed successfully' : 'Blog followed successfully';
                $.fn.General_ShowNotification({message: message});
                var lbl = $(obj).data('label');
                ($(obj).data('status') === 'follow') ? $(obj).find('.followTxt').html('Follow ' + lbl) : $(obj).find('.followTxt').html('Unfollow ' + lbl);
            },
            'beforeSend': function(obj){
                $(obj).find('.followTxt').html('Please wait...');
            },
            'onComplete': function(obj){
                
            }
        });

    };
    
    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));