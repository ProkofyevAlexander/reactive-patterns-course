import * as _ from 'lodash';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { ILesson } from '../shared/model/lesson';

class DataStore {

    private lessons: ILesson[] = [];

    private lessonsListSubject = new BehaviorSubject([]);

    public lessonsList$: Observable<ILesson[]> = this.lessonsListSubject.asObservable();

    initializeLessonsList(newList: ILesson[]) {
        this.lessons = _.cloneDeep(newList);
        this.broadcast();
    }

    addLesson(lesson: ILesson) {
        this.lessons.push(_.cloneDeep(lesson));
        this.broadcast();
    }

    deleteLesson(deletedLesson: ILesson) {
        _.remove(this.lessons, (lesson) => lesson.id === deletedLesson.id);
        this.broadcast();
    }

    toggleLessonViewed(toggled: ILesson) {
        const toggledLesson = _.find(this.lessons, (lesson) => lesson.id === toggled.id);
        toggledLesson.completed = !toggledLesson.completed;
        this.broadcast();
    }

    private broadcast() {
        this.lessonsListSubject.next(_.cloneDeep(this.lessons));
    }
}

export const store = new DataStore();
