/* INDIA SPORA STYLE NAVIGATION - CLEAN AND SIMPLE */

// Wait for jQuery to be loaded
(function() {
    'use strict';
    
    // Check if jQuery is loaded
    if (typeof jQuery === 'undefined') {
        console.error('jQuery is not loaded. Navigation fix cannot run.');
        return;
    }
    
    // Use jQuery with $ alias (already set in index.html)
    var $ = jQuery;
    
    $(document).ready(function() {
    console.log('NEIEA-style navigation loaded');
    
    // Simple function to update current page items
    function updateCurrentPageItems() {
        let pageURL = window.location.href;
        let currentPath = '';
        
        // Clear all current page classes first
        $('.dropdown-item').removeClass('current-page-item');
        
        // Determine current path based on URL
        if (pageURL.includes('/about')) {
            if (pageURL.includes('/introduction')) {
                currentPath = '/about-us/introduction';
            } else if (pageURL.includes('/leadership')) {
                currentPath = '/about-us/leadership';
            } else if (pageURL.includes('/testimonials')) {
                currentPath = '/about-us/testimonials';
            } else if (pageURL.includes('/reports-financials')) {
                currentPath = '/about-us/reports-financials';
            } else if (pageURL.includes('/contact')) {
                currentPath = '/about-us/contact';
            } else if (pageURL.includes('/gallery')) {
                currentPath = '/about-us/media-events/gallery';
            } else if (pageURL.includes('/discourse-oriented-pedagogy')) {
                currentPath = '/about-us/working-model/blended-learning/discourse-oriented-pedagogy';
            } else if (pageURL.includes('/application-of-technology')) {
                currentPath = '/about-us/working-model/blended-learning/application-of-technology';
            } else if (pageURL.includes('/partnering-institutions')) {
                currentPath = '/about-us/working-model/partnering-institutions';
            } else if (pageURL.includes('/remote-learning')) {
                currentPath = '/about-us/working-model/remote-learning';
            }
        } else if (pageURL.includes('/our-works')) {
            if (pageURL.includes('/elementary-middle-school')) {
                currentPath = '/our-works/education/elementary-middle-school';
            } else if (pageURL.includes('/slum-children')) {
                currentPath = '/our-works/education/slum-children';
            } else if (pageURL.includes('/public-government-school')) {
                currentPath = '/our-works/education/public-government-school';
            } else if (pageURL.includes('/girls-education')) {
                currentPath = '/our-works/education/girls-education';
            } else if (pageURL.includes('/out-of-school-dropout')) {
                currentPath = '/our-works/education/out-of-school-dropout';
            } else if (pageURL.includes('/madrasa')) {
                currentPath = '/our-works/education/madrasa';
            } else if (pageURL.includes('/teachers-training')) {
                currentPath = '/our-works/teachers-training';
            } else if (pageURL.includes('/skills-training')) {
                currentPath = '/our-works/skills-training';
            } else if (pageURL.includes('/adult-education')) {
                currentPath = '/our-works/adult-education';
            } else if (pageURL.includes('/global-education')) {
                currentPath = '/our-works/global-education';
            }
        } else if (pageURL.includes('/courses')) {
            if (pageURL.includes('/english')) {
                currentPath = '/courses/english';
            } else if (pageURL.includes('/math')) {
                currentPath = '/courses/math';
            } else if (pageURL.includes('/science')) {
                currentPath = '/courses/science';
            } else if (pageURL.includes('/social-science')) {
                currentPath = '/courses/social-science';
            } else if (pageURL.includes('/technical')) {
                currentPath = '/courses/technical';
            } else if (pageURL.includes('/financial-literacy')) {
                currentPath = '/courses/financial-literacy';
            } else if (pageURL.includes('/nios')) {
                currentPath = '/courses/nios';
            } else if (pageURL.includes('/cbse')) {
                currentPath = '/courses/cbse';
            }
        } else if (pageURL.includes('/partners')) {
            if (pageURL.includes('/join')) {
                currentPath = '/partners/join';
            } else if (pageURL.includes('/institutions')) {
                currentPath = '/partners/institutions';
            } else if (pageURL.includes('/global')) {
                currentPath = '/partners/global';
            }
        } else if (pageURL.includes('/donation')) {
            if (pageURL.includes('/be-partner')) {
                currentPath = '/donation/be-partner';
            } else if (pageURL.includes('/volunteer')) {
                currentPath = '/donation/volunteer';
            }
        } else if (pageURL.includes('/donate')) {
            currentPath = '/donate';
        } else if (pageURL.includes('/nei-usa')) {
            currentPath = '/nei-usa/introduction';
        }
        
        // Apply current page class
        if (currentPath) {
            $(`a[href="${currentPath}"].dropdown-item`).addClass('current-page-item');
            console.log('Current page item set:', currentPath);
        }
    }
    
    // Initialize current page items
    updateCurrentPageItems();
    
    // Update on navigation changes
    $(document).on('click', 'a[href]', function() {
        setTimeout(updateCurrentPageItems, 100);
    });
    
    $(window).on('popstate', function() {
        setTimeout(updateCurrentPageItems, 100);
    });
    
    // Simple dropdown close on click outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('.dropdown-menu').removeClass('show');
        }
    });
    
    // Close dropdowns on escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('.dropdown-menu').removeClass('show');
        }
    });
    
    console.log('NEIEA-style navigation initialized');
    });
})();
