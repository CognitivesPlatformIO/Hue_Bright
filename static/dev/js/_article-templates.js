/**
 * Handlebar Article templates for listing
 */

var systemCardTemplate =
        '<div itemscope itemtype="http://schema.org/NewsArticle"  class="{{containerClass}} ">'+
        '<article class="card--article channel-6 {{blogClass}} swap" id="Article{{articleId}}" data-id="{{articleId}}" data-position="{{position}}" data-social="0" data-article-image="{{imageUrl}}" data-article-text="{{title}}">'+
        '<a  itemscope itemtype="http://schema.org/NewsArticle"  itemprop="url" href="{{url}}" class="card card--entertainment link  {{#unless hasMedia}} card__no-image {{/unless}}" {{#if hasMedia}} style="background-image: url({{imageUrl}})" {{/if}}>'+
        '<meta itemscope itemprop="mainEntityOfPage"  itemType="https://schema.org/WebPage" itemid="{{url}}"/>'+
        '{{#if hasMedia}}  '+
        '<div itemprop="image" itemscope itemtype="https://schema.org/ImageObject">'+
            '<meta itemprop="url" content="{{featuredMedia.media.url}}"/>'+
            '<meta itemprop="width" content="{{featuredMedia.media.width}}"/>'+
            '<meta itemprop="height" content="{{featuredMedia.media.height}}"/>'+
        '</div>'+
        '{{/if}}'+
        '{{#if publisher.url}}  '+
        '<div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">'+
            '<meta itemprop="name" content="{{publisher.name}}"/>'+
            '<div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">'+
                '<meta itemprop="url" content="{{publisher.url}}"/>'+
                '<meta itemprop="width" content="{{publisher.width}}"/>'+
                '<meta itemprop="height" content="{{publisher.height}}"/>'+
            '</div>'+
        '</div>'+
        '{{/if}}'+
        '<meta itemprop="datePublished" content="{{metaPublishDate}}"/>'+
        '<meta itemprop="dateModified" content="{{metaUpdateDate}}"/>'+
        '<div class="card__overlay">'+
                '<div class="card__content-wrap">'+
                    '{{#if userHasBlogAccess}}'+
                    '<div class="admin-actions">'+
                        '<div class="admin-actions__action admin-actions__action--hide HideBlogArticle" data-guid="{{article.guid}}" data-social="0">'+
                            '<span>HIDE</span>'+
                            '<img src="{{templatePath}}/static/images/icons/editor/hide.svg" alt="hide card">'+
                        '</div>'+
                   
                        '<div class="admin-actions__action admin-actions__action--pin PinArticleBtn {{pinCls}}" data-position="{{position}}" data-social="0" data-id="{{articleId}}" title="{{pinTitle}}" data-status="{{isPinned}}">'+
                            '<span>{{pinText}}</span>'+
                            '<img src="{{templatePath}}/static/images/icons/editor/pin.svg" alt="pin card">'+
                        '</div>'+
                        '<div class="admin-actions__action admin-actions__action--edit"  onclick="window.location=\'{{{editUrl}}}\'; return false;">'+
                            '<span>EDIT</span>'+
                            '<img src="{{templatePath}}/static/images/icons/editor/edit.svg" alt="edit card">'+
                        '</div>'+
                    '</div>'+
                    "{{/if}}"+
                    '<div class="card__content">'+
                        '<div class="card__channel-wrap">'+
                            '<h5 class="card__channel">{{label}}</h5>'+
                        '</div>'+
                        '<h3 itemprop="headline"  class="card__headline">{{title}}</h3>'+
                        '<p itemprop="description" class="card__text">{{{excerpt}}}</p>'+
                        '<div itemprop="author" itemscope itemtype="https://schema.org/Person">'+
                             '<meta itemprop="name" content="{{createdBy.displayName}}"/>'+
                        '</div>'+
                        '<div class="card__read-time_wrap">'+
                            '<p class="card__read-time"><img src="{{templatePath}}/static/images/icons/paragraph.svg" alt="paragraph icon">{{readingTime}}</p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</a>'+
    '</article>'+
'</div>';
                                                       
