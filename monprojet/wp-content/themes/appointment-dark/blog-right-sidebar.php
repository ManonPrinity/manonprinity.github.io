<?php
/**
  Template Name: Blog-right-sidebar
 */
get_header();
get_template_part('index', 'banner');
?>
<!-- Blog Section with Sidebar -->
<div class="page-builder" id="wrap">
    <div class="container">
        <div class="row">
            <!-- Blog Area -->
            <div class="<?php appointment_post_layout_class(); ?>" >
                <?php
                $appointment_dark_pagedno = (get_query_var('paged')) ? get_query_var('paged') : 1;
                $appointment_dark_args = array('post_type' => 'post', 'paged' => $appointment_dark_pagedno);
                $appointment_dark_post_type_data = new WP_Query($appointment_dark_args);
                while ($appointment_dark_post_type_data->have_posts()) {
                    $appointment_dark_post_type_data->the_post();
                    get_template_part('content', '');
                }
                wp_reset_postdata();
                $GLOBALS['wp_query']->max_num_pages = $appointment_dark_post_type_data->max_num_pages;
                the_posts_pagination(array(
                    'prev_text' => '<i class="fa fa-angle-double-left"></i>',
                    'next_text' => '<i class="fa fa-angle-double-right"></i>',
                ));
                ?>
            </div>
            <!-- /Blog Area -->
            <?php if(is_active_sidebar('sidebar-1')){?>			
            <!--Sidebar Area-->
            <div class="col-md-4">
                <?php get_sidebar(); ?>
            </div>
            <?php } ?>
            <!--Sidebar Area-->
        </div>
    </div>
</div>
<!-- /Blog Section with Sidebar -->
<?php get_footer(); ?>