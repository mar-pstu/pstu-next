jQuery( document ).ready( function () {
  if ( typeof pstuNextThemeAjaxPagination !== "undefined" ) {
    var $container = jQuery( '#entries-container' ),
        $button = jQuery( '<button>', {
          class: 'loadmore btn btn-link',
          id: 'loadmore',
          text: pstuNextThemeTranslate.loadMore,
          click: LoadEntries,
        } ).appendTo( '#pagination-ajax' ),
        $icon = jQuery( '<div>', {
            class: 'loadingicon',
            id: 'loadingicon'
        } );
    function LoadEntries() {
        var data = {
            'action': 'pstu_pagination',
            'part': pstuNextThemeAjaxPagination.part,
            'query': pstuNextThemeAjaxPagination.query_vars,
            'page' : pstuNextThemeAjaxPagination.paged,
        };
        jQuery.ajax( {
          url: pstuNextThemeAjaxPagination.ajaxurl,
          data: data,
          type:'POST',
          beforeSend: function ( xhr ) {
              $button.text( pstuNextThemeTranslate.loading );
              $container.append( $icon );
              $button.unbind( 'click' );
          },
          success: function( data ) {
            $icon.detach();
            $button.text( pstuNextThemeTranslate.loadMore );
            $button.on( 'click', LoadEntries );
            if( data ) {
                $button.text( pstuNextThemeTranslate.loadMore );
                $container.append( data );
                pstuNextThemeAjaxPagination.paged++;
                $container.find( '[data-src]' ).lazy();
                if ( pstuNextThemeAjaxPagination.paged == pstuNextThemeAjaxPagination.max_num_pages ) {
                    $button.remove();
                }
            } else {
                $button.remove();
            }
          }
      } );
    }
  }
} );