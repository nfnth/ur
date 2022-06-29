class Wallet { address = ""; deed = []; } class Deed { name = ""; id = ""; }
var user = new Wallet(); //var disconnect = false;
var gasPrice = ""; var itemPrice;
var setup = async function () {
    if (window.ethereum) { //web3 = new Web3(window.ethereum); //await account();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); user.address = accounts[0];
        $("#myAdd").html(user.address.toLowerCase().substring(0,16) + "...");
        $.get("api/"+user.address, async function(data) { 
            	var fields = data.split('|'); var ether = JSON.parse(fields[0]).result; var urler = fields[1]; var gas = fields[2];
		$('#myETH').hide().html(badge('eth',ether.substring(0, 4))).fadeIn('slow'); itemPrice = parseInt(ether) / 2;
		$('#myGas').hide().html(badge('gas',gas)).fadeIn('slow'); gasPrice = gas;
		$('#myURL').hide().html(badge('ur',urler)).fadeIn('slow');
            	$("#wallet-area").removeClass("grey"); $("#wallet-area").addClass("green"); $("#wallet-icon").css("color","darkgreen"); } ); 
    	for (let i=0;i<opens.length;i++) { pullAssets(user, opens[i].core.slug); } }
    else { M.toast({html: 'No wallet found.'}); } }; $("#wallet-setup").click(setup);

function desetup() { user = ""; user = new Wallet();  
	$("#wallet-area").addClass("grey"); $("#wallet-area").removeClass("green"); $("#wallet-icon").css("color","darkslategrey");
	$("#myAdd").hide().html('My ETH Balance').fadeIn('slow');
	$('#myETH').hide().html('My Wallet Address').fadeIn('slow'); 
	$('#myGas').hide().html('').fadeIn('slow'); 
	$('#myURL').hide().html('My UR Balance').fadeIn('slow');
		    
    	emptyDeeds(); domainSelect(); }

function listDeeds() {
    	$('#domain-template').empty(); $('#domain-template').append('<option selected="selected">No domain selected</option>');
    	for (let i = 0; i < user.deed.length; i++) { 
	    	for (let j = 0; j < domains.length; j++) { 
			if (domains[j].core.token_id == user.deed[i].id) {  user.deed[i].name = domains[j].core.name; j = domains.length;
	$('#domain-template').append('<option selected="selected" value="' + user.deed[i].id + '">' + user.deed[i].name + '</option>'); }} }

	    	
	
    	document.getElementById('domain-template').getElementsByTagName('option')[0].selected = 'selected'; $("#domain-template").formSelect(); 
	//$('select').formSelect(); 
}

function emptyDeeds() { $('#domain-template').empty();
    	$('#domain-template').append('<option selected="selected">No domain selected</option>'); 
	$('#domain-template').append('<option>tactician.us (demo)</option>'); $("#domain-template").formSelect(); }

function domainSelect() { 
	var d = document.getElementById("domain-template"); var dt = d.options[d.selectedIndex].text; var dv = d.options[d.selectedIndex].value; 
    	if (dt == 'No domain selected') { $("#builder").addClass("disabled"); $("#trader").addClass("disabled"); $("#map-add").addClass("disabled");
		$('#myDomain').hide().html("My Domain Balance").fadeIn('slow');
		$("#myArt").hide().html("My Domain Artifact").fadeIn('slow'); }
    	else { $("#builder").removeClass("disabled");  $("#trader").removeClass("disabled"); $("#map-add").removeClass("disabled");
	      $('#myDomain').hide().html(badge('ur','24,901')).fadeIn('slow');
	      $('#myArt').hide().html(badge('artifact','2')).fadeIn('slow'); } pullDomain(dv);  }

