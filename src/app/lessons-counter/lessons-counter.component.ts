import { Component } from '@angular/core';

import {
    ADD_NEW_LESSON,
    globalEventBus,
    IObserver,
    LESSONS_LIST_AVAILABLE
} from '../event-bus-experiments/event-bus';
import { ILesson } from '../shared/model/lesson';

@Component({
    selector: 'lessons-counter',
    templateUrl: './lessons-counter.component.html',
    styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements IObserver {

    lessonsCounter = 0;

    constructor() {
        console.log('LessonsCounterComponent is registered as observer ...');
        globalEventBus.registerObserver(LESSONS_LIST_AVAILABLE, this);

        globalEventBus.registerObserver(ADD_NEW_LESSON, {
            notify: lessonText => this.lessonsCounter += 1
        });
    }

    notify(data: ILesson[]) {
        console.log('LessonsCounterComponent received data ...');
        this.lessonsCounter = data.length;
    }

}
