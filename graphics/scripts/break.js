const DASHBOARD_BUNDLE_NAME = 'ipl-overlay-controls';

// Background

const dotTL = gsap.timeline({repeat: -1});

function generateDots(columns, rows) {
	const elemCount = columns * rows;
	const container = document.querySelector('.background > .dot-grid');

	for (let i = 0; i < elemCount; i++) {
		const dotElem = document.createElement('div');
		dotElem.classList.add('dot');

		container.appendChild(dotElem);
	}

	animateDots();
}

function animateDots() {
	const LARGE_DOT_SIZE = 25;
	const ANIM_LENGTH = 2;

	dotTL.to('.background > .dot-grid > .dot', {
		duration: ANIM_LENGTH,
		width: LARGE_DOT_SIZE,
		height: LARGE_DOT_SIZE,
		ease: 'power2.inOut',
		stagger: {
			each: ANIM_LENGTH / 10,
			from: 'start',
			grid: 'auto',
			yoyo: true,
			repeat: -1,
			repeatDelay: -0.5
		}
	});
}

generateDots(21, 9);

// Switching scenes

const currentBreakScene = nodecg.Replicant('currentBreakScene', DASHBOARD_BUNDLE_NAME);

currentBreakScene.on('change', (newValue, oldValue) => {
	var moveStagesTeamsContents = false;

	if (newValue === 'mainScene' || oldValue === 'mainScene') {
		moveStagesTeamsContents = true;
	}

	var delay = 0.6;

	if (oldValue == 'maps' && newValue == 'nextUp' || oldValue == 'nextUp' && newValue == 'maps') {
		delay = 0.1;
	}

	switch (newValue) {
		case 'mainScene':
			toggleMainScene(true, 0.75);
			toggleStagesScene(false, moveStagesTeamsContents, 0);
			toggleTeamsScene(false, moveStagesTeamsContents, 0);
			return;
		case 'nextUp':
			toggleMainScene(false, 0);
			toggleStagesScene(false, moveStagesTeamsContents, 0);
			toggleTeamsScene(true, moveStagesTeamsContents, delay);
			return;
		case 'maps':
			toggleMainScene(false, 0);
			toggleStagesScene(true, moveStagesTeamsContents, delay);
			toggleTeamsScene(false, moveStagesTeamsContents, 0);
			return;
		default:
			toggleMainScene(true, 0);
			toggleStagesScene(false, moveStagesTeamsContents, 0);
			toggleTeamsScene(false, moveStagesTeamsContents, 0);
	}
});

function toggleMainScene(show, delay = 0) {
	const dotX = show ? 0 : -600;
	const mainX = show ? 0 : -500;
	const sideX = show ? 0 : -1000;
	const mainOpac = show ? 1 : 0;
	const ease = show ? 'power2.out' : 'power2.in';

	gsap.to('.main-scene', {duration: 0.75, x: mainX, opacity: mainOpac, ease: ease, delay: delay});
	gsap.to('.side-logo-img', {duration: 0.75, x: sideX, ease: ease, delay: delay});
	gsap.to('.background > .dot-grid', {duration: 1.25, x: dotX, ease: 'power2.inOut'});
}

function toggleStagesScene(show, moveContents, delay = 0) {
	toggleSecondaryScene('.stages-scene', show, moveContents, delay);
	gsap.set('.stage', {opacity: 1});
}

function toggleTeamsScene(show, moveContents, delay = 0) {
	toggleSecondaryScene('.teams-scene', show, moveContents, delay)
}

function toggleSecondaryScene(scene, show, moveContents, delay) {
	var sceneX = show ? 0 : 500;
	var duration = 0.75;
	const opacity = show ? 1 : 0;
	const ease = show ? 'power2.out' : 'power2.in';

	if (!moveContents) {
		duration = 0.3;
		sceneX = 0;
		gsap.set(scene, {x: 0});
	}

	gsap.to(scene, {duration: duration, opacity: opacity, ease: ease, x: sceneX, delay: delay});
}

// Main scene

function animSetText(newText, elem) {
	gsap.to(elem, {opacity: 0, duration: 0.33, onComplete: () => {
		elem.setAttribute('text', newText);
	}});
	gsap.to(elem, {opacity: 1, duration: 0.33, delay: 0.33});
}

const nowPlaying = nodecg.Replicant('nowPlaying', DASHBOARD_BUNDLE_NAME);
const nowPlayingManual = nodecg.Replicant('nowPlayingManual', DASHBOARD_BUNDLE_NAME);
const mSongEnabled = nodecg.Replicant('mSongEnabled', DASHBOARD_BUNDLE_NAME);

function checkStringEmpty(string) {
	string = String(string);
	return (string === 'undefined' || string === '');
}

