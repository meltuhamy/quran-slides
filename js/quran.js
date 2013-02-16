var container = $('.slides');
var isRetina = true;
var getVerseImageURL = function(surah, verse){
  var baseUrl = isRetina ? "http://quran.com/images/ayat_retina/" : "http://c00022506.cdn1.cloudfiles.rackspacecloud.com/";
  return baseUrl+surah+"_"+verse+".png";
}

var createNewSlide = function(surah, verse){
  var html = "<section><p><img src='"+getVerseImageURL(surah, verse)+"' /></p><p><small>"+surah+":"+verse+"</small></p></section>";
  $(container).append(html)
}

var createSlideSequence = function(surah, startVerse, endVerse){
  for (var i = startVerse; i <= endVerse; i++) {
    createNewSlide(surah, i);
  }
}

var doReveal = function(){
  // Full list of configuration options available here:
  // https://github.com/hakimel/reveal.js#configuration
  Reveal.initialize({
    controls: false,
    progress: true,
    history: false,
    center: true,

    theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
    transition: Reveal.getQueryHash().transition || 'fade', // default/cube/page/concave/zoom/linear/fade/none

    // Optional libraries used to extend on reveal.js
    dependencies: [
      { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
      { src: 'plugin/markdown/showdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
      { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
      { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
      { src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
      { src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
      // { src: 'plugin/remotes/remotes.js', async: true, condition: function() { return !!document.body.classList; } }
    ]
  });
}

$(document).ready(function(){
  createSlideSequence(1,1,7); //Insert ayas for surah 1 verses 1-7
  doReveal(); // Start presentation
});