# i-dair-you-smash-overlays

A [NodeCG](http://github.com/nodecg/nodecg) bundle.

## Install

- Install [git](http://git-scm.com/)

- Install [node.js](https://nodejs.org/dist/latest-v12.x/) (Version 12 was used for development.)

- Install [nodecg-cli](https://github.com/nodecg/nodecg-cli) using `npm`: `npm install -g nodecg-cli`

- Install `nodecg` in a new folder:

```shell
mkdir nodecg
cd nodecg
nodecg setup
```

- Install the overlays: `nodecg install inkfarer/i-dair-you-smash-overlays`

- (Optional) Create the configuration file in `[nodecg root]/cfg/i-dair-you-smash-overlays.json` with the following contents:

```json
{
	"lastfm": {
		"targetAccount": "Your Last.fm account name",
		"apiKey": "Your last.fm API key",
		"secret": "Your last.fm API secret"
	}
}
```

- Start nodecg using the `nodecg start` command in the folder you installed NodeCG in.

- Access the dashboard from `http://localhost:9090/` in your browser.

- Access the graphics from the "Graphics" tab in the dashboard. They are made to be used as browser sources in your preferred broadcast application, with a resolution of 1920x1080.
