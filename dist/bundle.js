window.addEventListener("load",(function(){document.getElementById("openGeneratePopup").addEventListener("click",(function(){document.getElementById("generateConfigContainer").style.display="flex"})),document.getElementById("closeConfigButton").addEventListener("click",(function(){document.getElementById("generateConfigContainer").style.display="none"}));var e=!1,t=0,n=0;function a(e,n){void 0===n&&(n=!1);for(var d=0,o=!1,i=parseInt(e.dataset.y),l=parseInt(e.dataset.x),r=!1,s=0;s<3;s++)for(var c=s-1+i,u=0;u<3;u++){var m="fieldTileId-"+(u-1+l)+"x"+c,f=document.getElementById(m);null!=f&&(n&&("true"===f.dataset.isbomb&&(f.dataset.isbomb="false",t--,r=!0),a(f),f.disabled=!0),"true"===f.dataset.isbomb&&d++)}return e.textContent=d.toString(),"true"==e.dataset.isbomb&&(e.textContent="X",o=!0),r?a(e,n):o}function d(){console.log("Exposing field...");var e=document.getElementById("minefieldContainer");Array.from(e.children).forEach((function(e){Array.from(e.children).forEach((function(e){a(e),e.disabled=!0}))}))}function o(){n>=t&&(console.log(n,t),d(),setTimeout((function(){alert("Congratulations!\nYou have successfuly uncovered all mines.\nClick generate to create a new game")}),400))}document.getElementById("generateField").addEventListener("click",(function(){t=0,n=0,e=!0;var i=parseInt(document.getElementById("fieldHeightInput").value),l=parseInt(document.getElementById("fieldWidthInput").value),r=document.getElementById("minefieldContainer");r.innerHTML="";for(var s=0;s<i;s++){var c=document.createElement("div");c.className="row";for(var u=function(i){var l=document.createElement("button");l.id="fieldTileId-"+i+"x"+s,l.dataset.x=i.toString(),l.dataset.y=s.toString(),l.className="fieldTile",l.addEventListener("contextmenu",(function(e){var t;e.preventDefault(),(t=l).disabled||("true"===t.dataset.isflagged?(t.dataset.isflagged="false",t.textContent=""):(t.dataset.isflagged="true",t.textContent="F","true"===t.dataset.isbomb&&(n++,document.getElementById("checkFlag").checked&&(t.textContent="B"))),o())})),l.addEventListener("click",(function(t){var i;"true"!==(i=l).dataset.isflagged&&(a(i,e)&&!e&&(n++,setTimeout((function(){confirm("Boom! Dead.\nYou stepped on a landmine and exploded.\nDo you want to continue? \n(Click OK to resume game and CANCEL to quit)")||d()}),400)),e=!1,i.disabled=!0,o())}));var r=Math.random()<.25;r&&(l.dataset.isbomb=r.toString(),t++),l.dataset.isflagged="false",c.append(l)},m=0;m<l;m++)u(m);r.append(c)}document.getElementById("closeConfigButton").click()}))}));