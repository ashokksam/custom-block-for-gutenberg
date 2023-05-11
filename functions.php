<?php

// Load assets for wp-admin when editor is active
function shaiful_gutenberg_notice_block_admin()
{
    wp_enqueue_script(
        'gutenberg-notice-block-editor',
        plugins_url('block.js', __FILE__),
        array('wp-blocks', 'wp-element')
    );
}

add_action('enqueue_block_editor_assets', 'shaiful_gutenberg_notice_block_admin');


function avlabs_custom_gutenberg_settings()
{
    add_theme_support(
        'editor-color-palette',
        array(
            array(
                'name' => 'White',
                'slug' => 'white',
                'color' => '#fffff'
            ),
            array(
                'name' => 'Black',
                'slug' => 'black',
                'color' => '#000000'
            )
        )
    );

    add_theme_support(
        'editor-font-sizes',
        array(
            array(
                'name' => 'Normal',
                'slug' => 'normal',
                'size' => 16
            ),
            array(
                'name' => 'Large',
                'slug' => 'large',
                'size' => 24
            )
        )
    );
}

add_action('init', 'avlabs_custom_gutenberg_settings');

function avlabs_gutenberg_block()
{
    wp_register_script(
        'avlabs-custom-block-js',
        plugins_url('custom-block.js', __FILE__),
        array('wp-blocks', 'wp-editor', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n')
    );

    register_block_type(
        'avlabs/avlabs-custom-block',
        array(
            'editor_script'     => 'avlabs-custom-block-js',
            'editor_style'      => '',
            'style'             => '',
        )
    );

    wp_register_style(
        'my-custom-block-stylesheet',
        plugins_url('font-awesome.min.css', __FILE__)
    );
}

add_action('init', 'avlabs_gutenberg_block');