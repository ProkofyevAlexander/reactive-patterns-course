import * as _ from 'lodash';
import { ILesson } from '../shared/model/lesson';

export interface IObserver {
    next(data: any);
}

export interface IObservable {
    subscribe(obs: IObserver);
    unsubscribe(obs: IObserver);
}

interface ISubject extends IObserver, IObservable {
}

export class SubjectImplementation implements ISubject {

    private observers = new Set<IObserver>();

    next(data: any) {
        this.observers.forEach((obs) => obs.next(data));
    }

    subscribe(obs: IObserver) {
        this.observers.add(obs);
    }

    unsubscribe(obs: IObserver) {
        this.observers.delete(obs);
    }

}

class DataStore implements IObservable {

    private lessons: ILesson[] = [];

    private lessonsListSubject = new SubjectImplementation();

    subscribe(obs: IObserver) {
        this.lessonsListSubject.subscribe(obs);
        obs.next(this.lessons);
    }

    unsubscribe(obs: IObserver) {
        this.lessonsListSubject.unsubscribe(obs);
    }

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
