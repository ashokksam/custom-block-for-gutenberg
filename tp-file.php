<?php

global $wp_version;


if (version_compare($wp_version, "2.9", "<"))
    exit('This plugin requires WordPress 2.9 or newer. <a href="http://codex.wordpress.org/Upgrading_WordPress">Please update!</a>');

// Add callback to admin menu
add_action('admin_menu', 'create_tp_menu');

// Callback to add menu items
function create_tp_menu()
{
    add_management_page('TP Test', 'TP Test', 'manage_options', 'tp-teste', 'wp_tp_test_fnc');
}

function wp_tp_test_fnc()
{



    if (!empty($_POST['tp_name'])) {
        $tp_name = $_POST['tp_name'];

        global $user_ID;
        $new_post = array(
            'post_title' => $tp_name,
            'post_content' => 'Some text',
            'post_status' => 'publish',
            'post_date' => date('Y-m-d H:i:s'),
            'post_author' => $user_ID,
            'post_type' => 'page',
        );
        $post_id = wp_insert_post($new_post);

        if (!$post_id) {
            wp_die('Error creating template page');
        } else {
            update_post_meta($post_id, '_wp_page_template', 'tp-file.php');
        }
    }
?>
    <fieldset style="margin: 50px 100px;background-color: #cccccc;padding: 30px;border: 1px solid #ccc">
        <legend style="background-color: #ccccff;padding: 20px;font-weight: bold;font-size: 18px">Create Template Page</legend>
        <form name="frm_main" action="" method="POSt">
            <input class="text" type="text" name="tp_name" size="50" />
            <br />
            <input class="button" type="submit" value="Create Template Page" name="btn_submit" />
        </form>
    </fieldset>
<?php

}


// Filter page template
add_filter('page_template', 'catch_plugin_template');

// Page template filter callback
function catch_plugin_template($template)
{
    // If tp-file.php is the set template
    if (is_page_template('tp-file.php')) {
        // Update path(must be path, use WP_PLUGIN_DIR and not WP_PLUGIN_URL) 
        $template = WP_PLUGIN_DIR . '/myplugin/tp-file.php';
        echo $template;
    }
    // Return
    return $template;
}
