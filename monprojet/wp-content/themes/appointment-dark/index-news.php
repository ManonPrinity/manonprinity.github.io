<?php
$appointment_dark_options = appointment_theme_setup_data();
$appointment_dark_news_setting = wp_parse_args(get_option('appointment_options', array()), $appointment_dark_options);
if ($appointment_dark_news_setting['home_blog_enabled'] == 0) {  ?>
    <div class="blog-section">
        <div class="container">

            <!-- Section Title -->
            <div class="row">
                <div class="col-md-12">
                    <div class="section-heading-title">
                        <?php if ($appointment_dark_news_setting['blog_heading'] != '') { ?>
                            <h2><?php echo esc_html($appointment_dark_news_setting['blog_heading']); ?></h2>
                        <?php }
                        if ($appointment_dark_news_setting['blog_description'] != '') {
                        ?>
                            <p><?php echo esc_html($appointment_dark_news_setting['blog_description']); ?></p>
                        <?php } ?>
                    </div>
                </div>
            </div>
            <!-- /Section Title -->

            <div class="row">
                <?php
                $appointment_dark_category_id = array();

                if (!is_array($appointment_dark_news_setting['blog_selected_category_id'])) {
                    $appointment_dark_category_id = explode(',', $appointment_dark_news_setting['blog_selected_category_id']);
                } else {
                    $appointment_dark_category_id = $appointment_dark_news_setting['blog_selected_category_id'];
                }

                $appointment_dark_no_of_post = $appointment_dark_news_setting['post_display_count'];

                $appointment_dark_args = array('post_type' => 'post', 'ignore_sticky_posts' => 1, 'category__in' => $appointment_dark_category_id, 'posts_per_page' => $appointment_dark_no_of_post);
                $appointment_dark_news_query = new WP_Query($appointment_dark_args);


                $appointment_dark_i = 1;
                while ($appointment_dark_news_query->have_posts()) :
                    $appointment_dark_news_query->the_post(); ?>
                    <div class="col-md-12">
                        <div class="blog-sm-area">
                            <div class="media">
                                <?php $appointment_dark_defalt_arg = array('class' => "img-responsive");
                                if (has_post_thumbnail()):?>
                                    <div class="blog-sm-box">
                                    <?php the_post_thumbnail('', $appointment_dark_defalt_arg);?>
                                    </div>
                                <?php endif; ?>
                                <div class="media-body">
                                    <?php
                                    $appointment_dark_options = appointment_theme_setup_data();
                                    $appointment_dark_news_setting = wp_parse_args(get_option('appointment_options', array()), $appointment_dark_options);
                                    if ($appointment_dark_news_setting['home_meta_section_settings'] == '') {
                                        ?>
                                        <div class="blog-post-sm">
                                            <?php esc_html_e('By', 'appointment-dark'); ?>
                                            <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>"><?php echo esc_html(get_the_author()); ?></a>

                                            <?php esc_html_e('Posted', 'appointment-dark'); ?>
                                            <a href="<?php echo esc_url(get_month_link(get_post_time('Y'), get_post_time('m'))); ?>">
                                                <?php echo esc_html(get_the_date()); ?></a>

                                            <?php
                                            $appointment_dark_tag_list = get_the_tag_list();
                                            if (!empty($appointment_dark_tag_list)):?>
                                                <div class="blog-tags-sm">
                                                    <?php esc_html_e('In', 'appointment-dark'); the_tags('', ', ', ''); ?>
                                                </div>
                                            <?php endif;?>
                                        </div>
                                    <?php } ?>
                                    <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                                    <p><?php echo wp_kses_post(appointment_get_home_blog_excerpt()); ?></p>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php
                if ($appointment_dark_i == 2) {
                    echo '<div class="clearfix"></div>';
                    $appointment_dark_i = 0;
                }
                $appointment_dark_i++;
                endwhile;
                wp_reset_postdata();
                ?>
            </div>
        </div>
        <?php } ?>
    </div>
    <div class="clearfix"></div>
