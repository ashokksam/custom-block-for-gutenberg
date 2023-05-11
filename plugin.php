<?php
/*
  Plugin Name: Custom Block
  Plugin URI: https://ashokkumawat.com
  Description:  Custom Block
  Version: 1.0.0
  Author: Ashok Kumawat
  Author URI: 
*/

include('tp-file.php');
include('functions.php');


function loadMyBlockFiles()
{
  wp_enqueue_script('my-super-scripts', plugin_dir_url(__FILE__) . 'my-block.js', array('wp-blocks', 'wp-i18n', 'wp-editor'), true);
}

add_action('enqueue_block_editor_assets', 'loadMyBlockFiles');



function myform_styles_js()
{
  wp_register_script('my-form.js', plugin_dir_url(__FILE__) . 'myform.js', array(), false);
  wp_register_style('my-custom-form-css', plugin_dir_url(__FILE__) . 'form-style.css', array());
}
add_action('init', 'myform_styles_js');
