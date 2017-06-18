export const LESSONS_LIST_AVAILABLE = 'NEW_LIST_AVAILABLE';
export const ADD_NEW_LESSON = 'ADD_NEW_LESSON';

export interface IObserver {
    notify(data: any);
}

interface ISubject {
    registerObserver(eventType: string, obs: IObserver);
    unregisterObserver(eventType: string, obs: IObserver);
    notifyObservers(eventType: string, data: any);
}

class EventBus implements ISubject {

    private observers = new Map<string, Set<IObserver>>();

    registerObserver(eventType: string, obs: IObserver) {
        this.observersPerEventType(eventType).add(obs);
    }

    unregisterObserver(eventType: string, obs: IObserver) {
        this.observersPerEventType(eventType).delete(obs);
    }

    notifyObservers(eventType: string, data: any) {
        this.observersPerEventType(eventType).forEach(obs => obs.notify(data));
    }

    private observersPerEventType(eventType: string): Set<IObserver> {
        if (!this.observers.has(eventType)) {
            this.observers.set(eventType, new Set<IObserver>());
        }
        return this.observers.get(eventType);
    }
}

export const globalEventBus = new EventBus();
