window.addEventListener("load",(function(){function e(e){var t=0;if("true"==e.dataset.isbomb)return e.textContent="X",!0;for(var n=parseInt(e.dataset.y),o=parseInt(e.dataset.x),d=0;d<3;d++)for(var a=d-1+n,i=0;i<3;i++){var r="fieldTileId-"+(i-1+o)+"x"+a,l=document.getElementById(r);null!=l&&"true"===l.dataset.isbomb&&t++}return e.textContent=t.toString(),!1}document.getElementById("openGeneratePopup").addEventListener("click",(function(){document.getElementById("generateConfigContainer").style.display="flex"})),document.getElementById("closeConfigButton").addEventListener("click",(function(){document.getElementById("generateConfigContainer").style.display="none"})),document.getElementById("generateField").addEventListener("click",(function(){var t=parseInt(document.getElementById("fieldHeightInput").value),n=parseInt(document.getElementById("fieldWidthInput").value),o=t*n,d=Math.round(o/5),a=document.getElementById("minefieldContainer");a.innerHTML="";for(var i=0;i<t;i++){var r=document.createElement("div");r.className="row";for(var l=function(t){var n=document.createElement("button");n.id="fieldTileId-"+t+"x"+i,n.dataset.x=t.toString(),n.dataset.y=i.toString(),n.className="fieldTile",n.addEventListener("click",(function(t){var o;e(o=n)&&setTimeout((function(){confirm("Boom! Dead.\nYou stepped on a landmine and exploded.\nDo you want to continue? \n(Click OK to resume game and CANCEL to quit)")||function(){console.log("Exposing field...");var t=document.getElementById("minefieldContainer");Array.from(t.children).forEach((function(t){Array.from(t.children).forEach((function(t){e(t),t.disabled=!0}))}))}()}),400),o.disabled=!0})),n.dataset.isbomb=(Math.random()<d/o).toString(),r.append(n)},c=0;c<n;c++)l(c);a.append(r)}document.getElementById("closeConfigButton").click()}))}));