console.log("Quran slides loaded");

var url = window.location.pathname;
url = url.substring(1).split('/');
var surahPart = parseInt(url[0]);
var ayaPart = parseInt(url[1]);
url = surahPart;
if(!isNaN(surahPart)){
  if(!isNaN(ayaPart)){
    url += ':' + ayaPart;
  }
  $('#title').after('<a style="  color: white; text-decoration: none; font-size: 15px; float: left; background: #79872F; border-radius: 4px; padding: 4px; padding: 4px; margin-top: 4px; margin-right: 10px;" href="http://www.doc.ic.ac.uk/~me1810/quran-slides/?'+url+'">View as presentation</a>');
}
