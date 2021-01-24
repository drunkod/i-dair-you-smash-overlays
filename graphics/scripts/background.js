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

makeParticles(5);

function makeParticleAnim(id) {
	// Animate particle with random position and size
	let size = getRandomInt(100, 500);
	let particle = document.querySelector(`#${id}`);
	particle.style.width = size + 'px';
	particle.style.height = size + 'px';
	particle.style.left = getRandomInt(100, 1820) + 'px';
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