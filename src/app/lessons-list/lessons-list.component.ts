import { Component, OnInit } from '@angular/core';

import { Observer } from 'rxjs/Observer';

import { ILesson } from '../shared/model/lesson';
import { store } from '../event-bus-experiments/app-data';

@Component({
    selector: 'lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer<ILesson[]>, OnInit {

    public lessons: ILesson[] = [];

    ngOnInit() {
        store.lessonsList$.subscribe(this);
    }

    next(data: ILesson[]) {
        console.log('LessonsListComponent received data ...');
        this.lessons = data;
    }

    error(err: any) {
        console.error(err);
    }

    complete() {
        console.log('completed');
    }

    toggleLessonViewed(lesson: ILesson) {
        console.log('toggling lesson ...');
        store.toggleLessonViewed(lesson);
    }

    delete(lesson: ILesson) {
        store.deleteLesson(lesson);
    }
}
