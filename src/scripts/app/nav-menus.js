/* Навигационное меню */
jQuery( document ).ready( function () {
	
		var $touch = jQuery( '#burger' ),
			$menu 	= jQuery( '#nav-list' ),
			$submunus = $menu.find( '.sub-menu' );

		jQuery( $touch ).on( 'click', function( e ) {
			e.preventDefault();
			$menu.slideToggle();
		});
		
		jQuery( window ).resize( function() {
			var w = jQuery( window ).width();
			if( w > 767 && $menu.is( ':hidden' ) ) {
				$menu.removeAttr( 'style' );
			}
		});

		$submunus.each( function () {
			jQuery( this ).closest( 'li' ).find( '> a' ).append( '<i class="icon icon-plus"></i>' );
		} );

} );