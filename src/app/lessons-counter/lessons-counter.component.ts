import { Component } from '@angular/core';
import { ILesson } from '../shared/model/lesson';
import { IObserver, store } from '../event-bus-experiments/app-data';

@Component({
    selector: 'lessons-counter',
    templateUrl: './lessons-counter.component.html',
    styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements IObserver {

    lessonsCounter = 0;

    constructor() {
        console.log('LessonsCounterComponent is registered as observer ...');

        store.lessonsList$.subscribe(this);
    }

    next(data: ILesson[]) {
        console.log('LessonsCounterComponent received data ...');
        this.lessonsCounter = data.length;
    }

}
