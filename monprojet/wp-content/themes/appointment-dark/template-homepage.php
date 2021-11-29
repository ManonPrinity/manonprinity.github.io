<?php
// Template Name: Home Page

get_header();
$appointment_dark_news_setting = wp_parse_args(get_option('appointment_options', array()),appointment_theme_setup_data());
?>
<div id="wrap"></div>	
<div class="clearfix"></div>
<?php

do_action('appointment_sections', false);

if ($appointment_dark_news_setting['home_blog_enabled'] == 0) {
    get_template_part('index', 'news');
}

do_action('appointment_dark_sections', false);

get_footer();