import { Controller } from '@hotwired/stimulus';
import {Howl, Howler} from 'howler';
/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {
    static targets = ['playlist', 'stop','play'];
    static values = {
        startingTrack: String,
    }
    // ...

    connect() {
        console.log(this.startingTrackValue);
        // super.connect();
        // https://github.com/goldfire/howler.js#documentation
        this.sound = new Howl({
            src: [this.startingTrackValue],
            onplay: (id) => console.log('playing ' + id),
            onstop: (id) => console.log('Stopping ' + id)
        });
        this.stopTarget.hidden=true;
        // sound.onplay((id) => console.log('playing ' + id));
        // sound.onstop((id) => console.log('Stopping ' + id));
    }

    toggle(e) {
        console.log(e);
        if (this.sound.playing()) {

            this.sound.pause();
            this.playTarget.hidden=false;
            this.stopTarget.hidden=true;
        } else {
            this.sound.play();
            this.playTarget.hidden=true;
            this.stopTarget.hidden=false;
        }
        // if playing, stop...
    }
    play() {
        console.log(this.sound.playing());
        this.sound.play();
        this.playTarget.hidden=true;
        this.stopTarget.hidden=false;
    }
    stop() {
        this.sound.stop();
        this.playTarget.hidden=false;
        this.stopTarget.hidden=true;
    }
}
