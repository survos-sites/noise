console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉')

import './bootstrap.js'; // stimulus
import { version } from "./js/app-info.js";

import 'bootstrap';d
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './styles/app.css'
import 'side-drawer';
import 'wc-menu-button';

// sidebar and menu
// const version_div = document.getElementById("version");
// version_div.innerText = `v${version}`;

/**
 * @type Element
 */
const menuButton = document.getElementById("menu-button");

/**
 * @type Element
 */
// const drawer = document.getElementById("drawer");
//
// // side drawer setup
// menuButton.addEventListener("opened", (ev) => {
//     drawer.open = true;
// });
// drawer.addEventListener("open", (ev) => {
//     menuButton.open = true;
// });
// drawer.addEventListener("close", (ev) => {
//     menuButton.open = false;
// });
//

