import * as _ from 'lodash';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { ILesson } from '../shared/model/lesson';

class DataStore {

    private lessonsListSubject = new BehaviorSubject([]);

    public lessonsList$: Observable<ILesson[]> = this.lessonsListSubject.asObservable();

    initializeLessonsList(newList: ILesson[]) {
        this.lessonsListSubject.next(_.cloneDeep(newList));
    }

    addLesson(lesson: ILesson) {
        const lessons = this.cloneLessons();
        lessons.push(_.cloneDeep(lesson));
        this.lessonsListSubject.next(lessons);
    }

    deleteLesson(deletedLesson: ILesson) {
        const lessons = this.cloneLessons();
        _.remove(lessons, (lesson) => lesson.id === deletedLesson.id);
        this.lessonsListSubject.next(lessons);
    }

    toggleLessonViewed(toggled: ILesson) {
        const lessons = this.cloneLessons();
        const toggledLesson = _.find(lessons, (lesson) => lesson.id === toggled.id);
        toggledLesson.completed = !toggledLesson.completed;
        this.lessonsListSubject.next(lessons);
    }

    private cloneLessons() {
        return _.cloneDeep(this.lessonsListSubject.getValue());
    }
}

export const store = new DataStore();
