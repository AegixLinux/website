/**
 * 🧠 SIDEBAR SCROLL MEMORY - Terminal Edition
 * Preserves sidebar scroll position when navigating between docs pages
 */

(function() {
    'use strict';
    
    // Only run on docs pages
    if (!window.location.pathname.startsWith('/docs/')) {
        return;
    }
    
    const STORAGE_KEY = 'aegix-sidebar-scroll-position';
    const SIDEBAR_SELECTOR = '.td-sidebar';
    const SIDEBAR_NAV_SELECTOR = '.td-sidebar-nav';
    const SIDEBAR_NAV_ID_SELECTOR = '#td-section-nav';
    const SIDEBAR_INNER_SELECTOR = '.td-sidebar__inner';
    
    // 💾 Save scroll position before page unload
    function saveScrollPosition() {
        const selectors = [
            SIDEBAR_NAV_ID_SELECTOR,
            SIDEBAR_NAV_SELECTOR,
            SIDEBAR_INNER_SELECTOR,
            SIDEBAR_SELECTOR
        ];
        
        for (let i = 0; i < selectors.length; i++) {
            const element = document.querySelector(selectors[i]);
            if (element && element.scrollTop !== undefined) {
                const scrollTop = element.scrollTop;
                localStorage.setItem(STORAGE_KEY, scrollTop.toString());
                console.log('🧠 Sidebar scroll saved:', scrollTop, 'from', selectors[i]);
                return; // Exit after first successful save
            }
        }
        console.log('🚫 No scrollable sidebar element found for saving');
    }
    
    // 🔄 Restore scroll position after page load
    function restoreScrollPosition() {
        const savedPosition = localStorage.getItem(STORAGE_KEY);
        
        if (savedPosition) {
            const scrollTop = parseInt(savedPosition, 10);
            const selectors = [
                SIDEBAR_NAV_ID_SELECTOR,
                SIDEBAR_NAV_SELECTOR,
                SIDEBAR_INNER_SELECTOR,
                SIDEBAR_SELECTOR
            ];
            
            for (let i = 0; i < selectors.length; i++) {
                const element = document.querySelector(selectors[i]);
                if (element && element.scrollTop !== undefined) {
                    element.scrollTop = scrollTop;
                    console.log('🔄 Sidebar scroll restored:', scrollTop, 'to', selectors[i]);
                    return; // Exit after first successful restore
                }
            }
            console.log('🚫 No scrollable sidebar element found for restoring');
        }
    }
    
    // 🎯 Enhanced restore with retry logic for dynamically loaded content
    function enhancedRestore() {
        let attempts = 0;
        const maxAttempts = 10;
        const retryDelay = 100;
        
        function tryRestore() {
            attempts++;
            
            const selectors = [SIDEBAR_NAV_ID_SELECTOR, SIDEBAR_NAV_SELECTOR, SIDEBAR_INNER_SELECTOR, SIDEBAR_SELECTOR];
            let found = false;
            
            for (let selector of selectors) {
                if (document.querySelector(selector)) {
                    found = true;
                    break;
                }
            }
            
            if (found) {
                restoreScrollPosition();
                return;
            }
            
            if (attempts < maxAttempts) {
                setTimeout(tryRestore, retryDelay);
            } else {
                console.log('🚫 Sidebar not found after', maxAttempts, 'attempts');
            }
        }
        
        tryRestore();
    }
    
    // 🔗 Save scroll position when clicking on sidebar links
    function attachLinkListeners() {
        const sidebarLinks = document.querySelectorAll('.td-sidebar a[href]');
        
        sidebarLinks.forEach(link => {
            // Only attach to internal docs links
            const href = link.getAttribute('href');
            if (href && (href.startsWith('/docs/') || href.startsWith('#'))) {
                link.addEventListener('click', function() {
                    console.log('🔗 Link clicked, saving scroll position');
                    saveScrollPosition();
                });
            }
        });
    }
    
    // 📜 Monitor scroll position changes and save periodically
    function setupScrollMonitoring() {
        const selectors = [SIDEBAR_NAV_ID_SELECTOR, SIDEBAR_NAV_SELECTOR, SIDEBAR_INNER_SELECTOR, SIDEBAR_SELECTOR];
        
        let scrollTimeout;
        
        function handleScroll() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                saveScrollPosition();
            }, 500); // Save 500ms after user stops scrolling
        }
        
        for (let selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                element.addEventListener('scroll', handleScroll);
                console.log('📜 Scroll monitoring attached to:', selector);
                break; // Only attach to the first found element
            }
        }
    }
    
    // 🚀 Initialize when DOM is ready
    function init() {
        console.log('🧠 Sidebar scroll memory initialized for:', window.location.pathname);
        
        // Restore scroll position
        enhancedRestore();
        
        // Set up link listeners
        setTimeout(attachLinkListeners, 100);
        
        // Set up scroll monitoring
        setTimeout(setupScrollMonitoring, 200);
        
        // Save before page unload
        window.addEventListener('beforeunload', saveScrollPosition);
        
        // Save when user navigates away (for single-page apps)
        window.addEventListener('pagehide', saveScrollPosition);
    }
    
    // 🎬 Start when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // 🔥 Also run after a short delay to catch any late-loading elements
    setTimeout(init, 300);
    
})();
