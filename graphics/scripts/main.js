// Team Scores

const playerScores = nodecg.Replicant('playerScores');

playerScores.on('change', newValue => {
	document.querySelector('#p1Score').setAttribute('text', newValue.p1);
	document.querySelector('#p2Score').setAttribute('text', newValue.p2);
});

// Scoreboard data

const SBData = nodecg.Replicant('SBData');

SBData.on('change', newValue => {
	document.querySelector('#p1Name').setAttribute('text', newValue.p1Info.name);
	document.querySelector('#p2Name').setAttribute('text', newValue.p2Info.name);

	document.querySelector('.flavor-text fitted-text').setAttribute('text', newValue.flavorText);
});

// Show/hide scoreboard

const SBShown = nodecg.Replicant('SBShown');

SBShown.on('change', newValue => {
	const opacity = newValue ? 1 : 0;

	gsap.to('.scoreboard-wrapper > .background-wrapper > .background', {duration: 0.3, opacity: opacity});
});

// Caster names

const casterNames = nodecg.Replicant('casterNames');

casterNames.on('change', newValue => {
	let nameArray = newValue.split('&');
	let bg = document.querySelector('.casters-background');
	bg.innerHTML = '';

	nameArray.forEach(name => {
		var elem = document.createElement('fitted-text');
		var htmlText = name.replace(/\[\[/g, '<span class="pronoun">').replace(/\]\]/g, '</span>');
		elem.setAttribute('text', htmlText);
		elem.setAttribute('max-width', '230');
		elem.setAttribute('align', 'left');
		elem.setAttribute('useInnerHTML', '');
		
		bg.appendChild(elem);
	});
});

// Caster name animation

nodecg.listenFor('mainShowCasters', () => {
	gsap.fromTo('.casters-wrapper', {opacity: 0, y: -25}, {duration: 0.5, y: 0, opacity: 1, ease: 'power2.out'});
	gsap.to('.casters-wrapper', {duration: 0.5, y: 25, opacity: 0, delay: 14.5, ease: 'power2.in'});
});
