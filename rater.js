
var qbName = ["Aaron Rodgers", "Andrew Luck", "Russell Wilson", "Ben Roethlisberger", "Drew Brees", "Matt Ryan", "Peyton Manning", "Ryan Tannehill", "Tom Brady", "Cam Newton", "Mathew Stafford", "Eli Manning", "Philip Rivers", "Teddy Bridgewater", "Colin Kaepernick", "Alex Smith", "Joe Flacco", "Sam Bradford", "Carson Palmer", "Derek Carr"];
var rbName = ["Le'Veon Bell", "Adrian Peterson", "Eddie Lacy", "Jamaal Charles", "Marshawn Lynch", "C.J. Anderson", "Jeremy Hill", "Matt Forte", "Lesean McCoy", "Demarco Murray", "Justin Forsett", "Frank Gore", "Lamar Miller", "Alfred Morris", "Latavius Murray", "Carlos Hyde", "Mark Ingram", "Joseph Randle", "Andre Ellington", "T.J. Yeldon"];
var wrName = ["Antonio Brown", "Dez Bryant", "Julio Jones", "Demayrius Thomas", "Odell Beckham Jr.", "Calvin Johnson", "Randall Cobb", "A.J. Green", "Alshon Jeffery", "Mike Evans", "T.Y. Hilton", "Brandin Cooks", "Jordan Matthews", "Davante Adams", "Deandre Hopkins", "Keenan Allen", "Emmanuel Sanders", "Amari Cooper", "Andre Johnson", "Brandon Marshall"];
var teName = ["Rob Gronkowski", "Jimmy Graham", "Travis Kelce", "Greg Olsen", "Martellus Bennett", "Jordan Cameron", "Julius Thomas", "Delanie Walker", "Zach Ertz", "Jason Witten", "Tyler Eifert","Coby Fleener"];
var kName = ["Stephen Gostkowski", "Steven Hauchska", "Justin Tucker", "Dan Bailey", "Cody Parkey", "Brandon McManus", "Mason Crosby", "Adam Viniateri", "Matt Bryant", "Blair Walsh", "Nick Novak", "Matt Prater"];
var dName = ["Seahawks", "Rams", "Bills", "Jets", "Texans", "Cardinals", "Broncos", "Panthers", "Patriots", "Packers", "Dolphins", "Ravens"];

//An Array of "player" objects complete with name and rank
var qbArray = [];
var rbArray = [];
var wrArray = [];
var teArray = [];
var kArray = [];
var dArray = [];

//Players part of team to be rated
var myQB = [];
var myRB = [];
var myWR = [];
var myTE = [];
var myK = [];
var myD = [];

//Info entered by user regarding league
var teamCount = 12;
var wrCount = 2;
var rbCount = 2;
var qbCount = 1;
var teCount = 1;
var flexCount = 1;
var dCount = 1;
var kCount = 1;

//Used to determine strength of position group
var qbRating = 0;
var wrRating = 0;
var rbRating = 0;
var teRating = 0;
var dRating = 0;
var kRating = 0;
var teamRating = 0;

//Players chosen to be highlighted in analysis
var highlightWR;
var highlightRB;
var highlightQB;

//Strength of bench
var qbBenchRating = 0;
var rbBenchRating = 0;
var wrBenchRating = 0;
var teBenchRating = 0;
var rbBenchExists = false;
var wrBenchExists = false;
var qbBenchExists = false;

//Used to determine optimal flex starter
var flexExists = false;
var wrFlex = false;
var rbFlex = false;
var noFlex = false;
var optimalFlex = new player("scrub", 100);


function player(fullname, rank) {
    this.name = fullname;
    this.rank = rank;
}
for(var i = 0; i < 20; i++ ){
	var rank = i + 1;
	var pname = qbName[i];
	qbArray.push(new player(pname, rank));
}
for(var i = 0; i < 20; i++ ){
	var rank = i + 1;
	var pname = rbName[i];
	rbArray.push(new player(pname, rank));
}
for(var i = 0; i < 20; i++ ){
	var rank = i + 1;
	var pname = wrName[i];
	wrArray.push(new player(pname, rank));
}
for(var i = 0; i < 12; i++ ){
	var rank = i + 1;
	var pname = teName[i];
	teArray.push(new player(pname, rank));
}
for(var i = 0; i < 12; i++ ){
	var rank = i + 1;
	var pname = kName[i];
	kArray.push(new player(pname, rank));
}
for(var i = 0; i < 12; i++ ){
	var rank = i + 1;
	var pname = dName[i];
	dArray.push(new player(pname, rank));
}
function rateTeam(){
	if(flexCount > 0){
		flexExists = true;
	}
	if(myQB.length > 0){
		rateQB();
	}
	if(myRB.length > 0){
		rateRB();
	}
	if(myWR.length > 0){
		rateWR();
	}
	if(myTE.length > 0){
		rateTE();
	}
	if(flexExists)
		flexReview();
	if(myK.length > 0)
		rateK();
	if(myD.length > 0)
		rateD();
	rateLineup();
}
function determineFlex(){
	if(rbBenchExists && wrBenchExists){
		var rbRelativeRank = (myRB[rbCount].rank - rbCount*teamCount)/teamCount;
		var wrRelativeRank = (myWR[wrCount].rank - wrCount*teamCount)/teamCount;
		if(rbRelativeRank <= wrRelativeRank){
			optimalFlex = myRB[rbCount];
			rbFlex = true;
		}
		else{
			optimalFlex = myWR[wrCount];
			wrFlex = true;
			rbFlex = false;
		}
	}
	else if(rbBenchExists){
		optimalFlex = myRB[rbCount];
		rbFlex = true;
	}
	else if(wrBenchExists){
		optimalFlex = myWR[wrCount];
		wrFlex = true;
	}
	else
		noFlex = true;
}
function rateLineup(){
	teamRating = 2*(rbRating + wrRating) + 1.5*(qbRating) + 1.25*(teRating) + 0.75*(kRating + dRating);
	teamReview();
}

