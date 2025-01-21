<?php
/**
 * Dark Mode Toggle Block Template.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 *
 * @package Base Blocks
 */

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
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
            <circle cx="12" cy="12" r="7.25" stroke="currentColor" stroke-width="1.5" />
        </svg>
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
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 0 1-6.5 6.5v-13a6.5 6.5 0 0 1 6.5 6.5Z" />
        </svg>
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
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
            <circle cx="12" cy="12" r="8" fill="currentColor" />
        </svg>
    </button>
</div> 