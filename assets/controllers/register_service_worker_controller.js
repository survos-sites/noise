import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    connect() {
        console.log('hello from ' + this.identifier);
        if (navigator.serviceWorker) {
            if (navigator.serviceWorker.controller) {
                // If the service worker is already running, skip to state change
                this.stateChange();
            } else {
                let serviceWorker = navigator.serviceWorker;
                // Register the service worker, and wait for it to become active
                navigator.serviceWorker
                    .register("/sw.js", { scope: "./" })
                    .then(function (reg) {
                        console.log("[Companion]", "Service worker registered!");
                        // console.log(reg);
                    });
                navigator.serviceWorker.addEventListener(
                    "controllerchange",
                    this.controllerChange.bind(this)
                );
                if (serviceWorker) {
                    serviceWorker.addEventListener("statechange", (e) => {
                        this.stateChange.bind(this);
                        // logState(e.target.state);
                    });
                }
            }
        } else {
            console.error('no navigator.serviceWorker');
        }
    }

    controllerChange(event) {
        navigator.serviceWorker.controller.addEventListener(
            "statechange",
            this.stateChange.bind(this)
        );
    }

    stateChange(e) {
        console.log("Service worker State: " + e.target.state);
        // perform any visual manipulations here
    }
}
