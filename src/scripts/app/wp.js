jQuery( document ).ready( function () {


	// добавление иконок типов файлов

	var alignClasses = [ 'alignleft', 'alignright' ];

	for ( var i = 0; i < alignClasses.length; i++ ) {
		jQuery( 'img.' + alignClasses[i] ).each( function() {
			var $img = jQuery( this ),
					$parent = $img.parent();
			if ( ( $parent.is( 'a' ) ) && ( ! $parent.hasClass( alignClasses[i] ) ) ) $parent.addClass( alignClasses[i] );
		} );
	}


	// открыть ссылку на новой вкладке

	// jQuery( '.content a[target="_blank"]' ).each( function () {
	// 	if ( ( jQuery( this ).find( '.icon-share' ).length == 0 ) && ( jQuery( this ).find( 'img, div, h1, h2, h3, h4, h5, h6' ).length == 0 ) ) {
	// 		jQuery( this ).append( '<i class="icon icon-share"></i>' );
	// 	}
	// } );

} );