var socialCardTemplate =  '<div class="{{containerClass}}">'+
    '<article class="card--social channel-4 swap {{social.media.type}}" id="Social{{socialId}}" data-source="{{social.source}}"  data-id="{{socialId}}" data-label="{{social.blog.title}}" data-position="{{position}}" data-social="1" data-article-image="{{social.media.path}}" data-article-text="{{social.content}}" data-user-image="{{social.user.media.path}}" data-user-name="{{ social.user.name }}">'+
        '<a href="{{ social.url }}" class="card social__video card--{{social.blog.title }} link card__{{social.source}} {{#unless social.hasMedia}} card__no-image{{/unless}} socialCard" {{#if social.hasMedia}} style="background-image: url({{social.media.path}})" {{/if}} target="_blank" data-blog-guid="{{social.blog.guid}}" data-guid="{{social.guid}}">'+
            '<div class="card__overlay">'+
                '<div class="card__content-wrap">'+
                    '{{#if userHasBlogAccess}}'+
                    '<div class="admin-actions">'+
                        '<div class="admin-actions__action admin-actions__action--hide HideBlogArticle" data-guid="{{social.guid}}" data-social="1">'+
                            '<span>HIDE</span>'+
                            '<img src="{{templatePath}}/static/images/icons/editor/hide.svg" alt="hide card">'+
                        '</div>'+
                        '<div class="admin-actions__action admin-actions__action--pin PinArticleBtn" data-position="{{position}}" data-social="1" data-id="{{socialId}}" title="{{pinTitle}}" data-status="{{isPinned}}">'+
                            '<span>{{pinText}}</span>'+
                            '<img src="{{templatePath}}/static/images/icons/editor/pin.svg" alt="pin card">'+
                        '</div>'+
                        '<div class="admin-actions__action admin-actions__action--edit" data-social="1" onClick="window.open(\'/admin/social-funnel/update-social?guid={{social.blog.guid}}&socialguid={{social.guid}}\', \'_blank\', \'toolbar=yes,scrollbars=yes,resizable=yes,width=360,height=450\'); return false;">'+
                            '<span>EDIT</span>'+
                            '<img src="{{templatePath}}/static/images/icons/editor/edit.svg" alt="edit card">'+
                        '</div>'+
                    '</div>'+	
                     "{{/if}}"+
                    '<div class="card__content">'+
                        '<div class="card__channel-wrap">'+
                            '<h5 class="card__channel">{{social.blog.title }}</h5>'+
                        '</div>'+
                        '{{#if hasMediaVideo }}'+
                        '<div class="card__text-wrap">'+
                            '<img class="card__play-button video-player" data-source="{{social.source}}" data-url="{{social.media.videoUrl}}" data-poster="{{social.media.path}}" src="{{templatePath}}/static/images/icons/play-white.svg" alt="Play video button">'+
                            '<p class="card__text description" id="updateSocial{{socialId}}" data-update="0">{{social.content}}</p>'+
                        '</div>'+
                        '<p class="card__author">@{{social.user.name}}</p>'+
                        '{{else}}'+
                            '<p class="card__text description" id="updateSocial{{socialId}}" data-update="0">{{{trimString social.content 50}}}</p>'+
                            '<p class="card__author">'+
                            '{{#if isTwitter}}'+
                                '@{{social.user.name}}'+
                            '{{else}}'+
                                '{{ social.user.name }}'+
                            '{{/if}}'+
                            '</p>'+
                        '{{/if}}'+
                     '</div>'+
                '</div>'+
            '</div>'+
        '</a>'+
    '</article>'+
