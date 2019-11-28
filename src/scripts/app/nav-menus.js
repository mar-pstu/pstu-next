/* Навигационное меню */
jQuery( document ).ready( function () {

	jQuery( 'body' ).on( 'click', '.burger-button', function() {
		jQuery( 'body' ).toggleClass( 'mobilenav-active' );
	} )

	jQuery( '#header-nav-list' ).clone()
		.attr( 'class', 'mobile-menu lead' ).attr( 'id', 'mobile-menu-main' )
		.appendTo( '#mobile-nav-first-menu-container' )
		.find( 'ul ul' ).remove().end()
		.find( 'li' ).removeAttr( 'id' ).end()
		.find( 'a[href=""], a:not([href])' ).closest( 'li' ).remove();

	jQuery( '#top-nav-list' ).clone()
		.attr( 'class', 'mobile-menu lead' ).attr( 'id', 'mobile-menu-second' )
		.appendTo( '#mobile-nav-second-menu-container' )
		.find( 'ul ul' ).remove().end()
		.find( 'li' ).removeAttr( 'id' ).end()
		.find( 'a[href=""], a:not([href])' ).closest( 'li' ).remove();

} );