<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'monprojet' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Qs 8Y.k#?o|q<[hSl{~sI[m^0s[]b.skxCQ5PMq|<-[BQeNzu7`m&pa*8sg*lmsz' );
define( 'SECURE_AUTH_KEY',  '% hjb5Ibg//_>>BVb.uEiz19G{XKeH`ZRwzknr|/0Z AA?0})=[e3(8&Y]J|cbM{' );
define( 'LOGGED_IN_KEY',    'vDqlDMHUk@bb$ttl8HN#Bxp_tFu)=riUD}Z+?(}F$$p=RLC=mK<&VByA|a=TW{i5' );
define( 'NONCE_KEY',        'hIkn9i+I]jV;e~Rl4[tfkx#UD*EYybBB(F!dAe$@K@<tSaA%fpz9v6a)tAf~xYP.' );
define( 'AUTH_SALT',        ')DybwAG|!e=`RWv!U0ktodNxPe5NFb(l_sIM1@ABfN</auh!H!:`q/h2g_j1[:RA' );
define( 'SECURE_AUTH_SALT', '0L3C_-c=`]U!oyD]3aX6lw>j-s&BJV,+EiPQ:7<;Eaj@wx4^v~ ]N<(#`ekr7 /G' );
define( 'LOGGED_IN_SALT',   '!Fy$/@KFmqLzYTe@.V[4c q>iZIs,$e{5[W|w?SiV+y5hzZz`WPc&0nbe+v(t0]J' );
define( 'NONCE_SALT',       'G=C8$1sUh<%XfOtdnTW+B9pRVqevv5aevn&-ZCf<vfQ5)%_(xFVAe`/?o6>%+3ma' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