function setSongText(rep) {
	animSetText(checkStringEmpty(rep.artist) ? '???' : rep.artist, document.querySelector('#main-artist'));
	animSetText(checkStringEmpty(rep.song) ? '???' : rep.song, document.querySelector('#main-song'));
}

NodeCG.waitForReplicants(nowPlaying, nowPlayingManual, mSongEnabled).then(() => {
	nowPlaying.on('change', newValue => {
		if (!mSongEnabled.value) {
			setSongText(newValue);
		}
	});
	mSongEnabled.on('change', newValue => {
		var value;

		if (newValue) { value = nowPlayingManual.value; }
		else { value = nowPlaying.value; }

		setSongText(value);
	});
	nowPlayingManual.on('change', newValue => {
		if (mSongEnabled.value) {
			setSongText(newValue);
		}
	});
});

const mainFlavorText = nodecg.Replicant('mainFlavorText', DASHBOARD_BUNDLE_NAME);

mainFlavorText.on('change', newValue => {
	animSetText(newValue, document.querySelector('#main-flavor'));
});

const casterNames = nodecg.Replicant('casterNames', 'ipl-overlay-controls');

casterNames.on('change', newValue => {
	let finalElem = newValue.replace(/\[\[/g, '<span class="pronoun">').replace(/\]\]/g, '</span>');
	animSetText(finalElem, document.querySelector('#main-casters'));
});

const musicShown = nodecg.Replicant('musicShown', DASHBOARD_BUNDLE_NAME);

musicShown.on('change', newValue => {
	const height = newValue ? 104 : 0;
	const opacity = newValue ? 1 : 0;
	
	gsap.to('.text-container-music', {height: height, opacity: opacity, ease: 'power2.inOut', duration: 0.5});
});

// Stages

const mapNameToImagePath = {"Ancho-V Games": "S2_Stage_Ancho-V_Games.png",
"Arowana Mall":"S2_Stage_Arowana_Mall.png",
"Blackbelly Skatepark":"S2_Stage_Blackbelly_Skatepark.png",
"Camp Triggerfish":"S2_Stage_Camp_Triggerfish.png",
"Goby Arena":"S2_Stage_Goby_Arena.png",
"Humpback Pump Track":"S2_Stage_Humpback_Pump_Track.png",
"Inkblot Art Academy":"S2_Stage_Inkblot_Art_Academy.png",
"Kelp Dome":"S2_Stage_Kelp_Dome.png",
"MakoMart":"S2_Stage_MakoMart.png",
"Manta Maria":"S2_Stage_Manta_Maria.png",
"Moray Towers":"S2_Stage_Moray_Towers.png",
"Musselforge Fitness":"S2_Stage_Musselforge_Fitness.png",
"New Albacore Hotel":"S2_Stage_New_Albacore_Hotel.png",
"Piranha Pit":"S2_Stage_Piranha_Pit.png",
"Port Mackerel":"S2_Stage_Port_Mackerel.png",
"Shellendorf Institute":"S2_Stage_Shellendorf_Institute.png",
"Shifty Station":"S2_Stage_Shifty_Station.png",
"Snapper Canal":"S2_Stage_Snapper_Canal.png",
"Starfish Mainstage":"S2_Stage_Starfish_Mainstage.png",
"Sturgeon Shipyard":"S2_Stage_Sturgeon_Shipyard.png",
"The Reef":"S2_Stage_The_Reef.png",
"Wahoo World":"S2_Stage_Wahoo_World.png",
"Walleye Warehouse":"S2_Stage_Walleye_Warehouse.png",
"Skipper Pavilion":"S2_Stage_Skipper_Pavilion.png",
"Unknown Map":""};

const maplists = nodecg.Replicant('maplists', DASHBOARD_BUNDLE_NAME);

const currentMaplistID = nodecg.Replicant('currentMaplistID', DASHBOARD_BUNDLE_NAME);

const mapWinners = nodecg.Replicant('mapWinners', DASHBOARD_BUNDLE_NAME);

const SBData = nodecg.Replicant('SBData', DASHBOARD_BUNDLE_NAME);

