<?php
/**
 * Getting started template
 */
?>
<div id="getting_started" class="appointment-dark-tab-pane active">
	<div class="container-fluid">
		<div class="row">
		    <div class="col-md-12">
				<h1 class="appointment-dark-info-title text-center"><?php echo esc_html__('About the Appointment Dark theme','appointment-dark'); ?></h1>
		    </div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<div class="appointment-dark-tab-pane-half appointment-dark-tab-pane-first-half">
					<div>
						<p style="margin-top: 16px;">
							<?php esc_html_e( 'This theme is ideal for creating corporate and business websites. There is no separate premium version of it, as Appointment Dark is a child theme of the Appointment WordPress theme. The premium version, Appointment PRO has tons of features: a homepage with many sections where you can feature unlimited services, portfolios, user reviews, latest news, callout, custom widgets and much more.', 'appointment-dark' ); ?>
						</p>
					</div>
				</div>
				<div class="appointment-dark-tab-pane-half appointment-dark-tab-pane-first-half">
					<h3><?php esc_html_e( "Recommended Plugins", 'appointment-dark' ); ?></h3>
					<div style="border-top: 1px solid #eaeaea;">
						<p style="margin-top: 16px;">
							<?php esc_html_e( "To take full advantage of the theme's features you need to install recommended plugins.", 'appointment-dark' ); ?>
						</p>
						<p><a target="_self" href="#recommended_actions" class="appointment-dark-custom-class"><?php esc_html_e( 'Click here','appointment-dark');?></a></p>
					</div>
				</div>
				<div class="appointment-dark-tab-pane-half appointment-dark-tab-pane-first-half">
					<h3><?php esc_html_e( "Start Customizing", 'appointment-dark' ); ?></h3>
					<div style="border-top: 1px solid #eaeaea;">
						<p style="margin-top: 16px;">
							<?php esc_html_e( 'After activating recommended plugins , now you can start customization.', 'appointment-dark' ); ?>

						</p>
						<p><a target="_blank" href="<?php echo esc_url( admin_url( 'customize.php' ) ); ?>" class="button button-primary"><?php esc_html_e( 'Go to Customizer','appointment-dark');?></a></p>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="appointment-dark-tab-pane-half appointment-dark-tab-pane-first-half">
				<img src="<?php echo esc_url( APPOINTMENT_DARK_TEMPLATE_DIR_URI ) . '/admin/img/appointment-dark.png'; ?>" alt="<?php esc_attr_e( 'appointment-dark Theme', 'appointment-dark' ); ?>" />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="appointment-dark-tab-center">
				<h3><?php esc_html_e( "Useful Links", 'appointment-dark' ); ?></h3>
			</div>
			<div class=" useful_box">
                <div class="appointment-dark-tab-pane-half appointment-dark-tab-pane-first-half">
                    <a href="<?php echo esc_url('https://appointment-dark.webriti.com/'); ?>" target="_blank"  class="info-block">
                    	<div class="dashicons dashicons-desktop info-icon"></div>
                    	<p class="info-text"><?php echo esc_html__('Lite Demo','appointment-dark'); ?></p>
                	</a>
                    <a href="<?php echo esc_url('https://demo.webriti.com/?theme=Appointment%20Pro'); ?>" target="_blank"  class="info-block">
                    	<div class="dashicons dashicons-desktop info-icon"></div>
                    	<p class="info-text"><?php echo esc_html__('PRO Demo','appointment-dark'); ?></p>
                    </a>
                </div>
                <div class="appointment-dark-tab-pane-half appointment-dark-tab-pane-first-half">
                    <a href="<?php echo esc_url('https://wordpress.org/support/view/theme-reviews/appointment-dark'); ?>" target="_blank"  class="info-block">
                    	<div class="dashicons dashicons-smiley info-icon"></div>
                    	<p class="info-text"><?php echo esc_html__('Your feedback is valuable to us','appointment-dark'); ?></p>
                    </a>
                    <a href="<?php echo esc_url('https://webriti.com/appointment/'); ?>" target="_blank"  class="info-block">
                    	<div class="dashicons dashicons-book-alt info-icon"></div>
                    	<p class="info-text"><?php echo esc_html__('Premium Theme Details','appointment-dark'); ?></p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>