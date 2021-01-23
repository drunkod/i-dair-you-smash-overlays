// Main scene

function animSetText(newText, elem, icon) {
	gsap.to([elem, elem.parentNode.querySelector('.icon'), icon], {opacity: 0, duration: 0.33, onComplete: () => {
		elem.setAttribute('text', newText);
	}});
	gsap.to([elem, elem.parentNode.querySelector('.icon'), icon], {opacity: 1, duration: 0.33, delay: 0.33});
}

const nowPlaying = nodecg.Replicant('nowPlaying');
const nowPlayingManual = nodecg.Replicant('nowPlayingManual');
const mSongEnabled = nodecg.Replicant('mSongEnabled');

function checkStringEmpty(string) {
	string = String(string);
	return (string === 'undefined' || string === '');
}

function setSongText(rep) {
	const icon = document.querySelector('.text-container-music > .icon');
	animSetText(checkStringEmpty(rep.artist) ? '???' : rep.artist, document.querySelector('#main-artist'), icon);
	animSetText(checkStringEmpty(rep.song) ? '???' : rep.song, document.querySelector('#main-song'), icon);
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

const mainFlavorText = nodecg.Replicant('mainFlavorText');

mainFlavorText.on('change', newValue => {
	animSetText(newValue, document.querySelector('#main-flavor'));
});

const casterNames = nodecg.Replicant('casterNames');

casterNames.on('change', newValue => {
	let finalElem = newValue.replace(/\[\[/g, '<span class="pronoun">').replace(/\]\]/g, '</span>');
	animSetText(finalElem, document.querySelector('#main-casters'));
});

const musicShown = nodecg.Replicant('musicShown');

musicShown.on('change', newValue => {
	const height = newValue ? 104 : 0;
	const opacity = newValue ? 1 : 0;
	
	gsap.to('.text-container-music', {height: height, opacity: opacity, ease: 'power2.inOut', duration: 0.5});
});

const breakNextPlayersShown = nodecg.Replicant('breakNextPlayersShown');

breakNextPlayersShown.on('change', newValue => {
	const height = newValue ? 64 : 0;
	const opacity = newValue ? 1 : 0;
	const margin = newValue ? 25 : 0;

	gsap.to('.text-container-players', {height: height, opacity: opacity, ease: 'power2.inOut', duration: 0.5, marginTop: margin});
});

const nextPlayers = nodecg.Replicant('nextPlayers');

nextPlayers.on('change', newValue => {
	animSetText(`Next up: ${newValue.p1Info.name} vs ${newValue.p2Info.name}`, document.querySelector('#main-players'));
});

// Particles

function getRandomInt(min, max) {
	return Math.random() * (max - min) + min;
}

function makeParticles(count) {
	// Create particle and animate it
	let container = document.querySelector('.particles');
	for (let i = 0; i < count; i++) {
		let element = document.createElement('div');
		element.classList.add('particle');
		element.id = `particle_${i}`
		container.appendChild(element);
		makeParticleAnim(`particle_${i}`);
	}
}

makeParticles(3);

function makeParticleAnim(id) {
	// Animate particle with random position and size
	let size = getRandomInt(100, 500);
	let particle = document.querySelector(`#${id}`);
	particle.style.width = size + 'px';
	particle.style.height = size + 'px';
	particle.style.left = getRandomInt(300, 1820) + 'px';
	particle.style.opacity = '1';
	particle.style.transform = 'translate3d(0px, 0px, 0px)';
	let animDur = getRandomInt(10, 25);
	let startDelay = getRandomInt(4, 8);
	let opacDelay = animDur - 1.1;
	gsap.fromTo(particle, {opacity: 0.25}, {duration: 1, opacity: 0, delay: opacDelay + startDelay, ease: 'none'});
	gsap.fromTo(particle, {bottom: (size * -1), opacity: 0.25}, {duration: animDur, bottom: 980, ease: 'none', delay: startDelay, onComplete: () => {
		repeatParticleAnim(id);
	}});
}

function repeatParticleAnim(id) {
	makeParticleAnim(id);
}
