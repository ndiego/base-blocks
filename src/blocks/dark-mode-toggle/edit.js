/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { Light, System, Dark, Sun, Moon, Monitor } from './icons';

export default function Edit( { attributes } ) {
	const { className } = attributes;
	const blockProps = useBlockProps( {
		role: 'radiogroup',
	} );
	const isSunMoonStyle = className?.includes( 'is-style-sun-moon' );

	return (
		<div { ...blockProps }>
			<button
				aria-checked="true"
				aria-label={ __( 'Switch to light theme', 'base-blocks' ) }
				data-active="true"
				data-theme-switcher="true"
				role="radio"
				type="button"
			>
				{ isSunMoonStyle ? <Sun /> : <Light /> }
			</button>
			<button
				aria-checked="false"
				aria-label={ __( 'Switch to system theme', 'base-blocks' ) }
				data-active="false"
				data-theme-switcher="true"
				role="radio"
				type="button"
			>
				{ isSunMoonStyle ? <Monitor /> : <System /> }
			</button>
			<button
				aria-checked="false"
				aria-label={ __( 'Switch to dark theme', 'base-blocks' ) }
				data-active="false"
				data-theme-switcher="true"
				role="radio"
				type="button"
			>
				{ isSunMoonStyle ? <Moon /> : <Dark /> }
			</button>
		</div>
	);
}
