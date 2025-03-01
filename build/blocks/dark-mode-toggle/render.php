<?php
/**
 * Render the dark mode toggle block.
 *
 * @package base-blocks
 */

// Add the early theme detection script to head. This prevents a flash of unstyled content.
add_action( 'wp_head', function() {
	static $script_added = false;

	if ( $script_added ) {
		return;
	}

	$script_added = true;
	?>
	<script>
		( function() {
			var preference = document.cookie.match( /(?:^|;)\s*theme-preference\s*=\s*([^;]+)/ );
			var prefersDark = window.matchMedia( '(prefers-color-scheme: dark)' );
			
			if ( preference ) {
				var theme = preference[1];
				if ( theme === 'dark' ) {
					document.documentElement.classList.add( 'dark-theme' );
				}
			} else if ( prefersDark.matches ) {
				document.documentElement.classList.add( 'dark-theme' );
			}
		} )();
	</script>
	<?php
}, 0 );

$classes    = $attributes['className'] ?? '';
$is_sun_moon = strpos( $classes, 'is-style-sun-moon' ) !== false;

if ( $is_sun_moon ) {
	// Sun/Moon style icons.
	$sun_icon    = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
	$moon_icon   = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
	$system_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>';
} else {
	// Default style icons.
	$sun_icon    = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><circle cx="12" cy="12" r="7.25" stroke="currentColor" stroke-width="1.5" /></svg>';
	$moon_icon   = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><circle cx="12" cy="12" r="8" fill="currentColor" /></svg>';
	$system_icon = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 0 1-6.5 6.5v-13a6.5 6.5 0 0 1 6.5 6.5Z" /></svg>';
}
?>
<div <?php echo get_block_wrapper_attributes( array( 'role' => 'radiogroup' ) ); ?>>
	<button 
		aria-checked="true" 
		aria-label="<?php esc_attr_e( 'Switch to light theme.', 'base-blocks' ); ?>" 
		title="<?php esc_attr_e( 'Light', 'base-blocks' ); ?>"
		data-theme-switcher="true" 
		data-active="true"
		role="radio" 
		type="button"
	>
		<?php echo $sun_icon; ?>
	</button>
	<button 
		aria-checked="false" 
		aria-label="<?php esc_attr_e( 'Switch to system theme.', 'base-blocks' ); ?>" 
		title="<?php esc_attr_e( 'System', 'base-blocks' ); ?>"
		data-theme-switcher="true" 
		data-active="false"
		role="radio" 
		type="button"
	>
		<?php echo $system_icon; ?>
	</button>
	<button 
		aria-checked="false" 
		aria-label="<?php esc_attr_e( 'Switch to dark theme.', 'base-blocks' ); ?>" 
		title="<?php esc_attr_e( 'Dark', 'base-blocks' ); ?>"
		data-theme-switcher="true" 
		data-active="false"
		role="radio" 
		type="button"
	>
		<?php echo $moon_icon; ?>
	</button>
</div> 