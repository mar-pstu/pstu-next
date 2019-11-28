/* автодобавление иконок к ссылкам на долкументы */



jQuery.each( [ 'pdf', 'doc', 'xls', 'zip', 'ppt', 'odt', 'psd' ], function( i, type ) {
	var selector;
	switch( type ) {
		case 'doc':
			selector = 'a[href$=".doc"], a[href$=".docx"], a[href$=".docm"], a[href$=".rtf"]';
			break;
		case 'xls':
			selector = 'a[href$=".xls"], a[href$=".xlsx"], a[href$=".ods"], a[href$=".csv"], a[href$=".xlsm"]';
			break;
		case 'zip':
			selector = 'a[href$=".zip"], a[href$=".rar"], a[href$=".7z"]';
			break;
		case 'ppt':
			selector = 'a[href$=".ppt"], a[href$=".pptx"], a[href$=".odp"], a[href$=".pptm"]';
			break;
		default:
			selector = 'a[href$=".' + type + '"]';
			break;
	}
	jQuery( selector ).each( function ( index, element ) {
		var $link = jQuery( element );
		if (
			$link.find( '.file, .file-' + type ).length < 1 &&
			! $link.hasClass( 'no-file-icon' ) &&
			! $link.hasClass( 'button' ) &&
			! $link.hasClass( 'btn' ) &&
			! $link.hasClass( 'wp-block-file__button' ) &&
			$link.children( 'img' ).length < 1
		) {
			$link.prepend( jQuery( '<span>', {
				class: 'file file-' + type
			} ) );
		}
	} );
} );