'</div>';  
   
   
var socialPostPopupTemplate = '<button type="button" class="close close__lg-modal" data-dismiss="modal" aria-label="Close">'+
        '<span aria-hidden="true">'+
            '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">'+
                    '<title>Close</title>'+
                    '<g stroke-width="3" fill-rule="evenodd" stroke-linecap="round">'+
                            '<path d="M17.803 2L2 17.803M2.08 2.08l15.803 15.803"/>'+
                    '</g>'+
            '</svg>'+
            '<div class="close__text">esc</div>'+
        '</span>'+
	'</button>'+
	'<div class="social-modal__content {{blog.title}} {{#unless hasMedia}} no_image {{/unless}}">'+
                    '<button type="button" class="close close__sm-modal" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">'+
                                    '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Close</title><g stroke="#FFF" stroke-width="3" fill="none" fill-rule="evenodd" stroke-linecap="round"><path d="M17.803 2L2 17.803M2.08 2.08l15.803 15.803"/></g></svg>'+
                            '</span>'+
                    '</button>'+
                    '<div class="social-modal__channel social-modal__channel--technology ">{{blog.title}}</div>'+
                    '<div class="social-modal__overflow">'+
                            '<a href="{{url}}" target="_blank"><div class="social-modal__text">“<br>{{content}}</div></a>'+
                    '</div>'+
                    '<div class="social-user">'+
                        '<span class="social-user__image" style="background-image: url(\'{{user.media.path}}\');"></span>'+
                        '<div class="social-user__author-wrap">'+
                            '<span class="social-user__author">@{{user.name}}</span>'+
                            '<div class="social-user__button-wrap">'+
                                ' <div class="button button-sm button__share button__share--borderless header_actions header_actions__share">'+
                                    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'+
                                    '<svg width="13px" height="14px" viewBox="0 0 13 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+
                                        '<title>Shape</title>'+
                                        '<desc>Created with Sketch.</desc>'+
                                        '<defs></defs>'+
                                        '<g id="Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'+
                                            '<g id="Theme-3-Article---desktop" transform="translate(-1113.000000, -793.000000)" fill="#C0C2CA">'+
                                                '<g id="Article" transform="translate(215.000000, 216.000000)">'+
                                                    '<g id="Comments-Share" transform="translate(735.000000, 568.000000)">'+
                                                        '<g id="Share-button" transform="translate(151.000000, 0.000000)">'+
                                                            '<path d="M22.0625,18.3333333 C21.5305808,18.3333333 21.0420077,18.5150222 20.650499,18.8174222 L16.6106375,16.3818889 C16.6309173,16.2572889 16.6442308,16.1302 16.6442308,16 C16.6442308,15.8694889 16.6309173,15.7427111 16.6106375,15.6179556 L20.650499,13.1824222 C21.0420077,13.4851333 21.5305808,13.6666667 22.0625,13.6666667 C23.3447721,13.6666667 24.3846154,12.6218 24.3846154,11.3333333 C24.3846154,10.0448667 23.3447721,9 22.0625,9 C20.7802279,9 19.7403846,10.0448667 19.7403846,11.3333333 C19.7403846,11.4635333 19.7536981,11.5906222 19.7742875,11.7152222 L15.734426,14.1507556 C15.3429173,13.8483556 14.8543442,13.6666667 14.3221154,13.6666667 C13.0398433,13.6666667 12,14.7115333 12,16 C12,17.2884667 13.0398433,18.3333333 14.3221154,18.3333333 C14.8543442,18.3333333 15.3429173,18.1518 15.734426,17.8490889 L19.7742875,20.2846222 C19.7536981,20.4093778 19.7403846,20.5361556 19.7403846,20.6666667 C19.7403846,21.9551333 20.7802279,23 22.0625,23 C23.3447721,23 24.3846154,21.9551333 24.3846154,20.6666667 C24.3846154,19.3782 23.3447721,18.3333333 22.0625,18.3333333 L22.0625,18.3333333 Z" id="Shape"></path>'+
                                                        '</g>'+
                                                    '</g>'+
                                                '</g>'+
                                            '</g>'+
                                        '</g>'+
                                    '</svg>'+
                                    ' Share'+
                                    '<div class="share-popup" style="right: -166px;">'+
                                        '<div class="share-popup__title-wrap">'+
                                            '<span class="share-popup__title">Share:</span>'+
                                            '<img class="share-popup__close" src="{{templatePath}}/static/images/icons/close-small.svg" alt="">'+
                                        '</div>'+
                                        '<input type="text" name="share-link" value="{{url}}" readonly class="share-popup__share-link share-link">'+
                                        '<div class="share-popup__social-wrap">'+
                                            '<div class="social-icon_wrap--colored">'+
                                                '<a href="https://plus.google.com/share?url={{url}}" target="_blank"><i class="fa fa-google-plus"></i></a>'+
                                                '<a href="http://www.facebook.com/sharer/sharer.php?u={{url}}" target="_blank" ><i class="fa fa-facebook"></i></a>'+
                                                '<a href="http://twitter.com/intent/tweet?status={{url}}" target="_blank"><i class="fa fa-twitter"></i></a>'+
                                            '</div>'+
                                            '<span class="share-popup__copy-text">Copy Link</span>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
	'</div>'+
	'{{#if hasMedia}}'+
                    '<div class="social-modal__image_container">'+
                            '<div class="social-modal__image_wrap">'+
                                    '{{#if hasMediaVideo}}'+
                                            '<div class="social-modal__video-wrap">'+
                                                    '<div>'+
                                                            '<iframe src="{{media.videoUrl}}" frameborder="0" allowfullscreen></iframe>'+
                                                    '</div>'+
                                            '</div>'+
                                    '{{else}}'+
                                            '<div class="social-modal__image" style="background-image: url(\'{{media.path}}\');" >'+
                                                    '<img class="social-modal__image_image" src="{{media.path}}" alt="" />'+
                                            '</div>'+
                                    '{{/if}}'+
                            '</div>'+
                    '</div>'+
	'{{/if}}';   