<!DOCTYPE html>
<html <?php language_attributes(); ?> >
    <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php if ( is_singular() && pings_open( get_queried_object() ) ) :
           echo '<link rel="pingback" href=" '.esc_url(get_bloginfo( 'pingback_url' )).' ">';
        endif; ?>
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?> >
        <?php wp_body_open(); ?>
        <a class="skip-link screen-reader-text" href="#wrap"><?php esc_html_e('Skip to content', 'appointment-dark'); ?></a>
        <!--Logo & Menu Section-->
        <nav class="navbar navbar2 navbar-default navbar2">
            <div class="container">
             <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <?php the_custom_logo();?>
                    <div class="site-branding-text logo-link-url">
                        <h2 class="site-title"><a class="site-title-name" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" ><?php bloginfo( 'name' ); ?></a>
                        </h2>                        
                        <?php
                        $appointment_dark_description = get_bloginfo('description', 'display');
                        if ($appointment_dark_description || is_customize_preview()) :
                            ?>
                            <p class="site-description"><?php echo $appointment_dark_description; ?></p>
                        <?php endif; ?>
                    </div>
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only"><?php esc_html_e('Toggle navigation', 'appointment-dark'); ?></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <?php
                $appointment_dark_header_settings = wp_parse_args(get_option('appointment_options', array()), appointment_theme_setup_data());
                $appointment_dark_facebook = $appointment_dark_header_settings['social_media_facebook_link'];
                $appointment_dark_twitter = $appointment_dark_header_settings['social_media_twitter_link'];
                $appointment_dark_linkdin = $appointment_dark_header_settings['social_media_linkedin_link'];

                    $appointment_dark_social = '<ul id="%1$s" class="%2$s">%3$s';
                    if ($appointment_dark_header_settings['header_social_media_enabled'] == 0) {

                        if($appointment_dark_facebook !='' || $appointment_dark_twitter !='' || $appointment_dark_linkdin !=''){
                        $appointment_dark_social .= '<ul class="head-contact-social">';

                        if ($appointment_dark_header_settings['social_media_facebook_link'] != '') {
                            $appointment_dark_social .= '<li class="facebook"><a href="' . esc_url($appointment_dark_facebook) . '"';
                            if ($appointment_dark_header_settings['facebook_media_enabled'] == 1) {
                                $appointment_dark_social .= 'target="_blank"';
                            }
                            $appointment_dark_social .= '><i class="fa fa-facebook"></i></a></li>';
                        }
                        if ($appointment_dark_header_settings['social_media_twitter_link'] != '') {
                            $appointment_dark_social .= '<li class="twitter"><a href="' . esc_url($appointment_dark_twitter) . '"';
                            if ($appointment_dark_header_settings['twitter_media_enabled'] == 1) {
                                $appointment_dark_social .= 'target="_blank"';
                            }
                            $appointment_dark_social .= '><i class="fa fa-twitter"></i></a></li>';
                        }
                        if ($appointment_dark_header_settings['social_media_linkedin_link'] != '') {
                            $appointment_dark_social .= '<li class="linkedin"><a href="' . esc_url($appointment_dark_linkdin) . '"';
                            if ($appointment_dark_header_settings['linkedin_media_enabled'] == 1) {
                                $appointment_dark_social .= 'target="_blank"';
                            }
                            $appointment_dark_social .= '><i class="fa fa-linkedin"></i></a></li>';
                        }
                        $appointment_dark_social .= '</ul>';
                    }
                }
                    $appointment_dark_social .= '</ul>';

                ?>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'container' => '',
                        'menu_class' => 'nav navbar-nav navbar-right',
                        'fallback_cb' => 'appointment_fallback_page_menu',
                        'items_wrap' => $appointment_dark_social,
                        'walker' => new appointment_nav_walker()
                    ));
                    ?>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
        <!--/Logo & Menu Section-->
        <div class="clearfix"></div>
