var complete; var reset = false; var first = true; var nfnth = false;
function showNfNth() { if (nfnth) {nfnth = false;} else {nfnth = true;}  }
function showList(area) {  $("#registry").html(''); $("#registry").hide(); 
    switch (area) {
        case "domain": $("#registry-domain").html(''); openDomain();
		    sortSet = [area,domains,0,18,16]; for (let i=0;i<domains.length;i++) { if (domains[i].hide == false) addList(i); } 
		    $("#registry-domain").css("height",(height-16) + "px");
		    //adjustSort(true); 
		    break;
        case "filter":  sortSet = [area,domains,0,18,16]; domains = holder; for (let i=0;i<domains.length;i++) { 
		if (domains[i].hide == false) addList(i); } adjustSort(true); break;
        case "open": $("#registry-open").html(''); sortSet = [area,opens,0,18,16]; for (let i=0;i<opens.length;i++) { 
		if (opens[i].core.slug != "nfnth") { addOpen(i); } else { if (nfnth == true) { addOpen(i); } else { opens[i].checked = false; } } } //adjustSort(false);  
		    $("#registry-open").css("height",(height-16) + "px"); 
		    showList('domain');
		    break; }
    //$("#registry").css("height",height + "px");
    $("#registry").show(); $('img').on('dragstart', function(evt) { return false; }); }

function openDomain() { var any = false;
	
	for (let i=0;i<domains.length;i++) { for (let j=0;j<opens.length;j++) { 
	if (domains[i].core.collection.slug == opens[j].core.slug) { if (opens[j].checked == false) { domains[i].hide = true; } else { domains[i].hide = false; any = true; } }
	  } } 
		      if (any) { 
			      $("#selLink").removeClass('disabled'); $("#dropdown-domainer").removeClass('disabled'); $("#switchLink").removeClass('disabled'); } else { $("#selLink").addClass('disabled'); $("#dropdown-domainer").addClass('disabled'); $("#switchLink").addClass('disabled'); $("#registry-domain").html(""); $("#registry-domain").append("<a onclick='$(\"#token-tabs\").tabs(\"select\", \"test1\");' class='collection-item'>No deed selected.</a>"); }
			      
		      }
	
var showGrid = true; var gridSelect = false; 
function switchView() { if (showGrid) { showList('open'); $("#view-icon2").html("view_list"); //$("#view-name2").html("&nbsp;&nbsp;List"); 
				       showGrid = false; } else { showList('domain'); //$("#view-name2").html("&nbsp;&nbsp;Img"); 
								 $("#view-icon2").html("grid_view"); showGrid = true;} }

var showGridOpen = false; var selectOpen = true; var selectDomain = true; var showListOpen = true;
function switchOpen() { if (showGridOpen) { showGridOpen = false; showList('open'); $("#open-icon").html("grid_view");  } else { showGridOpen = true; showList('open'); $("#open-icon").html("view_list"); } }
	function switchDomain() { if (showListOpen) { showListOpen = false; showList('domain'); $("#domain-icon").html("view_list");  } else { showListOpen = true; showList('domain');  $("#domain-icon").html("grid_view"); } }
function selOpen() { for (let i=0;i<opens.length;i++) { opens[i].checked = selectOpen; } showList('open');
	if (selectOpen) { selectOpen = false;   $("#open-sel-icon").html("deselect"); } else { selectOpen = true;  $("#open-sel-icon").html("select_all");} }

function buildCollect(slug) { clearMark(); for (let i=0;i<domains.length;i++) { if (domains[i].core.collection.slug == slug) { domains[i].checked = true; showMark(i); } else { domains[i].checked = false; } } }


function adjustSize(img) {
    if (img.height >= img.width) { adjustment = (img.height - img.width) / 48; shim = 'padding-right'; img.height = "48"; }
    else {adjustment = (img.width - img.height) / 48; shim = 'padding-top'; img.width = "48";}
    img.style.setProperty(shim,adjustment+'px'); img.style.setProperty('display','block');}
	
function selDomain() { for (let i=0;i<domains.length;i++) { if (domains[i].hide != true) { domains[i].checked = selectDomain; } } showList('domain');
	if (selectDomain) { selectDomain = false;   $("#domain-sel-icon").html("deselect"); } else { selectDomain = true;  $("#domain-sel-icon").html("select_all");} }
		    
