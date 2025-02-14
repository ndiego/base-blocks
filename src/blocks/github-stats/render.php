<?php
/**
 * Render the GitHub stats block.
 *
 * @package base-blocks
 */

$wrapper_attributes = get_block_wrapper_attributes();

if ( empty( $attributes['repository'] ) ) {
    return sprintf(
        '<div %s><p>%s</p></div>',
        $wrapper_attributes,
        esc_html__( 'Please specify a GitHub repository.', 'base-blocks' )
    );
}

// Check for cached data first
$transient_key = 'base_github_stats_' . sanitize_key( $attributes['repository'] );
$cached_data = get_transient( $transient_key );

if ( false === $cached_data ) {
    // No cache found, fetch from API
    $api_url = 'https://api.github.com/repos/' . esc_attr( $attributes['repository'] );
    $response = wp_remote_get( $api_url, array(
        'headers' => array(
            'Accept' => 'application/vnd.github.v3+json',
            'User-Agent' => 'WordPress/' . get_bloginfo( 'version' ),
        ),
    ) );

    if ( is_wp_error( $response ) ) {
        return sprintf(
            '<div %s><p>%s</p></div>',
            $wrapper_attributes,
            esc_html__( 'Error fetching repository data.', 'base-blocks' )
        );
    }

    $body = wp_remote_retrieve_body( $response );
    $data = json_decode( $body );

    if ( ! $data || isset( $data->message ) ) {
        return sprintf(
            '<div %s><p>%s</p></div>',
            $wrapper_attributes,
            esc_html__( 'Repository not found or API error.', 'base-blocks' )
        );
    }

    // Cache the data for 24 hours
    set_transient( $transient_key, $data, DAY_IN_SECONDS );
} else {
    $data = $cached_data;
}
?>
<div <?php echo $wrapper_attributes; ?>>
    <?php if ( ! empty( $attributes['showStars'] ) ) : ?>
        <div class="github-stat stars">
            <span class="stat-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M11.776 4.454a.25.25 0 01.448 0l2.069 4.192a.25.25 0 00.188.137l4.626.672a.25.25 0 01.139.426l-3.348 3.263a.25.25 0 00-.072.222l.79 4.607a.25.25 0 01-.362.263l-4.138-2.175a.25.25 0 00-.232 0l-4.138 2.175a.25.25 0 01-.363-.263l.79-4.607a.25.25 0 00-.071-.222L4.754 9.881a.25.25 0 01.139-.426l4.626-.672a.25.25 0 00.188-.137l2.069-4.192z"></path></svg></span>
            <span class="stat-count"><?php echo number_format_i18n( $data->stargazers_count ); ?></span>
        </div>
    <?php endif; ?>

    <?php if ( ! empty( $attributes['showForks'] ) ) : ?>
        <div class="github-stat forks">
            <span class="stat-icon">
                <svg height="24" viewBox="0 0 16 16" version="1.1" width="16">
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
                </svg>
            </span>
            <span class="stat-count"><?php echo number_format_i18n( $data->forks_count ); ?></span>
        </div>
    <?php endif; ?>
</div> 