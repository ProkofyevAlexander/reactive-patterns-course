import { Component, OnInit } from '@angular/core';
import { ILesson } from '../shared/model/lesson';

import { IObserver, store } from '../event-bus-experiments/app-data';

@Component({
    selector: 'lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements IObserver, OnInit {

    public lessons: ILesson[] = [];

    ngOnInit() {
        store.lessonsList$.subscribe(this);
    }

    next(data: ILesson[]) {
        console.log('LessonsListComponent received data ...');
        this.lessons = data;
    }

    toggleLessonViewed(lesson: ILesson) {
        console.log('toggling lesson ...');
        store.toggleLessonViewed(lesson);
    }

    delete(lesson: ILesson) {
        store.deleteLesson(lesson);
    }
}