function setOpen(i) { if (opens[i].checked == true) { opens[i].checked = false; } else { opens[i].checked = true; } }
function setList(i) { if (domains[i].checked == true) { domains[i].checked = false; offLand(i); } else { domains[i].checked = true; onLand(i); } }
function addOpen(i){ var extra = ""; if(opens[i].checked == true) { extra = "checked='checked'"; } 
	if (showGridOpen) {
    		$("#registry-open").append("<a class='collection-item open'><div style='display:flex;justify-content:space-between;align-items:center;'><div><img style='cursor:pointer;' onclick='addOpenDeed(" + i + ");' class='z-depth-1' width='52' height='32' src='" + opens[i].core.banner_image_url + "'/></div>&nbsp;&nbsp;<div style='display:flex;align-items:center;'><div style='display:flex;cursor:pointer;'><div onclick='openInNewTab(\"https://opensea.io/collection/" + opens[i].core.slug + "\");' style='cursor:pointer; width:100px;font-size: 14px;' class='z-depth-1 chip collected hoverable'><img src='res/img/key/" + getCollect(opens[i].core.slug) + "'>" + opens[i].core.slug + "</div></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div><label><input type='checkbox' " + extra + " id='check" + i + "' onclick='setOpen(" + i + ");' /><span>&nbsp;</span></label></div></div></div></a>");  } else {
		$("#registry-open").append("<a class='collection-item open'><div style='display:flex;justify-content:space-between;'><div onclick='addOpenDeed(" + i + ");' style='display:flex; justify-content:space-between;align-items:center;cursor:pointer;'>" + opens[i].core.name + "</div><div style='display:flex;align-items:center;'><div class='chip z-depth-1 hoverable collected' style='font-size:14px;cursor:pointer;' onclick='openInNewTab(\"https://opensea.io/collection/" + opens[i].core.slug + "\");'>" + opens[i].core.slug + "&nbsp;·&nbsp;<span style='font-weight:bold;font-size:13px;'>" + opens[i].count + "</span></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div><label><input type='checkbox' " + extra + " id='check" + i + "' onclick='setOpen(" + i + ");' /><span>&nbsp;</span></label></div></div></div></div></a>");  } }
	
function addOpenDeed(i) { $("#somedialog2").css("z-index",1004);
    setDialog("<div style='text-align:center;'><p><span style='font-weight:16px'>" + opens[i].core.name + "</span>&nbsp;&nbsp; · &nbsp;&nbsp;<a style='cursor:pointer;' onclick='openInNewTab(\"https://opensea.io/collection/" + opens[i].core.slug + "\");'>" + opens[i].core.slug + "</a></p></div><br/><div style='text-align:center;'><img style='width:80%;' src='" + opens[i].core.banner_image_url + "' /></div><br/><br/><div style='text-align:center;'><div style='display:flex;align-items:center;justify-content:center;'><img class='z-depth-2' onclick='openInNewTab(\"https://opensea.io/collection/" + opens[i].core.slug + "\");' style='cursor:pointer; margin-right:12px;display:none;' onload='adjustSize(this);' src='img/key/" + getCollect(opens[i].core.slug) + "' /><span class='blue-grey lighten-3 badge z-depth-1' style='color:black!important;font-weight:bold;'>" + opens[i].count + "</span></div><br/><br/>" + renderMd(opens[i].core.description) + "</div><br/><br/>");
			
			$('#deed-pane').sidenav('close');
			}
	
function addList(i){ var extra = ""; if(domains[i].checked == true) { extra = "checked='checked'"; } var filler = "";
	if (domains[i].item) { filler = "beige;' class='amber"; } else { filler = "ghostwhite;' class='grey"; }
	if (showListOpen) {
    		$("#registry-domain").append("<a class='collection-item'><div style='display:flex;justify-content:space-between;'><div style='display:flex;justify-content:space-between;align-items:center;' onclick='flyMark(" + i + ");'>" + domains[i].core.name + "</div><div style='display:flex; justify-content:space-between;align-items:center;'><div style='display:flex;'><span id='l" + i + "' style='color:" + filler + " btn waves-effect waves-light lighten-4' onclick='buildLand(" + i + ");'><i class='material-icons'>landscape</i></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style='display:flex;align-items:center;'><label style='display:flex;'><input type='checkbox' " + extra + " onclick='setList(" + i + ");' /><span></span></label></div></div></div></div></a>"); } else {
		$("#registry-domain").append("<a class='collection-item'><div style='display:flex;justify-content:space-between;'><div><img style='cursor:pointer;' onclick='showView(\"list\"); showList(\"domain\"); flyMark(" + i + ");' class='z-depth-1' width='52' height='30' src='" + domains[i].core.image_url + "'/></div><div style='display:flex; justify-content:space-between;align-items:center;'><span style='color:" + filler + " btn waves-effect waves-light lighten-4' onclick='buildLand(" + i + ");'><i class='material-icons'>landscape</i></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style='display:flex; flex-direction:column;'><label style='display:flex;'><input type='checkbox' " + extra + " onclick='setList(" + i + ");' /><span></span></label></div></div></div></a>"); } }
	
function buildLand(i) { if (domains[i].item == false) { onLand(i); } else { offLand(i); } }
function onLand(i) { domains[i].item = true; $("#l"+i).css('color','beige'); $("#l"+i).addClass('amber'); $("#l"+i).removeClass('grey');
	 $("#lm"+i).css('color','beige'); $("#lm"+i).addClass('amber'); $("#lm"+i).removeClass('grey'); }
function offLand(i) { domains[i].item = false; $("#l"+i).css('color','ghostwhite'); $("#l"+i).addClass('grey'); $("#l"+i).removeClass('amber');
	$("#lm"+i).css('color','ghostwhite'); $("#lm"+i).addClass('grey'); $("#lm"+i).removeClass('amber'); }
	
