var opens = [], deeds = [], domains = [], artifacts = [], claims = []; const options = {method: 'GET'}; 
var domainFound = false; var tempArtifact;

class Open { core = "api_object"; count = 0; checked = false; } //asset.name; image_url; banner_image_url; slug;
class Domain { core = "api_object"; name = "civi"; coord = "key.png"; img = "scene.png"; ref = "wiki.htm"; owner = "me"; price = "0.1"; hide = false; checked = false; map = ""; art = []; item = false; } // asset.token_id; image_url; image_thumbnail_url; image_preview_url; name; description; external_link; permalink; creator.address; name; parseFloat(asset.sell_orders[0].base_price)/1000000000000000000;

function pullOpens() {
    fetch('https://api.opensea.io/api/v1/collections?asset_owner=0x8a83fbbacb82030ea17179c0403b04e7bce7ba10&offset=0&limit=300', options)
      .then(response => response.json()).then(response => {
        for (let i = 0; i < response.length; i++) { var asset = response[i];
            if (asset.name == "Rarible" || asset.name == "Uniswap V3 Positions") { continue; }
            var tmp = new Open; tmp.core = asset; opens.push(tmp); } } ).then(response => { for (let i=0;i<opens.length;i++) { opens[i].count = pullOpen(opens[i].core.slug); if (opens[i].core.slug == "nfnth") { opens[i].core.name = "NfNth"; } } }).catch(err => console.error(err)); }

function pullOpen(name) { 
    fetch('https://api.opensea.io/api/v1/assets?limit=50&collection='+name, options)
      .then(response => response.json()) //.then(response => assets = response)
      .then(response => { for (let i = 0; i < response.assets.length; i++) {
            var tmp = new Domain(); var asset = response.assets[i]; var traits = asset.traits;
            if (asset.name == "absaroka.us" || asset.name == "monocacy.us") { continue; } tmp.core = asset;
            for (let a = 0; a < traits.length; a++) {
                switch(traits[a].trait_type.toLowerCase()) {
                    case 'name': tmp.name = traits[a].value.toString(); break;
                    case 'gps': tmp.coord = traits[a].value.toString(); break;
                    case 'res': tmp.img = traits[a].value.toString(); break;
                    case 'ref': tmp.ref = traits[a].value.toString(); break;
                    default: break; } }
            domains.push(tmp);  }  updateCount(name, response.assets.length); } ).then(response => {
            	if (domains.length > 180) { 
			if (domainFound == false) { var domainPath = getParameter(); 
				if (domainPath != 'none') { for (let b = 0; b < domains.length; b++) { 
					if (domains[b].core.external_url == domainPath) { showMark(b); 
						document.title = document.title.replace("Ocurious",domains[b].core.external_url);  
						domainFound = true; } } } else { domainFound = true; } }
			complete = domains.slice(); domainFind(); } }).catch(err => console.error(err)); }

function pullArtifact(link) { 
	fetch('https://api.opensea.io/api/v1/asset/'+link.replace('https://opensea.io/assets/',''), options)
      		.then(response => response.json())
      		.then(response => {  tempArtifact = response; updatePreview(); }).catch(err => console.error(err)); }

function pullAssets(owner, slug) { 
    fetch('https://api.opensea.io/api/v1/assets?limit=50&owner='+owner.address+'&collection_slug='+slug, options)
      .then(response => response.json())
      .then(response => {
        for (let i = 0; i < response.assets.length; i++) { var tmp = new Deed(); tmp.id = response.assets[i].token_id; owner.deed.push(tmp); 
           //var asset = response.assets[i]; var id = asset.token_id; //alert(id);
           //for (let j = 0; j < holder.length; j++) { if (holder[j][0] == id) { claims.push(j); } } 
							 } } ).then(response => { listDeeds(); }).catch(err => console.error(err)); }
     // .then(response => { listDeeds(); }).catch(err => console.error(err)); }

function pullOwner(i) { id = domains[i].core.token_id;
	fetch('https://api.opensea.io/api/v1/asset/0x495f947276749ce646f68ac8c248420045cb7b5e/'+id, options)
      		.then(response => response.json()) //.then(response => assets = response)
      		.then(response => {  domains[i].owner = response.top_ownerships[0].owner.address; updateInfo(i); }).catch(err => console.error(err)); }

function pullPrice(i) { id = domains[i].core.token_id;
	fetch('https://api.opensea.io/api/v1/asset/0x495f947276749ce646f68ac8c248420045cb7b5e/'+id+'/listings', options)
      		.then(response => response.json()) //.then(response => assets = response)
      		.then(response => { if (typeof response.listings[0] !== 'undefined') { 
			domains[i].price = parseFloat(response.listings[0].current_price)/1000000000000000000; } else {domains[i].price = "Unlisted" } updateInfo(i);  }).catch(err => console.error(err)); }

function updateCount(name, count) { for (let i=0;i<opens.length;i++) { if (opens[i].core.slug == name) { opens[i].count = count; break;} } }
