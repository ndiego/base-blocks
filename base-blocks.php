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

/**
 * Register blocks
 */
function base_blocks_register_blocks() {
	// Get all block.json files in the build/blocks directory
	$block_folders = glob( plugin_dir_path( __FILE__ ) . 'build/blocks/*', GLOB_ONLYDIR );

	foreach ( $block_folders as $block_folder ) {
		if ( file_exists( $block_folder . '/block.json' ) ) {
			register_block_type( $block_folder );
		}
	}
}
add_action( 'init', 'base_blocks_register_blocks' );