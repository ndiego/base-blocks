import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import './style.scss';
import { LightIcon, SystemIcon, DarkIcon } from './icons';


registerBlockType( 'base/dark-mode-toggle', {
    edit: function() {
        const blockProps = useBlockProps({
            role: 'radiogroup'
        });
        
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
                    <LightIcon />
                </button>
                <button 
                    aria-checked="false"
                    aria-label={ __( 'Switch to system theme', 'base-blocks' ) }
                    data-active="false"
                    data-theme-switcher="true"
                    role="radio"
                    type="button"
                >
                    <SystemIcon />
                </button>
                <button 
                    aria-checked="false"
                    aria-label={ __( 'Switch to dark theme', 'base-blocks' ) }
                    data-active="false"
                    data-theme-switcher="true"
                    role="radio"
                    type="button"
                >
                    <DarkIcon />
                </button>
            </div>
        );
    }
} ); 