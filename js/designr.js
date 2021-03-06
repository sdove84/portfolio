$(document).ready(function () {
    $("#player").hide();
    /*============================================
     Page Preloader
     ==============================================*/

    $(window).load(function () {
        $('#page-loader').fadeOut(500);
    });

    /*============================================
     Navigation Functions
     ==============================================*/
    if ($(window).scrollTop() === 0) {
        $('#main-nav').removeClass('scrolled');
    }
    else {
        $('#main-nav').addClass('scrolled');
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() === 0) {
            $('#main-nav').removeClass('scrolled');
        }
        else {
            $('#main-nav').addClass('scrolled');
        }
    });

    /*============================================
     ScrollTo Links
     ==============================================*/
    $('a.scrollto').click(function (e) {
        $('html,body').scrollTo(this.hash, this.hash, {gap: {y: -80}});
        e.preventDefault();

        if ($('.navbar-collapse').hasClass('in')) {
            $('.navbar-collapse').removeClass('in').addClass('collapse');
        }
    });

    /*============================================
     Header Functions
     ==============================================*/
    $('.jumbotron').height($(window).height() + 50);
    $('.message-box').css({'marginTop': $(window).height() * 0.4});

    $('.home-slider').flexslider({
        animation: "slide",
        directionNav: false,
        controlNav: false,
        direction: "vertical",
        slideshowSpeed: 2500,
        animationSpeed: 500,
        smoothHeight: false
    });

    /*============================================
     Skills Functions
     ==============================================*/
    var aboutColor = $('#about').css('backgroundColor');

    $('#skills').waypoint(function () {
        $('.chart').each(function () {
            $(this).easyPieChart({
                size: 170,
                animate: 2000,
                lineCap: 'butt',
                scaleColor: false,
                barColor: aboutColor,
                lineWidth: 10
            });
        });
    }, {offset: '80%'});

    /*============================================
     Project thumbs - Masonry
     ==============================================*/
    $(window).load(function () {

        $('#projects-container').css({visibility: 'visible'});

        $('#projects-container').masonry({
            itemSelector: '.project-item:not(.filtered)',
            columnWidth: 350,
            isFitWidth: true,
            isResizable: true,
            isAnimated: !Modernizr.csstransitions,
            gutterWidth: 0
        });

        scrollSpyRefresh();
        waypointsRefresh();
    });

    /*============================================
     Filter Projects
     ==============================================*/
    $('#filter-works a').click(function (e) {
        e.preventDefault();

        $('#filter-works li').removeClass('active');
        $(this).parent('li').addClass('active');

        var category = $(this).attr('data-filter');

        $('.project-item').each(function () {
            if ($(this).is(category)) {
                $(this).removeClass('filtered');
            }
            else {
                $(this).addClass('filtered');
            }

            $('#projects-container').masonry('reload');
        });

        scrollSpyRefresh();
        waypointsRefresh();
    });

    /*============================================
     Project Preview
     ==============================================*/
    $('.project-item').click(function (e) {
        e.preventDefault();

        var elem = $(this),
            title = elem.find('.project-title').text(),
            link = elem.attr('href'),
            descr = elem.find('.project-description').html(),
            slidesHtml = '<ul class="slides">',

            slides = elem.data('images').split(',');

        for (var i = 0; i < slides.length; ++i) {
            slidesHtml = slidesHtml + '<li><img src=' + slides[i] + ' alt=""></li>';
        }

        slidesHtml = slidesHtml + '</ul>';


        $('#project-modal').on('show.bs.modal', function () {
            $(this).find('h1').text(title);
            $(this).find('.btn').attr('href', link);
            $(this).find('.project-descr').html(descr);
            $(this).find('.image-wrapper').addClass('flexslider').html(slidesHtml);

            setTimeout(function () {
                $('.image-wrapper.flexslider').flexslider({
                    slideshowSpeed: 3000,
                    animation: 'slide',
                    controlNav: false,
                    start: function () {
                        $('#project-modal .image-wrapper')
                            .addClass('done')
                            .prev('.loader').fadeOut();
                    }
                });
            }, 1000);
        }).modal();

    });

    $('#project-modal').on('hidden.bs.modal', function () {
        $(this).find('.loader').show();
        $(this).find('.image-wrapper')
            .removeClass('flexslider')
            .removeClass('done')
            .html('')
            .flexslider('destroy');
    });

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // Which album is currently being shown.
    var albumSelected = 0;

    // jQuery selectors for the albums.
    var albumSelectors = [
        $('#album-0'),
        $('#album-1'),
        $('#album-2'),
        $('#album-3'),
        $('#album-4'),
        $('#album-5'),
        $('#album-6'),
        $('#album-7'),
        $('#album-8'),
        $('#album-9')
    ];

    // Helper function to hide everything but the shown album.
    function hideAndShowAlbums() {
        //console.log('hideAndShowAlbums: ' + albumSelected);
        for (var i = 0; i < albumSelectors.length; i++) {
            var selector = albumSelectors[i];
            if (i === albumSelected) {
                $(selector).show();

            } else {
                $(selector).hide();
            }
        }
    }

    // Start with 9 albums contents hidden, and my photo up.
    hideAndShowAlbums();

    // For each of the albums, clicking on it removes any other albums, and brings up the contents.
    // Clicking on it again brings down the contents and restores album-0 (my photo).
    $('.album-cover img').click(function (event) {
        var albumId = event.target.id;
        var albumClicked = parseInt(albumId.slice(-1));
        //console.log('click: ' + albumClicked);
        $("#player").show();

        if (albumSelected === albumClicked) {
            // Already selected this album; turn it off.
            albumSelected = 0;
            $("#player").hide();

        } else {
            // Select the album clicked.
            albumSelected = albumClicked;
        }

        hideAndShowAlbums();
    });

    //selects song you want to be played when button is clicked and displays song currently playing
    var audio = document.getElementById("player");

    $("button").click(function () {
         $("#player").attr('src', $(this).attr('src'));
        audio.play();

        var this1 = $("#player").attr('src');
        var this2 = $(this).attr('src');

        if (this1 === this2) {
            var message = $(".song").html("Now Playing: ");
            $(".song").append(message, $(this).text());
        }
    });

    /*==============================================
     photo section
     ================================================*/


    $('#myCarousel').carousel({
        interval: 5000
    });

    //Handles the carousel thumbnails
    $('[id^=carousel-selector-]').click(function () {
        var id_selector = $(this).attr("id");
        try {
            var id = /-(\d+)$/.exec(id_selector)[1];
            console.log(id_selector, id);
            $('#myCarousel').carousel(parseInt(id));
        } catch (e) {
            console.log('Regex failed!', e);
        }
    });
    // When the carousel slides, auto update the text
    $('#myCarousel').on('slid.bs.carousel', function (e) {
        var id = $('.item.active').data('slide-number');
        $('#carousel-text').html($('#slide-content-' + id).html());
    });

    /* ==============================================
     GUITAR BUILDING MODAL
     =============================================== */


    // $('.myModal').modal();


    /*============================================
     Backstretch Images
     ==============================================*/
    $.backstretch('assets/header-bg.jpg');

    $('body').append('<img class="preload-image" src="assets/contact-bg.jpg" style="display:none;"/>');

    $('#about').waypoint(function (direction) {

        if ($('.preload-image').length) {
            $('.preload-image').remove();
        }

        $('.backstretch').remove();

        if (direction == 'down') {
            $.backstretch('assets/contact-bg.jpg');
        } else {
            $.backstretch('assets/header-bg.jpg');
        }
    });

    /*============================================
     Project Hover mask on IE
     ==============================================*/
    $('.no-csstransitions .hover-mask').hover(
        function () {
            $(this).stop(true, true).animate({opacity: 1});
        }, function () {
            $(this).stop(true, true).animate({opacity: 0});
        }
    );

    /*============================================
     Placeholder Detection
     ==============================================*/
    if (!Modernizr.input.placeholder) {
        $('#contact-form').addClass('no-placeholder');
    }

    /*============================================
     Scrolling Animations
     ==============================================*/
    $('.scrollimation').waypoint(function () {
        $(this).toggleClass('in');
    }, {offset: '90%'});

    /*============================================
     Refresh scrollSpy function
     ==============================================*/
    function scrollSpyRefresh() {
        setTimeout(function () {
            $('body').scrollspy('refresh');
        }, 1000);
    }

    /*============================================
     Refresh waypoints function
     ==============================================*/
    function waypointsRefresh() {
        setTimeout(function () {
            $.waypoints('refresh');
        }, 1000);
    }

});	