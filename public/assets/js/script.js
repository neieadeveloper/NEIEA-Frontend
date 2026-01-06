jQuery(document).ready(function ($) {

	$('.dropdown-menu .dropdown-submenu > .dropdown-item').addClass('dropdown-toggle');
	
    if($('.mouse-indi-wrap')){
        $('.mouse-indi-wrap').on('click', function(){
            $('html, body').animate({
                scrollTop: $(this).closest('section').next().offset().top - 75
            }, 10);
        })
    }
	// 	for search page
	if($('.search-radio-btns')){
		$('.search-radio-btns input').on('change', function(){
			$(this).closest('form').submit();
		})
	}
    // blogs filter
    // for pagination
	
	if(window.location.pathname != '/' && !window.location.href.includes('?s')){
		$(document).on('click','.blog-pagin a', function(e){
			e.preventDefault();
			let urlParams = new URLSearchParams(new URL($(this).attr('href')).search);
			let page =  urlParams.get('paged');
			if(page > 0){
				$('.blogs-filter input[name="page"]').val(page);
			} else{
				const HREF = $(this).attr('href').split('/');
				$('.blogs-filter input[name="page"]').val(HREF[HREF.length - 2]);
			}
			$('.blogs-filter').submit();
		})
	}
    $('.by-taxonomy a.dropdown-item').on('click', function(e){
        e.preventDefault();
        $(this).closest('.by-taxonomy').find('.dropdown-toggle').html(`<span class="dt-inner">${e.target.innerText}</span>`);
        $(this).closest('.by-taxonomy').find('input').val(e.target.innerText);
        $('.blogs-filter input[name="page"]').val(1);
        $('.blogs-filter').submit();
    })
    $('.blogs-filter input[type="checkbox"]').on('change', function(){
        $('.blogs-filter input[name="page"]').val(1);
        $('.blogs-filter').submit();
    })
    let timeoutDebounce;
    $('.blogs-filter input[type="text"]').on('input', function(){
        clearTimeout(timeoutDebounce);
        timeoutDebounce = setTimeout(() => {
            $('.blogs-filter input[name="page"]').val(1);
            $('.blogs-filter').submit();
        }, 500);
    });

    if(window.location.href.includes('government-leaders')){

        $('.blogs-filter').on('submit', function(e){
            e.preventDefault();
            let formData = new FormData($(this)[0]);
            formData.append('action', 'govt_filters');
            $.ajax({
                url:AJAX_OBJECT.AJAX_URL,
                type:'POST',
                data:formData,
                processData:false,
                contentType:false,
                beforeSend:function(){
                    $('.loader').addClass('active');
                },
                success: function(response) {
                    $("#change-leader-html").html(response);
                    $('.loader').removeClass('active');
                }
            })
        });

    } else{
        // if not govt 
        $('.blogs-filter').on('submit', function(e){
            e.preventDefault();
            let formData = new FormData($(this)[0]);
            let selectedYears = [];
            $('.blogs-filter .by-year input[name="years[]"]:checked').each(function() {
                selectedYears.push($(this).val());
            });
            formData.append('years', selectedYears);
            formData.append('action', 'blogs_filter');
            $.ajax({
                url:AJAX_OBJECT.AJAX_URL,
                type:'POST',
                dataType:'json',
                data:formData,
                processData:false,
                contentType:false,
                beforeSend:function(){
                    $('.loader').addClass('active');
                },
                success: function(res) {
                    let result = res.data;
                    if(result.post_type == 'post'){
                        $('.blog-cards').html(result.data);
                        $('html, body').animate({
                            scrollTop: $('.blogs-filter').parent().parent().offset().top - 50
                        }, 10);                        
                    } else if(result.post_type == 'press_release'){
                        $('.press-focus').html(result.data);
                        $('html, body').animate({
                            scrollTop: $('.press-releases').offset().top - 50
                        }, 10);
                    }
                    else if(result.post_type == 'newsletters'){
                        $('.press-focus').html(result.data);
                        $('html, body').animate({
                            scrollTop: $('.press-releases').offset().top - 50
                        }, 10);
                    }
                    else if(result.post_type == 'thought-leadership'){
                        $('.press-focus').html(result.data);
                        $('html, body').animate({
                            scrollTop: $('.press-releases').offset().top - 50
                        }, 10);
                    }
                    else if(result.post_type == 'events'){
                        $('.more-evn-wr').html(result.data);
                        $('html, body').animate({
                            scrollTop: $('.blogs-filter').parent().parent().offset().top - 50
                        }, 10);  
                    } else if(result.post_type == 'business_leaders'){
                        $('.business-leaders-row').html(result.data);
                    } else if(result.post_type == 'philanthropy_leaders'){
                        $('.business-leaders-row').html(result.data);
                    } else if(result.post_type == 'entrepreneurs'){
                        $('.business-leaders-row').html(result.data);
                    }
                    else if(result.post_type == 'feature_story'){
                        $('.blog-cards').html(result.data);
                        $('html, body').animate({
                            scrollTop: $('.blogs-filter').parent().parent().offset().top - 50
                        }, 10);  
                    }
                    else if(result.post_type == 'inspiring_icons'){
                        $('.business-leaders-row').html(result.data);
                    }
                },
                error: function(xhr, status, error) {
                    console.log('AJAX Error:', status, error);
                }
            })
        })
    }
    
    
    // Navigation Dropdown
    function handleDropdownEvents() {
        if ($(window).width() > 1280) {
            $('.dropdown-menu a.dropdown-toggle').off('click').on('mouseenter', function (e) {
                if (!$(this).next().hasClass('show')) {
                    $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
                }
                var $subMenu = $(this).next(".dropdown-menu");
                $subMenu.toggleClass('show');

                $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
                    $('.dropdown-submenu .show').removeClass("show");
                });
				
                return false;
            });
			
			$('.dropdown-menu .dropdown-submenu').hover(
                function() {
                    $(this).find('> .dropdown-menu').addClass('show');
                    // NEVER add activechild to current page items
                    if (!$(this).find('> a').hasClass('current-page-item')) {
                        $(this).addClass('activechild');
                    }
                },
                function() {
                    $(this).find('> .dropdown-menu').removeClass('show');
                    $(this).removeClass('activechild');
                    // Force cleanup
                    $(this).find('.dropdown-submenu').removeClass('activechild show');
                    $(this).find('.dropdown-submenu .dropdown-menu').removeClass('show');
                }
            );
            
            $('.dropdown-menu .dropdown-submenu .dropdown-menu').hover(
                function() {
                    $(this).addClass('show');
                    // Only add activechild if parent is NOT a current page item
                    if (!$(this).parent().find('> a').hasClass('current-page-item')) {
                        $(this).parent().addClass('activechild');
                    }
                },
                function() {
                    $(this).removeClass('show');
                    $(this).parent().removeClass('activechild');
                    // Reset any deeper nested states
                    $(this).find('.dropdown-submenu').removeClass('activechild show');
                    $(this).find('.dropdown-submenu .dropdown-menu').removeClass('show');
                }
            );
        } else {
            $('.dropdown-menu a.dropdown-toggle').off('mouseenter').on('click', function (e) {
                if (!$(this).next().hasClass('show')) {
                    $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
                }
                var $subMenu = $(this).next(".dropdown-menu");
                $subMenu.toggleClass('show');

                $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
                    $('.dropdown-submenu .show').removeClass("show");
                });

                return false;
            });
			$('.dropdown-menu .dropdown-submenu').off('click').on('click', function(e) {
                e.stopPropagation();
                $(this).find('> .dropdown-menu').toggleClass('show');
                $(this).find('> a').toggleClass('flip');
            });
            
			
			$('.dropdown-submenu > a').on('click', function(e) {
                e.stopPropagation();
                window.location.href = $(this).attr('href');
			});

        }
    }
    if ($(window).width() > 1024) {
        $('.nav-item.dropdown').on('mouseenter', function(){
            $(this).find('> a').addClass('show');
            $(this).find('.dropdown-menu').removeClass('show');
            $(this).find('> .dropdown-menu').addClass('show');
        })
        $('.nav-item.dropdown').on('mouseleave', function(){
            $(this).find('> a').removeClass('show');
            $(this).find('> .dropdown-menu').removeClass('show');
            // Reset all nested dropdown states
            $(this).find('.dropdown-submenu').removeClass('activechild show');
            $(this).find('.dropdown-submenu .dropdown-menu').removeClass('show');
        })
        $('.menu-item').on('mouseenter', function(){
            $(this).find('> a').addClass('show');
            $(this).find('.dropdown-menu').removeClass('show');
            $(this).find('> .dropdown-menu').addClass('show');
        })
        $('.menu-item').on('mouseleave', function(){
            $(this).find('> a').removeClass('show');
            $(this).find('> .dropdown-menu').removeClass('show');
            // Reset all nested dropdown states
            $(this).find('.dropdown-submenu').removeClass('activechild show');
            $(this).find('.dropdown-submenu .dropdown-menu').removeClass('show');
        })
    }

    // Global dropdown cleanup function
    function resetAllDropdownStates() {
        $('.dropdown-submenu').removeClass('activechild show');
        $('.dropdown-menu').removeClass('show');
        $('.dropdown-toggle').removeClass('show active');
        // Note: We don't remove current-page-item class as it indicates the current page
        console.log('Reset all dropdown states');
    }
    
    // Enhanced cleanup function for navigation changes
    function resetAllDropdownStatesOnNavigation() {
        $('.dropdown-submenu').removeClass('activechild show');
        $('.dropdown-menu').removeClass('show');
        $('.dropdown-toggle').removeClass('show active');
        // Force re-evaluation of current page items
        setTimeout(updateCurrentPageItems, 50);
        console.log('Reset all dropdown states on navigation');
    }
    
    // Aggressive nested dropdown cleanup function
    function forceResetNestedDropdowns() {
        $('.dropdown-submenu').removeClass('activechild');
        $('.dropdown-submenu .dropdown-menu').removeClass('show');
        console.log('Force reset nested dropdowns');
    }

    // Reset dropdown states when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.dropdown, .dropdown-menu, .dropdown-submenu').length) {
            resetAllDropdownStates();
        }
    });

    // Reset dropdown states when pressing escape
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            resetAllDropdownStates();
        }
    });

    handleDropdownEvents();
    $(window).resize(function () {
        handleDropdownEvents();
    });

    // for numbers increase on scroll
    function increment(element, start, end, duration, increaseBy) {
        const range = end - start;
        const stepTime = Math.abs(duration / range);
        const increment = increaseBy ? increaseBy : 1;

        let current = start;
        let steps = 0;
    
        const interval = setInterval(function () {
            current += increment;
            steps++;
    
            if (current >= end && increment > 0 || current <= end && increment < 0) {
                current = end;
            }
    
            if (current > 1000) {
                element.html(Intl.NumberFormat('en-US').format(current));
            } else {
                element.html(current);
            }
    
            if (current === end || steps >= range) {
                clearInterval(interval);
                element.parent().addClass('n-cmp');
                showPTagsOfStats();
            }
        }, stepTime);
    }
    let firstTimeHuh = true;
    function showPTagsOfStats(){
        if($('.p-fade-anim .n-cmp').length == $('.p-fade-anim h4').length && firstTimeHuh){
            $('.p-fade-anim .n-cmp').each((i, el) => {
                setTimeout(() => {
                    console.log($(el));
                    $(el).next().css('opacity', '1');
                }, 100 * (i * 2));
            });
            firstTimeHuh = false;
        }
    }
    
    function isInViewport(element) {
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }
    let statOne = true;
    let statTwo = true;
    let statThree = true;
    let statFour = true;

    let homeStatOne = $("#home-stat-one").html();
    let homeStatTwo = $("#home-stat-two").html();
    let homeStatThree = $("#home-stat-three").html();

    let successOne = $("#success-one").html();
    let successTwo = $("#success-two").html();
    let successThree = $("#success-three").html();
    let successFour = $("#success-four").html();

    $(window).on('scroll resize', function() {
        if(window.location.pathname == '/' && $('.home-stat-one').length > 0){
            const duration = 1000;
            if (isInViewport($('.home-stat-one')) && statOne) {
                setTimeout(() => {
                    statOne = false;
                    increment($('.home-stat-one'), 0, homeStatOne, duration, 50);
                }, 200);
            }
            if (isInViewport($('.home-stat-two')) && statTwo) {
                setTimeout(() => {
                    statTwo = false;
                    increment($('.home-stat-two'), 0, homeStatTwo, duration, 1);
                }, 200);
            }   
            if (isInViewport($('.home-stat-three')) && statThree) {
                setTimeout(() => {
                    statThree = false;
                    increment($('.home-stat-three'), 0, homeStatThree, duration, 1);
                }, 200);
            }
        }
        if($('.stat-one').length > 0){
            const duration = 1000;
            if (isInViewport($('.stat-one')) && statOne) {
                setTimeout(() => {
                    statOne = false;
                    increment($('.stat-one'), 0, successOne, duration);
                }, 200);
            }
            if (isInViewport($('.stat-two')) && statTwo) {
                setTimeout(() => {
                    statTwo = false;
                    increment($('.stat-two'), 0, successTwo, duration, 3);
                }, 200);
            }
            if (isInViewport($('.stat-three')) && statThree) {
                setTimeout(() => {
                    statThree = false;
                    increment($('.stat-three'), 0, successThree, duration);
                }, 200);
            }
            if($('.stat-four').length > 0){
                if (isInViewport($('.stat-four')) && statFour) {
                    setTimeout(() => {
                        statFour = false;
                        increment($('.stat-four'), 0, successFour, duration);
                    }, 200);
                }
            }
        }

    });

    // copy url to clipboard
    $('.cp--url').on('click', function(e){
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        alert('Url copied to clipboard.')
    })



    // Header Search
    $(".header-search-toggle").on("click", function () {
        $(".header-search-wrp").toggleClass('active');
        $('body').toggleClass('overflow-hidden');
    });
    $("#close-search").on("click", function () {
        $(".header-search-wrp").removeClass('active');
        $('body').toggleClass('overflow-hidden');
    });
    $(".header-search-wrp").on("click", function (e) {
        if($(e.target).hasClass('header-search-wrp')){
            $(".header-search-wrp").removeClass('active');
            $('body').toggleClass('overflow-hidden');
        }
    });
    // Home Banner Carousel
    $('.banner-car').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    // Banner Dots
    if ($(window).width() > 1279) {
        $('.banner-car .owl-dots').css('left', parseFloat($('.banner-car .container').css('margin-left')) + -6);
    }else if($(window).width() > 767){
        $('.banner-car .owl-dots').css('left', parseFloat($('.banner-car .container').css('margin-left')) + 6);
    }
    

    // Home Banne Carousel
    $('#bod-profile-slider').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        stagePadding:30,
        dots: false,
        items: 2,
        navText: [
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 12H6" stroke="#06038F" stroke-width="1.5"stroke-linecap="round" stroke-linejoin="round"/><path d="M12 6L6 12L12 18" stroke="#06038F" stroke-width="1.5" stroke-linecap="round"stroke-linejoin="round"/></svg>', 
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12H18" stroke="#06038F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 6L18 12L12 18" stroke="#06038F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        ],
    });

    // Testimonial Carousel
    $('.testimonial-car').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        navText: [
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 12H6" stroke="#06038F" stroke-width="1.5"stroke-linecap="round" stroke-linejoin="round"/><path d="M12 6L6 12L12 18" stroke="#06038F" stroke-width="1.5" stroke-linecap="round"stroke-linejoin="round"/></svg>', 
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12H18" stroke="#06038F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 6L18 12L12 18" stroke="#06038F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        ],
        responsive: {
            0: {
                items: 1
            }
        }
    });
    $('.even-landing-car').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        dots:false,
        center: true,
        autoWidth: true,
        responsive:{
            0:{
                items:1,
				autoWidth: false
            },
			576:{
				autoWidth: true,
			}
        }
     });


    // Member Tabs
    if(!window.location.href.includes('members')){
        $(".tabs > .tab").on("click", function () {
            let tab = $(this);
            // Toggle Active Class
            $(".tab").removeClass("active");
            tab.addClass("active");
            // Active Tab
            let activeTab = $(".tabs > .active").attr("id");
            // Toggle Cards Via Tabs
            $(".member-cards").find(".row").removeClass("active");
            $(".member-cards").find("." + activeTab).addClass("active");
            $(".leader-tabs").find(".row").removeClass("active");
            $(".leader-tabs").find("." + activeTab).addClass("active");
            $(".leader-tabs").find(".row1").removeClass("active");
            $(".leader-tabs").find("." + activeTab).addClass("active");
            $(".event-tabs-content").find(".tab-content").removeClass("active");
            $(".event-tabs-content").find("." + activeTab).addClass("active");
        });
        // Show the first tab and hide the rest
        $('#tabs-nav li:first-child').addClass('active');
        $('.tab-content').hide();
        $('.tab-content:first').show();

        // Click function
        $('#tabs-nav li').click(function () {
            $('#tabs-nav li').removeClass('active');
            $(this).addClass('active');
            $('.tab-content').hide();

            var activeTab = $(this).find('a').attr('href');
            $(activeTab).fadeIn();
            return false;
        });
    }


    $('.dropdown.by-year a').on('click', function(e) {
        e.stopPropagation();
        let selYear = $('.dropdown.by-year input:checked').map(function() {
            return $(this).val();
        }).get();
        if(selYear.length > 0){
            $('.dropdown.by-year .dropdown-toggle').html(selYear.join(', '));
        } else{
            $('.dropdown.by-year .dropdown-toggle').html('Filter by Year');
        }
    });


    // Home video
    if($('video').length > 0){
        var motionQuery = matchMedia('(prefers-reduced-motion)');
        var btn = document.getElementById('play-pause');
        var v = document.querySelector('video');
        var vState;
        // v.muted = true;
        function reducedMotionCheck() {
            if (motionQuery.matches) {
                vState = '2';
                v.pause();
            }
            else {
                vState = '1';
                v.play();
            }
        }
        reducedMotionCheck();
        btn.addEventListener('click', function () {
            if (vState === '2') {
                v.play();
                vState = '1';
            }
            else {
                v.pause();
                vState = '2';
            }
        });
        $('#play-pause').click(function(){
            $('.play-btn').toggleClass('active');
            $('.pause-btn').toggleClass('show');
        });
        $('.home-video video, .leader-video video').click(function(){
            $('.play-btn').toggleClass('active');
            $('.pause-btn').toggleClass('show');
			if (vState === '2') {
                v.play();
                vState = '1';
            }
            else {
                v.pause();
                vState = '2';
            }
        });
    }


    // Load More Button
    if(window.location.href.includes('business-leaders') 
    || window.location.href.includes('philanthropy-leaders') 
    || window.location.href.includes('inspiring-icons') 
    || window.location.href.includes('entrepreneurs-leaders')){
        $(document).on('click', '.load-btn', function(){
            let cp = parseInt($('.blogs-filter input[name="page"]').val());
            $('.blogs-filter input[name="page"]').val(cp+1);
            let button = $(this);
            let formData = new FormData($('.blogs-filter')[0]);
            let selectedYears = [];
    
            var page = button.data('page');
            var newPage = page + 1;
            var postsPerPage = button.data('posts-per-page');
            var totalPosts = button.data('total-post');
    
            $('.blogs-filter .by-year input[name="years[]"]:checked').each(function() {
                selectedYears.push($(this).val());
            });
            formData.append('years', selectedYears);
            formData.append('action', 'filters_load_more');
    
            $.ajax({
                url:AJAX_OBJECT.AJAX_URL,
                type:'POST',
                dataType:'json',
                data:formData,
                processData:false,
                contentType:false,
                beforeSend: function() {
                    $('.loader').addClass('active');
                },
                success: function(response) {
                    if (response.data.data) {
                        if(!response.data.isLoadMore){
                            $(response.data.data).insertBefore(button.parent());
                            button.remove();
                            $('.loader').removeClass('active');
                        } else {
                            $(response.data.data).insertBefore(button.parent());
    
                            var remainingPosts = totalPosts - (newPage * postsPerPage);
                            if (remainingPosts > 0 && remainingPosts < postsPerPage) {
                                button.text(`Load ${remainingPosts} More`);
                            } else if (remainingPosts <= 0) {
                                button.remove();
                            } else {
                                button.text(`Load ${postsPerPage} More`);
                            }
    
                            button.data('page', newPage);
    
                            $('.loader').removeClass('active');
                        }
                    } else {
                        button.remove();
                        $('.loader').removeClass('active');
                    }
                }
            });
        });
    }
     else{
        var offset = 8;
        $('.load-btn').on('click', function() {
            var button = $(this);
            var page = button.data('page');
            var year = button.data('year');
            var newPage = page + 1;
            var action = button.data('action');
			var postsPerPage = button.data('posts-per-page');
            var totalPosts = button.data('total-post');
            $.ajax({
                url: AJAX_OBJECT.AJAX_URL,
                type: 'POST',
                data: {
                    action: action,
                    page: page,
                    year: year,
                    offset: offset
                },
                beforeSend: function() {
                    $('.loader').addClass('active');
                },
                success: function(response) {
                    if (response) {
                        var parser = new DOMParser();
                        var doc = parser.parseFromString(response, 'text/html');
                        var count;
                        // Determine the selector based on the action
                        switch(action) {
                            case 'member_load_founder':
                                count = doc.querySelectorAll('.member-founder-circle').length;
                                break;
                            case 'member_load_benefactor':
                                count = doc.querySelectorAll('.member-benefactor').length;
                                break;
                            case 'member_load_patrons':
                                count = doc.querySelectorAll('.member-patron').length;
                                break;
                            case 'load_bod':
                                count = doc.querySelectorAll('.bod_load').length;
                                break;
                            case 'load_team':
                                count = doc.querySelectorAll('.team_load').length;
                                break;
                            case 'load_ambassadors':
                                count = doc.querySelectorAll('.ambassadors_load').length;
                                break;
                            case 'country_cabinet_minister':
                                count = doc.querySelectorAll('.cabinet-minister-diplomats').length;
                                break;
                            case 'load_gov_cabinet':
                                count = doc.querySelectorAll('.gov-cabinet-leader').length;
                                break;
                        }
                        console.log(count);
                        if(count < 16){
                            $(response).insertBefore(button.parent());
                            button.remove();
                            $('.loader').removeClass('active');
                        } else {
                            $(response).insertBefore(button.parent());
                            button.data('page', newPage);
							
							var remainingPosts = totalPosts - (newPage * postsPerPage);
                            if (remainingPosts > 0 && remainingPosts < postsPerPage) {
                                button.text(`Load ${remainingPosts} More`);
                            } else if (remainingPosts <= 0) {
                                button.remove();
                            } else {
                                button.text(`Load ${postsPerPage} More`);
                            }
							
							
                            $('.loader').removeClass('active');
                            offset += 20;
                        }
                    } else {
                        button.remove();
                        $('.loader').removeClass('active');
                    }
                }
            });
        });
    }
        
	
	// 	Leaderhsip Filter of Government Leader List
	// $('.gov-leadership-item > a').on('click', function(e) {
	// 	e.preventDefault();
    //     e.stopPropagation();

	// 	let value = $(this).html();
	// 	let slug = $(this).data('slug');
		
	// 	let tabSelector = `#gov-leader-tab .leadership.${slug}`;

    //     if(slug == 'all'){
    //         $("#gov-leader-tab .leadership").css('display', 'flex');
    //         $("#gov-leader-tab .leadership.lt-head").css('display', 'block');
    //     }else{
    //         $("#gov-leader-tab .leadership").css('display', 'none');
    //         $(tabSelector).css('display', 'flex');
    //     }
		
	// });


    // Make Transparent Header Sticky
    if ($('header').hasClass('primary-header') && $(window).width() > 1024) {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 5) {
                $('header.primary-header').removeClass('primary-header');
                $('header .primary-logo').css('display', 'none');
                $('header').css('position', 'fixed');
                $('header').css('width', '100%');
            } else {
                $('header').addClass('primary-header');
                $('header .primary-logo').css('display', 'block');
            }
        });
    }

    // Comprehensive current page item management - handles all navigation sections
    function updateCurrentPageItems() {
    let pageURL = window.location.href;
        let currentPath = '';
        
        // Extract the current path from URL
        if (pageURL.includes('/about')) {
    let index = pageURL.indexOf('/about');
            currentPath = pageURL.substring(index);
        } else if (pageURL.includes('/our-works')) {
            let index = pageURL.indexOf('/our-works');
            currentPath = pageURL.substring(index);
        } else if (pageURL.includes('/courses')) {
            let index = pageURL.indexOf('/courses');
            currentPath = pageURL.substring(index);
        } else if (pageURL.includes('/partners')) {
            let index = pageURL.indexOf('/partners');
            currentPath = pageURL.substring(index);
        } else if (pageURL.includes('/donation')) {
            let index = pageURL.indexOf('/donation');
            currentPath = pageURL.substring(index);
        } else if (pageURL.includes('/nei-usa')) {
            let index = pageURL.indexOf('/nei-usa');
            currentPath = pageURL.substring(index);
        }
        
        // Remove any existing current page classes first
        $('.dropdown-item').removeClass('current-page-item');
        
        // Add current page class to matching items
        if (currentPath) {
            $(`a[href="${currentPath}"].dropdown-item`).addClass('current-page-item');
            console.log('Updated current page items for:', currentPath);
        } else {
            console.log('No matching navigation path found for:', pageURL);
        }
    }
    
    // Initialize current page items
    updateCurrentPageItems();
    
    // EMERGENCY: Force reset all dropdown states immediately
    function emergencyReset() {
        $('.dropdown-submenu').removeClass('activechild');
        $('.dropdown-menu').removeClass('show');
        $('.dropdown-toggle').removeClass('show active');
        console.log('Emergency reset executed');
    }
    
    // Run emergency reset immediately
    emergencyReset();
    
    // Also run it after a short delay to catch any delayed state changes
    setTimeout(emergencyReset, 100);
    setTimeout(emergencyReset, 500);
    
    // Re-run on navigation changes (for React Router)
    $(document).on('click', 'a[href]', function() {
        // Reset all dropdown states immediately
        resetAllDropdownStatesOnNavigation();
        // Small delay to allow navigation to complete
        setTimeout(updateCurrentPageItems, 100);
    });
    
    // Also run on popstate (back/forward button)
    $(window).on('popstate', function() {
        setTimeout(updateCurrentPageItems, 100);
    });
    
    // Periodic cleanup to prevent stuck states (every 2 seconds)
    setInterval(function() {
        // Check if any nested dropdowns are stuck with activechild class
        $('.dropdown-submenu.activechild').each(function() {
            if (!$(this).is(':hover')) {
                $(this).removeClass('activechild');
                console.log('Cleaned up stuck activechild state');
            }
        });
    }, 2000);


    // Submenu Active on Child hover : Header
    $('.second-level-wrapper').parent().hover(
        function() {
            let parentLi = $(this).parent();
            // Only add activechild if this is NOT a current page item
            if (!parentLi.find('> a').hasClass('current-page-item')) {
            parentLi.addClass('activechild');
            }
        },
        function() {
            let parentLi = $(this).parent();
            parentLi.removeClass('activechild');
            // Ensure all child dropdown states are reset
            parentLi.find('.dropdown-submenu').removeClass('activechild show');
            parentLi.find('.dropdown-menu').removeClass('show');
        }
    );
	
});

// Mailchimp Subscription Form
jQuery(document).ready(function ($) {
	$('.footer-form form').submit(function(e) {
		const input = $(this).find('input[type="email"]').val();
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if(input.length <= 0 || !emailPattern.test(input)) {
			e.preventDefault();
			$(this).find('input[type="email"]').css('border-color', 'red');
			$(this).find('input[type="email"]').css('border-right-color', 'transparent');
			$(this).find('.mce-error-response').html('Please enter valid Email Address.');
			$(this).find('.mce-error-response').css('color', 'red');
			$(this).find('.mce-error-response').show();
		}
		 else{
			$(this).find('input[type="email"]').css('border-color', 'green');
			$(this).find('input[type="email"]').css('border-right-color', 'transparent');
			$(this).find('.mce-error-response').hide();
		 }
	})
	
	
	
});