function badge(area,amount) {
	switch(area) {
		case 'artifact': return '<span class="badge blue" style="display:flex; color:black!important; "><span style="font-weight:bold;margin-right:4px;">' + amount + '</span> artifact&nbsp;&nbsp;<i class="material-icons" style="color:midnightblue;">inventory_2</i></span>';
		case 'ur': return '<span class="badge amber" style="display:flex; color:black!important; "><span style="font-weight:bold;margin-right:4px;">' + amount + '</span> UR&nbsp;&nbsp;<i class="material-icons" style="color:darkgoldenrod;">toll</i></span>';
		case 'eth': return '<span class="badge green" style="display:flex; color:black!important; "><span style="font-weight:bold;margin-right:4px;">' + amount + '</span> ETH&nbsp;&nbsp;<i class="material-icons" style="color:darkgreen;">token</i></span>';
		case 'gas': return '<span class="badge red" style="display:flex; color:black!important; "><span style="font-weight:bold;margin-right:4px;">' + amount + '</span> GWEI&nbsp;&nbsp;<i class="material-icons" style="color:darkred;">local_gas_station</i></span>';
		case 'deed': return '<span class="badge blue" style="display:flex; color:black!important; "><span style="font-weight:bold;margin-right:4px;">' + amount + '</span> ETH&nbsp;&nbsp;<i class="material-icons" style="color:midnightblue;">sailing</i></span>';
		case 'wallet': return '<span class="badge brown" style="display:flex; color:black!important; "><span style="font-weight:bold;margin-right:4px;">' + amount + '</span>&nbsp;&nbsp;<i class="material-icons" style="color:beige;">account_balance_wallet</i></span>'; 
		case 'coord': return '<span class="badge yellow" style="display:flex; color:black!important; "><span style="font-weight:bold;margin-right:4px;">' + amount + '</span> &nbsp;&nbsp;<i class="material-icons" style="color:darkyellow;">map</i></span>';} }

function pullDomain(domain) { domainMd = ""; domainMd = new Md(); 
	$("#selink").removeClass("disabled"); $("#dropdown-deeder").removeClass("disabled"); $("#swilink").removeClass("disabled");
	$("#adder").removeClass("disabled"); $("#editer").removeClass("disabled"); $("#deleter").removeClass("disabled");
			     
	if (domain == "void") {
		artifacts = [];
		$("#selink").addClass("disabled"); $("#dropdown-deeder").addClass("disabled"); $("#swilink").addClass("disabled");
		$("#adder").addClass("disabled"); $("#editer").addClass("disabled"); $("#deleter").addClass("disabled");
	} else {
		$.get('domain/' + domain + '/doc', function(data) { 
			var lines = data.split(/\r?\n/); var fields = lines[0].split('|'); 
			domainMd.name = fields[0]; domainMd.location = fields[1]; domainMd.color = fields[2]; 
			domainMd.image = fields[3]; domainMd.content = fields[4]; domainMap();
			for (let i = 1; i < lines.length - 1; i++) { 
				temp = new Md(); fields = lines[i].split('|'); 
				temp.name = fields[0]; temp.location = fields[1]; temp.color = fields[2]; temp.image = fields[3]; temp.content = fields[4];
				artifacts.push(temp); }  
			builder(); }); 
	
	}  }

var showArtifactOpen = true;
function builder() { $("#registry-artifact").html(""); var extra = ""; 
	if (artifacts.length == 0) { $("#registry-artifact").append("<a onclick='$(\"#domain-tabs\").tabs(\"select\", \"test4\");' class='collection-item'>No domain selected.</a>"); }
	for (let i = 0; i < artifacts.length; i++) { if(artifacts[i].checked == true) { extra = "checked='checked'"; } 
		if (showArtifactOpen) { $("#registry-artifact").append("<a class='collection-item'><div style='display:flex;justify-content:space-between;'><div style='display:flex;justify-content:space-between;align-items:center;' onclick='showView(\"list\"); showList(\"domain\"); flyArt(" + i + ");'>" + artifacts[i].name + "</div><div style='display:flex; justify-content:space-between;align-items:center;'><div style='display:flex;'><span style='color:aliceblue;' class='btn waves-effect waves-light blue lighten-4' onclick='artDoc(" + i + "); $(\"#user-pane\").sidenav(\"close\");'><i class='material-icons'>article</i></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style='display:flex;align-items:center;'><label style='display:flex;'><input type='checkbox' " + extra + " onclick='setList(" + i + ");' /><span></span></label></div></div></div></div></a>"); } 
		else { $("#registry-artifact").append("<a class='collection-item'><div style='display:flex;justify-content:space-between;'><div><img style='cursor:pointer;' onclick='showView(\"list\"); showList(\"domain\"); flyArt(" + i + ");' class='z-depth-1' width='52' height='30' src='" + artifacts[i].image + "'/></div><div style='display:flex; justify-content:space-between;align-items:center;'><span style='color:beige;' class='btn waves-effect waves-light blue lighten-4' onclick='artDoc(" + i + ");'><i class='material-icons'>article</i></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style='display:flex; flex-direction:column;'><label style='display:flex;'><input type='checkbox' " + extra + " onclick='setList(" + i + ");' /><span></span></label></div></div></div></a>"); }	}  }

