if (location.hash) {

    // Take the hash from the url
    var sectionUrl = location.hash;                      
  
    // Disable anchor "jump" when loading a page
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 1);
                        
    // "Jump" to the tag h1 with the location hash 
    setTimeout(function() {
        $('html, body').stop().animate({
        scrollTop: $(sectionUrl).offset().top
        }, 3000);
    }, 2000)

}