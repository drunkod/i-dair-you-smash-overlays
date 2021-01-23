const updateBreakTextBtn = document.querySelector('#updateBreakTexts');

const mainFlavorText = nodecg.Replicant('mainFlavorText');
const flavorTextElem = document.querySelector('#flavorInput');

mainFlavorText.on('change', newValue => {
	flavorTextElem.value = newValue;
});

const casterNames = nodecg.Replicant('casterNames');
const casterNameElem = document.querySelector('#castersInput');

casterNames.on('change', newValue => {
	casterNameElem.value = newValue;
});

updateBreakTextBtn.onclick = () => {
	mainFlavorText.value = flavorTextElem.value;
	casterNames.value = casterNameElem.value;
}

addInputChangeReminder(['flavorInput', 'castersInput'], updateBreakTextBtn);

const nextPlayers = nodecg.Replicant('nextPlayers');
const p1NameElem = document.querySelector('#p1NameInput');
const p2NameElem = document.querySelector('#p2NameInput');
const nextPlayerUpdateBtn = document.querySelector('#updateNextPlayers');

nextPlayers.on('change', newValue => {
	p1NameElem.value = newValue.p1Info.name;
	p2NameElem.value = newValue.p2Info.name;
});

nextPlayerUpdateBtn.onclick = () => {
	nextPlayers.value = {
		p1Info: {
			name: p1NameElem.value
		},
		p2Info: {
			name: p2NameElem.value
		}
	};
}

addInputChangeReminder(['p1NameInput', 'p2NameInput'], nextPlayerUpdateBtn);

const breakNextPlayersShown = nodecg.Replicant('breakNextPlayersShown');
const btnShowNextPlayers = document.querySelector('#showNextPlayers');
const btnHideNextPlayers = document.querySelector('#hideNextPlayers');

btnShowNextPlayers.onclick = () => {
	breakNextPlayersShown.value = true;
}

btnHideNextPlayers.onclick = () => {
	breakNextPlayersShown.value = false;
}

breakNextPlayersShown.on('change', newValue => {
	setToggleButtonDisabled(
		btnShowNextPlayers,
		btnHideNextPlayers,
		newValue
	);
});
