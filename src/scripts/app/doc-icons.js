/* автодобавление иконок к ссылкам на долкументы */
jQuery( document ).ready( function () {

	var types = [ 'pdf', 'doc', 'xls', 'csv', 'mp3', 'rar', 'zip', 'odt', 'txt', 'psd', 'rtf', 'dwg' ];

	for ( var i = 0; i < types.length; i++ ) {
		jQuery( 'a[href$=\'.' + types[ i ] + '\']' ).each( function () {
			var $link = jQuery( this );
			if ( ( $link.find( '.icon-' + types[ i ] ).length < 1 ) && ( ! $link.hasClass( 'no-doc-icon' ) ) ) $link.prepend( '<i class="icon icon-' + types[ i ] + '"></i> ' );
		} );
	}

} );