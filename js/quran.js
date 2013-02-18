var root = (typeof exports == 'undefined' ? window : exports);
var container = $('.slides');
var isRetina = (root.devicePixelRatio > 1) || (root.matchMedia && root.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)").matches);
var surahVerses = [];

var getVerseImageURL = function(surah, verse){
  var baseUrl = isRetina ? "http://quran.com/images/ayat_retina/" : "http://c00022506.cdn1.cloudfiles.rackspacecloud.com/";
  return baseUrl+surah+"_"+verse+".png";
}

var createNewSlide = function(surah, verse){
  var verseNum = Quran.verseNo.ayah(surah, verse);
  var html = "<section><p><img src='"+getVerseImageURL(surah, verse)+"' /></p><p class='v"+verseNum+"'></p><p><small>"+surah+":"+verse+"</small></p></section>";
  $(container).append(html)

}

var createSlideSequence = function(surah, startVerse, endVerse){
  for (var i = startVerse; i <= endVerse; i++) {
    createNewSlide(surah, i);
  }
}

var paseVersesRequest = function(request){
  //Take off the first hash
  var requestArray = request.substring(1).split(':');

  // The following string is either a number or a hiphenation of 2 numbers (eg 4-5)
  var verseRequest = requestArray[1] != undefined ? requestArray[1].split('-') : [];
  var verseRequestType = verseRequest.length === 1 ? 'verse' : verseRequest.length === 2 ? 'range' : 'error';

  return {
    surah: parseInt(requestArray[0]), // The first number is the surah number
    type: verseRequestType,
    startVerse: parseInt(verseRequest[0]),
    endVerse: parseInt(verseRequest[1])
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
  var verseRequest = paseVersesRequest(window.location.search);
  var doRange = false;
  var doVerse = false;
  var doSurah = verseRequest.surah !== NaN;
  if(doSurah && verseRequest.type != 'error'){
    doRange = (verseRequest.type == 'range' && verseRequest.startVerse != NaN && verseRequest.endVerse != NaN);
    if(doSurah){
      var endVerse = doRange? verseRequest.endVerse : verseRequest.startVerse;
      var startVerse = verseRequest.startVerse;
      createSlideSequence(verseRequest.surah, startVerse, endVerse);
      $.ajax({
        url :"http://api.globalquran.com/surah/"+verseRequest.surah+"/en.shakir",
        data: {jsoncallback:true, format: 'jsonp'},
        dataType :"jsonp",
        cache: true, 
        jsonpCallback: 'quranData',
        success : function(data){
          var start = Quran.verseNo.ayah(verseRequest.surah, startVerse);
          var end = Quran.verseNo.ayah(verseRequest.surah, endVerse);
          for(var i = start; i<=end; i++){
            $('.v'+i).html(data.quran['en.shakir'][i].verse);
          }
          
          doReveal();
        },
        error : function(httpReq,status,exception){
          alert(status+" "+exception);
        }
      });
    }


  } else {
    if(doSurah){
      alert('Surah-only requests coming soon');
    }
    alert("Please add a request to your url, e.g. "+window.location.origin+window.location.host+window.location.pathname+"?1:1");
  }

});
