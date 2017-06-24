import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs/Observer';

import { ILesson } from '../shared/model/lesson';
import { store } from '../event-bus-experiments/app-data';

@Component({
    selector: 'lessons-counter',
    templateUrl: './lessons-counter.component.html',
    styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements Observer<ILesson[]>, OnInit {

    lessonsCounter = 0;

    ngOnInit(): void {
        console.log('LessonsCounterComponent is registered as observer ...');
        store.lessonsList$.subscribe(this);
    }

    next(data: ILesson[]) {
        console.log('LessonsCounterComponent received data ...');
        this.lessonsCounter = data.length;
    }

    error(err: any) {
        console.error(err);
    }

    complete() {
        console.log('completed');
    }

}
