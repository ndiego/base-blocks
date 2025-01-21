<?php
/**
 * Plugin Name:       Base Blocks
 * Plugin URI:        https://github.com/ndiego/base-blocks
 * Description:       A collection of blocks for the Base theme.
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            Nick Diego
 * Author URI:        https://nickdiego.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       base-blocks
 *
 * @package           base-blocks
 */

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function base_blocks_register_blocks() {
	register_block_type( __DIR__ . '/build/blocks/dark-mode-toggle' );
}
add_action( 'init', 'base_blocks_register_blocks' );
