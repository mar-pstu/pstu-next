jQuery( document ).ready( function () {

  var $aside = jQuery( '#aside-right' ),
      $main = jQuery( '#main-container' ),
      $window = jQuery( window ),
      before = $window.scrollTop();


  if ( $aside.length > 0 ) {
    $window.on( 'resize', resize );
    if ( $aside.width() != $main.width() ) $window.on( 'scroll', floating );
  }


  function unset() {
    $aside.css( {
      position: 'static',
      top: 'auto',
      bottom: 'auto',
      left: 'auto',
      width: 'auto',
    } );
  }


  function resize() {
    if ( $aside.width() == $main.width() ) {
      $windows.off( 'scroll', floating );
      $aside.css( {
        position: 'static',
      } );
    } else {
      $window.on( 'scroll', floating );
    }
  }


  function floating() {
    var current = $window.scrollTop(),
        aside_top = $aside.offset().top,
        main_top = $main.offset().top,
        main_height = $main.height(),
        aside_height = $aside.height();
    if ( aside_height > document.documentElement.clientHeight ) {
      

      if ( current > before ) {
      // движемся вниз
      if ( current + document.documentElement.clientHeight > main_top + aside_height ) {
        if ( current + document.documentElement.clientHeight > main_top + main_height ) {
          $aside.css( {
            position: 'absolute',
            top: main_height - aside_height,
            bottom: 'auto',
            left: $aside.offset().left,
            width: $aside.width()
          } );
        } else {
          $aside.css( {
            position: 'fixed',
            top: 'auto',
            bottom: 0,
            left: $aside.offset().left,
            width: $aside.width()
          } );
        }
      }
    } else {
      // движемся вверх
      if ( main_top + main_height - aside_height > current ) {
        console.log( aside_top );
        if ( main_top > current ) {
          console.log( 'unset' );
          unset();
        } else {
          $aside.css( {
            position: 'fixed',
            top: 0,
            bottom: 'auto',
            left: $aside.offset().left,
            width: $aside.width()
          } );
        }
      }
    }


    } else {
      

      if ( current > main_top ) {
        if ( current + aside_height > main_top + main_height ) {
          $aside.css( {
            position: 'absolute',
            top: main_height - aside_height,
            bottom: 'auto',
            left: $aside.offset().left,
            width: $aside.width(),
          } );
        } else {
          $aside.css( {
            position: 'fixed',
            top: 0,
            bottom: 'auto',
            left: $aside.offset().left,
            width: $aside.width(),
          } );
        }
      } else {
        unset();
      }


    }
    before = current;
    
  }



} );