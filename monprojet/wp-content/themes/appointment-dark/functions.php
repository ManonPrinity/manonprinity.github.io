<?php
// Global variables define
define('APPOINTMENT_DARK_PARENT_TEMPLATE_DIR_URI', get_template_directory_uri());
define('APPOINTMENT_DARK_TEMPLATE_DIR_URI', get_stylesheet_directory_uri());
define('APPOINTMENT_DARK_TEMPLATE_DIR', trailingslashit(get_stylesheet_directory()));

if (!function_exists('wp_body_open')) {

    function wp_body_open() {
        /**
         * Triggered after the opening <body> tag.
         */
        do_action('wp_body_open');
    }

}
add_action('wp_enqueue_scripts', 'appointment_dark_theme_css', 999);

function appointment_dark_theme_css() {

    $appointment_dark_options = theme_setup_data();
    $current_options = wp_parse_args(  get_option( 'appointment_options', array() ), $appointment_dark_options );

    wp_enqueue_style('appointment-dark-parent-style', APPOINTMENT_DARK_PARENT_TEMPLATE_DIR_URI . '/style.css');
    wp_enqueue_style('bootstrap-style', APPOINTMENT_DARK_PARENT_TEMPLATE_DIR_URI . '/css/bootstrap.css');
    wp_enqueue_style('appointment-dark-theme-menu', APPOINTMENT_DARK_PARENT_TEMPLATE_DIR_URI . '/css/theme-menu.css');
    if($current_options['link_color_enable'] == true) {
        appointment_custom_light();
    }
    else {
        wp_enqueue_style('appointment-dark-default-css', APPOINTMENT_DARK_TEMPLATE_DIR_URI . "/css/default.css");
    }
    wp_enqueue_style('appointment-dark-element-style', APPOINTMENT_DARK_PARENT_TEMPLATE_DIR_URI . '/css/element.css');
    wp_enqueue_style('appointment-dark-media-responsive', APPOINTMENT_DARK_PARENT_TEMPLATE_DIR_URI . '/css/media-responsive.css');
    wp_dequeue_style('appointment-default', APPOINTMENT_DARK_PARENT_TEMPLATE_DIR_URI . '/css/default.css');

}

/*
 * Let WordPress manage the document title.
 */

function appointment_dark_setup() {
    add_theme_support('title-tag');
    add_theme_support('automatic-feed-links');
    require( APPOINTMENT_DARK_TEMPLATE_DIR . '/functions/customizer/customizer-copyright.php');
    load_theme_textdomain('appointment-dark', APPOINTMENT_DARK_TEMPLATE_DIR . '/languages');

    //About Theme
    $theme = wp_get_theme(); // gets the current theme
    if ('Appointment Dark' == $theme->name) {
        if (is_admin()) {
            require APPOINTMENT_DARK_TEMPLATE_DIR . '/admin/admin-init.php';
        }
    }
}

add_action('after_setup_theme', 'appointment_dark_setup');

function appointment_dark_default_data() {

    return $theme_data = array(
        // general settings
        'footer_menu_bar_enabled' => '',
        'footer_social_media_enabled' => '',
        'footer_social_media_facebook_link' => '',
        'footer_facebook_media_enabled' => 1,
        'footer_social_media_twitter_link' => '',
        'footer_twitter_media_enabled' => 1,
        'footer_social_media_linkedin_link' => '',
        'footer_linkedin_media_enabled' => 1,
        'footer_social_media_googleplus_link' => '',
        'footer_googleplus_media_enabled' => 1,
        'footer_social_media_skype_link' => '',
        'footer_skype_media_enabled' => 1,

        //Home contact callout setting
        'front_callout_enable'=> false,
        'front_contact_title' => 'Sed ut perspiciatis unde',
        'front_contact1_title'=> 'Non proident, sunt in culpa ',
        'front_contact1_val'=> esc_html__('+99 999 99 999','appointment-dark'),
        'contact_one_icon' => esc_html__('fa fa-phone','appointment-dark'),

        'front_contact2_title'=> ' Neque porro quisquam',
        'front_contact2_val'=> 'Ullamco laboris nisi',
        'contact_two_icon' => esc_html__('fa fa-clock-o','appointment-dark'),


        'front_contact3_title'=> 'Ipsum quia dolor sit amet',
        'front_contact3_val'=>esc_html__('abc@example.com','appointment-dark'),
        'contact_three_icon' =>esc_html__('fa fa-envelope','appointment-dark'),


    );
}

add_action('customize_register', 'appointment_dark_remove_custom', 1000);
function appointment_dark_remove_custom($wp_customize) {
    $wp_customize->remove_section('copyright_section_one');
}
