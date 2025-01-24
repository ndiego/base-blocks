/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { styles } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';
import Edit from './edit';

registerBlockType( 'base/dark-mode-toggle', {
    icon: styles,
    edit: Edit
} ); 