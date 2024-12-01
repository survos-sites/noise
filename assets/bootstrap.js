import { startStimulusApp } from '@symfony/stimulus-bundle';
import Timeago from 'stimulus-timeago';

const app = startStimulusApp();
app.register('timeago', Timeago);

app.debug = false;
