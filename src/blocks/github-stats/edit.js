/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Spinner,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { starFilled, Icon } from '@wordpress/icons';

export default function Edit( { attributes, setAttributes } ) {
	const { repository, showStars, showForks } = attributes;
	const blockProps = useBlockProps();
	const [ stats, setStats ] = useState( null );
	const [ isLoading, setIsLoading ] = useState( false );
	const [ error, setError ] = useState( null );

	useEffect( () => {
		if ( ! repository ) {
			setStats( null );
			setError( null );
			return;
		}

		setIsLoading( true );
		setError( null );

		fetch( `https://api.github.com/repos/${ repository }` )
			.then( ( response ) => response.json() )
			.then( ( data ) => {
				if ( data.message ) {
					throw new Error( data.message );
				}
				setStats( data );
				setError( null );
			} )
			.catch( ( err ) => {
				setError( err.message );
				setStats( null );
			} )
			.finally( () => {
				setIsLoading( false );
			} );
	}, [ repository ] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'base-blocks' ) }>
					<TextControl
						label={ __( 'Repository', 'base-blocks' ) }
						value={ repository }
						onChange={ ( value ) =>
							setAttributes( { repository: value } )
						}
						placeholder="wordpress/wordpress"
						help={ __(
							'Enter the repository in the format owner/repo.',
							'base-blocks'
						) }
					/>
					<ToggleControl
						label={ __( 'Show stars count', 'base-blocks' ) }
						checked={ showStars }
						onChange={ () =>
							setAttributes( { showStars: ! showStars } )
						}
					/>
					<ToggleControl
						label={ __( 'Show fork count', 'base-blocks' ) }
						checked={ showForks }
						onChange={ () =>
							setAttributes( { showForks: ! showForks } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ ! repository && (
					<p>
						{ __(
							'Please enter a GitHub repository in the block settings.',
							'base-blocks'
						) }
					</p>
				) }
				{ isLoading && (
					<div className="github-stats-loading">
						<Spinner />
						<span>
							{ __( 'Loading repository data...', 'base-blocks' ) }
						</span>
					</div>
				) }
				{ error && (
					<p className="github-stats-error">
						{ __( 'Error:', 'base-blocks' ) } { error }
					</p>
				) }
				{ stats && ! isLoading && (
					<>
						{ showStars && (
							<div className="github-stat stars">
								<span className="stat-icon">
									<Icon icon={ starFilled } />
								</span>
                                <span className="stat-count">
									{ new Intl.NumberFormat().format(
										stats.stargazers_count
									) }
								</span>
							</div>
						) }
						{ showForks && (
							<div className="github-stat forks">
								<span className="stat-icon">
									<svg
										aria-label="fork"
										role="img"
										height="24"
										viewBox="0 0 16 16"
										version="1.1"
										width="16"
									>
										<path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
									</svg>
								</span>
								<span className="stat-count">
									{ new Intl.NumberFormat().format(
										stats.forks_count
									) }
								</span>
							</div>
						) }
					</>
				) }
			</div>
		</>
	);
}