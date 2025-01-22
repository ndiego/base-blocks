import { registerBlockType } from '@wordpress/blocks';
import { info } from '@wordpress/icons';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
	...metadata,
	icon: info,
	edit: Edit,
	save,
}); 