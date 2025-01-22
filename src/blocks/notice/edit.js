import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { Info, Lightbulb, Sparkle, AlertTriangle, AlertOctagon } from 'lucide-react';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { noticeType, enableColor } = attributes;
	const blockProps = useBlockProps({
		className: `wp-block-base-blocks-notice is-${noticeType}-notice${!enableColor ? ' is-monochrome' : ''}`
	});

	const NOTICE_OPTIONS = [
		{ label: __('Note', 'base-blocks'), value: 'note', icon: <Info size={20} /> },
		{ label: __('Tip', 'base-blocks'), value: 'tip', icon: <Lightbulb size={20} /> },
		{ label: __('Important', 'base-blocks'), value: 'important', icon: <Sparkle size={20} /> },
		{ label: __('Warning', 'base-blocks'), value: 'warning', icon: <AlertTriangle size={20} /> },
		{ label: __('Caution', 'base-blocks'), value: 'caution', icon: <AlertOctagon size={20} /> }
	];

	const currentNotice = NOTICE_OPTIONS.find(option => option.value === noticeType);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Notice Settings', 'base-blocks')}>
					<SelectControl
						label={__('Notice Type', 'base-blocks')}
						value={noticeType}
						options={NOTICE_OPTIONS}
						onChange={(value) => setAttributes({ noticeType: value })}
					/>
					<ToggleControl
						label={__('Enable Color', 'base-blocks')}
						checked={enableColor}
						onChange={() => setAttributes({ enableColor: !enableColor })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="notice-header">
					<span className="notice-icon">
						{currentNotice.icon}
					</span>
				</div>
				<div className="notice-content">
					<InnerBlocks />
				</div>
			</div>
		</>
	);
} 