$( function() {

  var $container = $('#container').masonry({
    itemSelector: '.item',
    columnWidth: 200
  });

  $('#load-images').click( function() {
    var $items = getItems();
    $container.masonryImagesReveal( $items );
  });
  
});

$.fn.masonryImagesReveal = function( $items ) {
  var msnry = this.data('masonry');
  var itemSelector = msnry.options.itemSelector;
  // hide by default
  $items.hide();
  // append to container
  this.append( $items );
  $items.imagesLoaded().progress( function( imgLoad, image ) {
    // get item
    // image is imagesLoaded class, not <img>, <img> is image.img
    var $item = $( image.img ).parents( itemSelector );
    // un-hide item
    $item.show();
    // masonry does its thing
    msnry.appended( $item );
  });
  
  return this;
};

function randomInt( min, max ) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getItem() {
  var height = randomInt( 1, 60 );
  var item = '<div class="item">'+
    '<img src="D:/Airdecor/images/Novgod/mnovgod/mnovgod' + height + '.jpg" /></div>';
  return item;
}

function getItems() {
  var items = '';
  for ( var i=0; i < 12; i++ ) {
    items += getItem();
  }
  // return jQuery object
  return $( items );
}