function addListDetail(i) { //pullOwner(i); pullPrice(i);
	var card = "";
	for (var a = 0; a < opens.length; a++) { if (opens[a].core.slug == domains[i].core.collection.slug) card = opens[a].core.banner_image_url; }
	
     	$("#domain-info").html('<div style="display:flex;justify-content:space-evenly;align-items:center;width:100%;padding-top:12px;"><div style="display: flex;flex-direction: column;text-align: left;align-items:center;width:100%;margin-top:12px;"><div style="display:flex; justify-content:center; width:80%; margin-bottom:12px;"><div style="display:flex;cursor:pointer;align-items:center;margin-top:24px;flex-direction:column;"><div><img width="64" height="64" src="' + domains[i].core.image_url + '"/>' + badge('gps','x,y') + '</div><div><img class="z-depth-1" width="52" height="32" src="' + card + '"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div onclick="openInNewTab(\'https://opensea.io/collection/' + domains[i].core.collection.slug + '\');" style="cursor:pointer; width:100px;font-size: 14px;" class="z-depth-1 chip collected hoverable"><img src="res/img/key/' + getCollect(domains[i].core.collection.slug) + '">' + domains[i].core.collection.slug + '</div></div></div><div style="display:flex; flex-direction:column;">' + badge('artifact','2') + badge('ur','289') + badge('deed','0.1') + '</div></div><div style="margin-top:24px; margin-bottom:16px;">' + domains[i].name + '&nbsp;&nbsp · &nbsp;&nbsp<a onclick="openInNewTab(\'' + domains[i].core.external_link + '\');">' + domains[i].core.name + '</a></div><br/></div></div>');

} 
	
function addListDeed(i) { var embedDisplay = "";
	//if (domains[i].core.animation_url != null) {  } else { 
		embedDisplay = "<img  style='width:80%;' src='" + domains[i].core.image_url + "' />"; // }
//embedDisplay = '<video id="vid" style="width:80%;" width="320" height="240" controls loop poster="' + domains[i].core.image_url + '"><source src="https://cdn.jsdelivr.net/gh/nfnth/data@latest/res/media/01G00GY1BXV1FQDHD9TPRYS32P.mp4" type="video/mp4"></video>';
//function change(a){ document.getElementById('vid').poster=a; document.getElementById('vid').src=a.replace('res/raw/','res/media/').replace('.jpg','.mp4'); }
		
	return "<div style='text-align:center;'><p><span style='font-weight:16px'>" + domains[i].name + "</span>&nbsp;&nbsp; · &nbsp;&nbsp;<a onclick='openInNewTab(\"" + domains[i].core.external_link + "\");'>" + domains[i].core.name + "</a></p></div><br/><div id='emDisp' style='text-align:center;'>" + embedDisplay + "</div></br><p>" + domains[i].core.description + "</p><a onclick='openInNewTab(\"" + domains[i].ref + "\");'>Read more...</a><br/><br/><div style='text-align:center;'><img style='max-width:80%;' src='" + domains[i].img + "' /></div><br/>";   }
	
function addUserDeed(i) { var embedDisplay = "";
	embedDisplay = "<img  style='width:80%;' src='" + domainMd.image + "' />"; // }
		
	return "<div style='text-align:center;'><p><span style='font-weight:16px'><a onclick='openInNewTab(\"" + domainMd.link + "\");'>" + domainMd.name + "</a></p></div><br/><div id='emDisp' style='text-align:center;'>" + embedDisplay + "</div></br><p>" + domainMd.content + "</p><br/>";   }
	
function addArtDeed(i) { var embedDisplay = "";
	embedDisplay = "<img  style='width:80%;' src='" + artifacts[i].image + "' />"; // }
		
	return "<div style='text-align:center;'><p><span style='font-weight:16px'><a onclick='openInNewTab(\"" +artifacts[i].link + "\");'>" + artifacts[i].name + "</a></p></div><br/><div id='emDisp' style='text-align:center;'>" + embedDisplay + "</div></br><p>" + artifacts[i].content + "</p><br/>";   }

function getCollect(value) {
    switch(value) {
        case 'librar': return 'tan.png'; case 'patric': return 'orange.png'; case 'clini': return 'pink.png'; case 'sect': return 'green.png'; case 'technic': return 'white.png'; case 'utili': return 'gray.png'; case 'civilia': return 'blue.png'; case 'tact': return 'red.png'; case 'elect': return 'yellow.png'; case 'agrar': return 'brown.png'; case 'logicia': return 'purple.png'; case 'custo': return 'black.png';
        default: return 'blue_swords.png'; }}

function getColor(value) {
    switch(value) {
	case 'tact': return 1; case 'patric': return 2; case 'elect': return 3; case 'sect': return 4; case 'civilia': return 5; case 'logicia': return 6; case 'clini': return 7; case 'librar': return 8; case 'agrar': return 9; case 'technic': return 10; case 'utili': return 11; case 'custo': return 12;
        default: return 'blue_swords.png'; }}