function rateWR(){
	highlightWR = myWR[0];
	highlightWRIndex = 0;
	highlightRank = highlightWR.rank/teamCount;
	for(var i = 0; i < wrCount; i++){
		var wrRelativeRank = (myWR[i].rank - i*teamCount)/teamCount;
		wrRating += wrRelativeRank; 
		if(wrRelativeRank < highlightRank){
			highlightWR = myWR[i];
			highlightWRIndex = i;
		}
	}
	if(myWR.length > wrCount){
		wrBenchExists = true;
		if(flexExists){
			determineFlex();
		}
		for(var i = wrCount; i < myWR.length; i++){
			var wrRelativeRank = (myWR[i].rank - i*teamCount)/teamCount;
			wrBenchRating += wrRelativeRank;
		}
			
	}
	wrReview();
}
function rateRB(){
	highlightRB = myRB[0];
	highlightRBIndex = 0;
	highlightRank = highlightRB.rank/teamCount;
	for(var i = 0; i < rbCount; i++){
		var rbRelativeRank = (myRB[i].rank - i*teamCount)/teamCount;
		rbRating += rbRelativeRank; 
		if(rbRelativeRank < highlightRank){
			highlightRB = myRB[i];
			highlightRBIndex = i;
		}
	}
	if(myRB.length > rbCount){
		rbBenchExists = true;
		if(flexExists){
			determineFlex();
		}
		for(var i = rbCount; i < myRB.length; i++){
			var rbRelativeRank = (myRB[i].rank - i*teamCount)/teamCount;
			rbBenchRating += rbRelativeRank;
		}
			
	}
	rbReview();
}
function rateQB(){
	highlightQB = myQB[0];
	highlightQBIndex = 0;
	highlightRank = highlightQB.rank/teamCount;
	for(var i = 0; i < qbCount; i++){
		var qbRelativeRank = (myQB[i].rank - i*teamCount)/teamCount;
		qbRating += qbRelativeRank; 
		if(qbRelativeRank < highlightRank){
			highlightQB = myQB[i];
			highlightQBIndex = i;
		}
	}
	if(myQB.length > qbCount){
		qbBenchExists = true;
		for(var i = qbCount; i < myQB.length; i++){
			var qbRelativeRank = (myQB[i].rank - i*teamCount)/teamCount;
			qbBenchRating += qbRelativeRank;
		}
			
	}
	qbReview();
}

function rateTE(){
	for(var i = 0; i < teCount; i++){
		var teRelativeRank = (myTE[i].rank - i*teamCount)/teamCount;
		teRating += teRelativeRank; 
	}
	teReview();
}

function rateK(){
	var kRelativeRank = myK[0].rank/teamCount;
	kRating = kRelativeRank;
	kReview();
}

function rateD(){
	var dRelativeRank = myD[0].rank/teamCount;
	dRating = dRelativeRank;
	dReview();
}

function flexReview(){
	$(".flexName").text(optimalFlex.name);
	$(".flexRank").text(optimalFlex.rank);
	if(wrFlex)
		$('#wrReview7').addClass("activeReview");
	if(rbFlex)
		$('#rbReview7').addClass("activeReview");
}
function teamReview(){
	$('#teamReview0').addClass('activeReview');
	if(teamRating <= (wrCount + rbCount + 0.75*qbCount + 0.625*teCount + 0.375*(dCount + kCount))){
		$('#teamReview1').addClass("activeReview");
	}
	else if((teamRating > (wrCount + rbCount + 0.75*qbCount + 0.625*teCount + 0.375*(dCount + kCount))) && (teamRating <= (2*(wrCount + rbCount)+ 1.5*qbCount + 1.25*teCount + 0.75*(kCount + dCount))))
		$('#teamReview2').addClass("activeReview");
	else
		$('#teamReview3').addClass("activeReview");
}

