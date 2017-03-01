var SearchController = (function ($) {
    return {
        listing: function () {
            SearchController.Listing.init();
        }
    };
}(jQuery));

SearchController.Listing = (function ($) {

    var attachEvents = function () {
        
        $('.loadMoreArticles').on('click', function(e){
            e.preventDefault();
            var btnObj = $(this);
            $.fn.Ajax_LoadSearchArticles({
                'search': $('input.header__search-text').val(),
                onSuccess: function(data, textStatus, jqXHR){
                      if (data.success == 1) {
                        for (var i in data.articles) {
                            
                            data.articles[i]['containerClass'] = 'col-third';
                            data.articles[i]['templatePath'] = _appJsConfig.templatePath;
                            data.articles[i]['readingTime']= renderReadingTime(data.articles[i].readingTime);
                            
                            data.articles[i]['blogClass']= '';
                            if(data.articles[i].blog['id'] !== null) {
                               data.articles[i]['blogClass']= 'card--blog_'+data.articles[i].blog['id'];
                            } 
                            
                            var ImageUrl = $.image({media:data.articles[i]['featuredMedia'], mediaOptions:{width: 500 ,height:350, crop: 'limit'} });
                            data.articles[i]['imageUrl'] = ImageUrl;
                           
                            var articleTemplate = Handlebars.compile(systemCardTemplate);

                            var article = articleTemplate(data.articles[i]);
                            $('.ajaxArticles').append(article);
                        }
                        if(data.articles.length < 20) {
                            $(btnObj).css('display', 'none');
                        }

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
                return time + ' min read';
            } else {
                var hr = Math.round(parseInt(time) / 100);
                return hr + ' hour read';
            }
        };      
    };
    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));