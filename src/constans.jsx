import circule from "./assets/circle-regular.svg";
import xmark from "./assets/xmark-solid.svg";
import otter from "./assets/otter-solid.svg";
import paw from "./assets/paw-solid.svg";
import fish from "./assets/fish-solid.svg";
import feather from "./assets/feather-solid.svg";
import crow from "./assets/crow-solid.svg";
import dove from "./assets/dove-solid.svg";
import frog from "./assets/frog-solid.svg";
import locust from "./assets/locust-solid.svg";
import horse from "./assets/horse-solid.svg";
import worm from "./assets/worm-solid.svg";
import dragon from "./assets/dragon-solid.svg";
import dog from "./assets/dog-solid.svg";
import hippo from "./assets/hippo-solid.svg";
import bicycle from "./assets/bicycle-solid.svg";
import kiwi from "./assets/kiwi-bird-solid.svg";
import paperplain from "./assets/paper-plane-solid.svg";
import umbrella from "./assets/umbrella-solid.svg";
import camera from "./assets/camera-retro-solid.svg";

export const marks = [
	xmark,
	circule,
	otter,
	paw,
	fish,
	feather,
	crow,
	dove,
	frog,
	locust,
	horse,
	worm,
	kiwi,
	dragon,
	dog,
	hippo,
	bicycle,
	paperplain,
	umbrella,
	camera,
];
//export const marks = [ xmark, circule, otter, paw, fish, feather]

export const WINNER_COMBOS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

export const TURNS = {
	x: marks[0],
	o: marks[1],
};
