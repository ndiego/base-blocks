document.addEventListener( 'DOMContentLoaded', function() {
    const buttons = document.querySelectorAll( '[data-theme-switcher]' );
    if ( ! buttons.length ) return;

    // System preference media query
    const systemPrefersDark = window.matchMedia( '(prefers-color-scheme: dark)' );

    function handleSystemPreference( e ) {
        if ( getActiveTheme() !== 'system' ) return;
        
        if ( e.matches ) {
            document.documentElement.classList.add( 'dark-theme' );
        } else {
            document.documentElement.classList.remove( 'dark-theme' );
        }
    }

    // Listen for system preference changes
    systemPrefersDark.addEventListener('change', handleSystemPreference);

    function getActiveTheme() {
        return getCookie( 'theme-preference' ) || 'system';
    }

    function initializeTheme() {
        const activeTheme = getActiveTheme();
        setActiveState( activeTheme );

        if ( activeTheme === 'system' ) {
            // Check system preference
            handleSystemPreference( systemPrefersDark );
        } else if ( activeTheme === 'dark' ) {
            document.documentElement.classList.add( 'dark-theme' );
        } else {
            document.documentElement.classList.remove( 'dark-theme' );
        }
    }

    // Add click handlers
    buttons.forEach( button => {
        button.addEventListener( 'click', function() {
            const theme = getThemeFromButton( this );
            applyThemeState( theme );
        } );
    } );

    function getThemeFromButton( button ) {
        const label = button.getAttribute( 'aria-label' );
        if ( label.includes( 'light' ) ) return 'light';
        if ( label.includes( 'dark' ) ) return 'dark';
        return 'system';
    }

    function setActiveState( theme ) {
        buttons.forEach( button => {
            const buttonTheme = getThemeFromButton( button );
            button.setAttribute( 'data-active', buttonTheme === theme );
            button.setAttribute( 'aria-checked', buttonTheme === theme );
        } );
    }

    function applyThemeState( state ) {
        setActiveState( state );

        if ( state === 'system' ) {
            deleteCookie( 'theme-preference' );
            handleSystemPreference( systemPrefersDark );
        } else {
            setCookie( 'theme-preference', state, 365 );
            if ( state === 'dark' ) {
                document.documentElement.classList.add( 'dark-theme' );
            } else {
                document.documentElement.classList.remove( 'dark-theme' );
            }
        }
    }

    function setCookie( name, value, days ) {
        const date = new Date();
        date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }

    function getCookie( name ) {
        const match = document.cookie.match( new RegExp( '(^| )' + name + '=([^;]+)' ) );
        return match ? match[2] : null;
    }

    function deleteCookie( name ) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }

    // Initialize theme on load
    initializeTheme();
} ); 