function wrReview(){
	$('#wrReview0').addClass('activeReview');
	$(".playerName").text(highlightWR.name);
	$(".playerPosition").text(highlightWRIndex + 1);
	$(".playerRank").text(highlightWR.rank);
	if(wrRating < 0){
		$('#wrReview1').addClass("activeReview");
	}
	else if(wrRating <= wrCount*0.5){
		$('#wrReview2').addClass("activeReview");
	}
	else if(wrRating > wrCount*0.5 && wrRating <= wrCount){
		$('#wrReview3').addClass("activeReview");
	}
	else if(wrRating > wrCount)
		$('#wrReview4').addClass("activeReview");
	if(wrBenchExists){
		if(wrBenchRating <= (myWR.length - wrCount)*0.5)
			$('#wrReview5').addClass("activeReview");
		else
			$('#wrReview6').addClass("activeReview");
	}
}
function kReview(){
	$("#kReview0").addClass('activeReview');
	$(".playerNameK").text(myK[0].name);
	$(".playerRankK").text(myK[0].rank);
	if(kRating <= kCount*0.5)
		$('#kReview1').addClass("activeReview");
	else
		$('#kReview2').addClass("activeReview");
	
	
}
function dReview(){
	$("#dReview0").addClass('activeReview');
	$(".playerNameD").text(myD[0].name);
	$(".playerRankD").text(myD[0].rank);
	if(dRating <= dCount*0.5)
		$('#dReview1').addClass("activeReview");
	else
		$('#dReview2').addClass("activeReview");
	
	
}

function rbReview(){
	$('#rbReview0').addClass('activeReview');
	$(".playerNameR").text(highlightRB.name);
	$(".playerPositionR").text(highlightRBIndex + 1);
	$(".playerRankR").text(highlightRB.rank);
	$(".flexName").text(optimalFlex.name);
	$(".flexRank").text(optimalFlex.rank);
	if(rbRating < 0){
		$('#rbReview1').addClass("activeReview");
	}
	else if(rbRating <= rbCount*0.5){
		$('#rbReview2').addClass("activeReview");
	}
	else if(rbRating > rbCount*0.5 && rbRating <= rbCount){
		$('#rbReview3').addClass("activeReview");
	}
	else if(rbRating > rbCount)
		$('#rbReview4').addClass("activeReview");
	if(rbBenchExists){
		if(rbBenchRating <= (myRB.length - rbCount)*0.5)
			$('#rbReview5').addClass("activeReview");
		else
			$('#rbReview6').addClass("activeReview");
	}
}
function qbReview(){
	$('#qbReview0').addClass('activeReview');
	$(".playerNameQ").text(highlightQB.name);
	$(".playerPositionQ").text(highlightQBIndex + 1);
	$(".playerRankQ").text(highlightQB.rank);
	if(qbRating < 0){
		$('#qbReview1').addClass("activeReview");
	}
	else if(qbRating <= qbCount*0.5){
		$('#qbReview2').addClass("activeReview");
	}
	else if(qbRating > qbCount*0.5 && qbRating <= qbCount){
		$('#qbReview3').addClass("activeReview");
	}
	else if(qbRating > qbCount)
		$('#qbReview4').addClass("activeReview");
	if(qbBenchExists){
		if(qbBenchRating <= (myQB.length - qbCount)*0.5)
			$('#qbReview5').addClass("activeReview");
		else
			$('#qbReview6').addClass("activeReview");
	}
}

function teReview(){
	$('#teReview0').addClass('activeReview');
	$(".playerNameT").text(myTE[0].name);
	$(".playerPositionT").text(1);
	$(".playerRankT").text(myTE[0].rank);
	if(teRating < 0){
		$('#teReview1').addClass("activeReview");
	}
	else if(teRating <= teCount*0.5){
		$('#teReview2').addClass("activeReview");
	}
	else if(teRating > teCount*0.5 && teRating <= teCount){
		$('#teReview3').addClass("activeReview");
	}
	else if(teRating > teCount)
		$('#teReview4').addClass("activeReview");
}



var main = function() {
	$('#team8').click(function(){
		var selectedCount = $('.selected');
		var newCount = $('#team8');
		selectedCount.removeClass("selected");
		newCount.addClass("selected");
		teamCount = 8;
	})
	$('#team10').click(function(){
		var selectedCount = $('.selected');
		var newCount = $('#team10');
		selectedCount.removeClass("selected");
		newCount.addClass("selected");
		teamCount = 10;
	})
	$('#team12').click(function(){
		var selectedCount = $('.selected');
		var newCount = $('#team12');
		selectedCount.removeClass("selected");
		newCount.addClass("selected");
		teamCount = 12;
	})
	$('#team14').click(function(){
		var selectedCount = $('.selected');
		var newCount = $('#team14');
		selectedCount.removeClass("selected");
		newCount.addClass("selected");
		teamCount = 14;
	})
	$('#rateTeam').click(function(){
		$('#settings').addClass('settingsComplete');
		rateTeam();
	})
	
}





$(document).ready(main);