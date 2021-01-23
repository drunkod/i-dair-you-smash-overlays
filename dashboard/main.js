const teamScores = nodecg.Replicant('playerScores');

teamScores.on('change', newValue => {
	teamAScoreInput.value = newValue.p1;
	teamBScoreInput.value = newValue.p2;
});

teamAPlus.onclick = () => { teamScores.value.p1++; }
teamAMinus.onclick = () => { teamScores.value.p1--; }
teamBPlus.onclick = () => { teamScores.value.p2++; }
teamBMinus.onclick = () => { teamScores.value.p2--; }

teamAScoreInput.oninput = event => { teamScores.value.p2 = Number(event.target.value); }
teamBScoreInput.oninput = event => { teamScores.value.p2 = Number(event.target.value); }

const SBData = nodecg.Replicant('SBData');
const p1NameInput = document.querySelector('#p1NameInput');
const p2NameInput = document.querySelector('#p2NameInput');
const flavorTextInput = document.querySelector('#flavorTextInput');
const scoreboardUpdateBtn = document.querySelector('#scoreboardUpdateBtn');

SBData.on('change', newValue => {
	p1NameInput.value = newValue.p1Info.name;
	p2NameInput.value = newValue.p2Info.name;
	flavorTextInput.value = newValue.flavorText;
});

scoreboardUpdateBtn.onclick = () => {
	SBData.value = {
		flavorText: flavorTextInput.value,
		p1Info: {
			name: p1NameInput.value
		},
		p2Info: {
			name: p2NameInput.value
		}
	};
}

addInputChangeReminder(['p1NameInput', 'p2NameInput', 'flavorTextInput'], scoreboardUpdateBtn);

const nextPlayers = nodecg.Replicant('nextPlayers');
const nextP1NameInput = document.querySelector('#nextP1NameInput');
const nextP2NameInput = document.querySelector('#nextP2NameInput');
const nextPlayerUpdateBtn = document.querySelector('#updateNextPlayers');

nextPlayers.on('change', newValue => {
	nextP1NameInput.value = newValue.p1Info.name;
	nextP2NameInput.value = newValue.p2Info.name;
});

nextPlayerUpdateBtn.onclick = () => {
	nextPlayers.value = {
		p1Info: {
			name: nextP1NameInput.value
		},
		p2Info: {
			name: nextP2NameInput.value
		}
	};
}

addInputChangeReminder(['nextP1NameInput', 'nextP2NameInput'], nextPlayerUpdateBtn);

document.querySelector('#beginNextMatch').onclick = () => {
	SBData.value.p1Info.name = nextP1NameInput.value;
	SBData.value.p2Info.name = nextP2NameInput.value;
	teamScores.value = {
		p1: 0,
		p2: 0
	};
}

const SBShown = nodecg.Replicant('SBShown');
const btnHideScoreboard = document.querySelector('#SBHide');
const btnShowScoreboard = document.querySelector('#SBShow');

btnShowScoreboard.onclick = () => {
	SBShown.value = true;
}

btnHideScoreboard.onclick = () => {
	SBShown.value = false;
}

SBShown.on('change', newValue => {
	setToggleButtonDisabled(
		btnShowScoreboard,
		btnHideScoreboard,
		newValue
	);
});

const casterNames = nodecg.Replicant('casterNames');
const casterInput = document.querySelector('#casterNameInput');
const btnCasterUpdate = document.querySelector('#updateCasters');

casterNames.on('change', newValue => {
	casterInput.value = newValue;
});

btnCasterUpdate.onclick = () => {
	casterNames.value = casterInput.value;
}

document.querySelector('#showCasters').onclick = () => {
	nodecg.sendMessage('mainShowCasters');
}

addInputChangeReminder(['casterNameInput'], btnCasterUpdate);
