import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Info, Lightbulb, Sparkle, AlertTriangle, AlertOctagon } from 'lucide-react';

export default function save({ attributes }) {
	const { noticeType, enableColor } = attributes;
	const blockProps = useBlockProps.save({
		className: `wp-block-base-blocks-notice is-${noticeType}-notice${!enableColor ? ' is-monochrome' : ''}`
	});

	const getIcon = () => {
		switch (noticeType) {
			case 'note':
				return <Info size={20} />;
			case 'tip':
				return <Lightbulb size={20} />;
			case 'important':
				return <Sparkle size={20} />;
			case 'warning':
				return <AlertTriangle size={20} />;
			case 'caution':
				return <AlertOctagon size={20} />;
			default:
				return <Info size={20} />;
		}
	};

	return (
		<div {...blockProps}>
			<div className="notice-header">
				<span className="notice-icon">
					{getIcon()}
				</span>
			</div>
			<div className="notice-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
} 