function createMapListElems(maplist) {
	let stagesGrid = document.querySelector('.stages-grid');
	gsap.to(stagesGrid, {duration: 0.5, opacity: 0, onComplete: function() {
		stagesGrid.innerHTML = '';
		stagesGrid.style.gridTemplateColumns = `repeat(${maplist.length - 1}, 1fr)`;

		let mapsHTML = '';
		let elemWidth = '260';
		let fontSize = '2em';
		let winnerFontSize = '1.7em';

		if (maplist.length === 4) {
			elemWidth = '380';
			stagesGrid.style.width = '1000px';
			winnerFontSize = '2em';
		} else if (maplist.length === 6) {
			elemWidth = '260';
			stagesGrid.style.width = '1400px';
			fontSize = '1.9em;'
			winnerFontSize = '1.9em';
		} else if (maplist.length === 8) {
			elemWidth = '190';
			stagesGrid.style.width = '1700px';
			fontSize = '1.75em';
		}

		for (let i = 1; i < maplist.length; i++) {
			const element = maplist[i];
			let elem = `
			<div class="stage" style="opacity: ${(currentBreakScene.value === 'maps' ? '1' : '0')}">
				<div class="stage-image" style="background-image: url('img/stages/${mapNameToImagePath[element.map]}');">
					<div class="stage-winner" id="stageWinner_${i}" style="opacity: 0; font-size: ${winnerFontSize}"></div>
				</div>
				<div class="stage-info">
					<div class="stage-mode">
						<fitted-text text="${element.mode}" max-width="${elemWidth}" align="center"></fitted-text>
					</div>
					<div class="stage-name" style="font-size: ${fontSize}">${element.map}</div>
				</div>
			</div>`

			mapsHTML += elem;
		}

		stagesGrid.innerHTML = mapsHTML;
		setWinners(mapWinners.value)
	}});

	gsap.to(stagesGrid, {duration: 0.5, opacity: 1, delay: 0.5});
}

// returns true if there is a difference
function compareMapLists(val1, val2) {
	if (val1[0].id !== val2[0].id || val1[0].name !== val2[0].name) return true;
	if (val1.length !== val2.length) return true;
	for (let i = 1; i < val1.length; i++) {
		if (val1[i].map !== val2[i].map || val1[i].mode !== val2[i].mode) return true;
	}
	return false;
}

NodeCG.waitForReplicants(maplists, currentMaplistID, mapWinners, currentBreakScene).then(() => {
	currentMaplistID.on('change', newValue => {
		let maplist = maplists.value.filter(list => list[0].id == newValue)[0];

		createMapListElems(maplist);
	});

	maplists.on('change', (newValue, oldValue) => {
		if (!oldValue) return;
		let newCurrentList = newValue.filter(list => list[0].id == currentMaplistID.value)[0];
		let oldCurrentList = oldValue.filter(list => list[0].id == currentMaplistID.value)[0];

		if (compareMapLists(newCurrentList, oldCurrentList)) {
			createMapListElems(newCurrentList);
		}
	});
});

window.addEventListener('load', () => {
	NodeCG.waitForReplicants(mapWinners, SBData).then(() => {
		mapWinners.on('change', (newValue, oldValue) => {
			setWinners(newValue);
		});

		SBData.on('change', newValue => {
			setWinners(mapWinners.value);

			document.querySelector('#teamAName').setAttribute('text', newValue.teamAInfo.name);
			document.querySelector('#teamBName').setAttribute('text', newValue.teamBInfo.name);
		});
	});
});

function setWinners(val) {
	for (let i = 0; i < val.length; i++) {
		const element = val[i];
		if (element === 0) {
			setWinner(i+1, '', false);
		} else if (element === 1) {
			setWinner(i+1, SBData.value.teamAInfo.name, true);
		} else {
			setWinner(i+1, SBData.value.teamBInfo.name, true);
		}
	}
}

function setWinner(index, name, shown) {
	let winnerElem = document.querySelector(`#stageWinner_${index}`);
	if (!winnerElem) return;
	let opacity;

	if (shown) { opacity = 1; }
	else { opacity = 0 };

	if (shown) {
		winnerElem.innerText = name;
	}

	gsap.to(winnerElem, {opacity: opacity, duration: 0.5});
}

const teamScores = nodecg.Replicant('teamScores', DASHBOARD_BUNDLE_NAME);

teamScores.on('change', newValue => {
	document.querySelector('#teamAScore').setAttribute('text', newValue.teamA);
	document.querySelector('#teamBScore').setAttribute('text', newValue.teamB);
});

/* Teams */

const nextTeams = nodecg.Replicant('nextTeams', 'ipl-overlay-controls');

nextTeams.on('change', newValue => {
	nextTeamAName.setAttribute('text', newValue.teamAInfo.name);
	nextTeamBName.setAttribute('text', newValue.teamBInfo.name);

	teamAplayersBG.innerHTML = '';
	teamBplayersBG.innerHTML = '';

	newValue.teamAInfo.players.forEach(player => {
		const elem = createNextTeamPlayerElem(player.name, 'right', 'a');
		teamAplayersBG.appendChild(elem);
	});

	newValue.teamBInfo.players.forEach(player => {
		const elem = createNextTeamPlayerElem(player.name, 'left', 'b');
		teamBplayersBG.appendChild(elem);
	});
});

function createNextTeamPlayerElem(name, align, team) {
	const elem = document.createElement('fitted-text');
	elem.setAttribute('text', name);
	elem.setAttribute('max-width', '435');
	elem.setAttribute('align', align);
	if (team === 'a') {
		elem.classList.add('nextTeamAPlayer');
	} else {
		elem.classList.add('nextTeamBPlayer');
	}

	return elem;
}
