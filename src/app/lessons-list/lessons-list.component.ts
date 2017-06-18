import { Component } from '@angular/core';

import {
    ADD_NEW_LESSON,
    globalEventBus,
    IObserver,
    LESSONS_LIST_AVAILABLE
} from '../event-bus-experiments/event-bus';
import { ILesson } from '../shared/model/lesson';

@Component({
    selector: 'lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements IObserver {

    public lessons: ILesson[] = [];

    constructor() {
        console.log('LessonsListComponent is registered as observer ...');
        globalEventBus.registerObserver(LESSONS_LIST_AVAILABLE, this);

        globalEventBus.registerObserver(ADD_NEW_LESSON, {
            notify: lessonText => {
                this.lessons.push({
                    id: Math.random(),
                    description: lessonText
                })
            }
        } );
    }

    notify(data: ILesson[]) {
        console.log('LessonsListComponent received data ...');
        this.lessons = data;
    }

    toggleLessonViewed(lesson: ILesson) {
        console.log('toggling lesson ...');
        lesson.completed = !lesson.completed;
    }
}