function postDomain(profile) {
	var stamp = editMd.name + "|" + editMd.location + "|" + editMd.color + "|" + editMd.image + editMd.content;  //datetime?
	
	if (profile != true) {
	var d = document.getElementById("domain-template"); var dt = d.options[d.selectedIndex].text; var dv = d.options[d.selectedIndex].value; 
	if (dt != 'No domain selected') { signer(stamp, dv); }
	else { alert('No domain selected'); } }
	else { signer(stamp, 'profile'); }}

var signer = async function (content, ref) { //add key to message...
    	var messager = '{"domain":{"name":"UR.Land"},"message":{"contents":"Hello, key value for UR.Land"},"primaryType":"Mail","types":{"EIP712Domain":[{"name":"name","type":"string"}],"Mail":[{"name":"contents","type":"string"}]}}';
    	var from = user.address; var params = [from, messager]; var method = 'eth_signTypedData_v4';
    	web3.currentProvider.sendAsync( { method, params, from, },
        	function (err, result) {console.log('TYPED SIGNED:' + JSON.stringify(result.result)); sender(messager, result.result, content, ref);});}

var sender = function (message, signature, content, ref) {
    	var formdata = new FormData(); formdata.append('message', message);formdata.append('signature', signature);formdata.append('content', content); 
    	$.ajax({ url: "data/"+user.address+"/"+ref, type: "POST", data: formdata, processData: false, contentType: false, success: function(data) { alert(data); } }); }

//signer('aslito.us','https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/62652367444291733483705976494538757758952482544655308357132040199892883210241','artifact', '62652367444291733483705976494538757758952482544655308357132040199892883210241');	

async function purchase() { 
	var totalGas = gasPrice * 10000000000;
	var transactionParameters = {
  		nonce: '0x00', // ignored by MetaMask
  		gasPrice: totalGas.toString(16), //'0x6B1A22F800', //'0x09184e72a000', //gasPrice.toString(16), // customizable by user during MetaMask confirmation.
		gas: '0x2710', // customizable by user during MetaMask confirmation.
		to: '0x8a83fbbacb82030ea17179c0403b04e7bce7ba10', // Required except during contract publications.
		from: user.address, // must match user's active address.
		value: itemPrice.toString(16), //'0x00', // Only required to send ether to the recipient from the initiating external account.
		data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
		chainId: '0x3', };
	var txHash = await ethereum.request({ method: 'eth_sendTransaction', params: [transactionParameters], }); }

async function transfer() { 
	var transactionParameters = {
    		from: user.address,
    		to: "0xCcaB679860B1017589239BCeEEabe5CD45965aFc",
    		data: getDataFieldValue("0xB0D39Cd2a5Acc510529444B45a3ACa189D971c49", 1000), };

	var txHash = await ethereum.request({
    		method: 'eth_sendTransaction',
    		params: [transactionParameters], }); }

function getDataFieldValue(tokenRecipientAddress, tokenAmount) { const web3 = new Web3();
    	const TRANSFER_FUNCTION_ABI = {"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"};
    	return web3.eth.abi.encodeFunctionCall(TRANSFER_FUNCTION_ABI, [tokenRecipientAddress, tokenAmount ]); }
