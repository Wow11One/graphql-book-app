import {makeAutoObservable} from 'mobx';

export class AuthorStore {
    constructor() {
        this._authors = [];
        this._search = '';
        this._limit = 9;
        this._page = 1;
        this._totalCount = 0;
        makeAutoObservable(this);
    }

    set authors(value) {
        this._authors = value;
    }

    set search(value) {
        this._search = value;
    }

    set limit(value) {
        this._limit = value;
    }

    set page(value) {
        this._page = value;
    }

    set totalCount(value) {
        this._totalCount = value;
    }

    get authors() {
        return this._authors;
    }

    get search() {
        return this._search;
    }

    get limit() {
        return this._limit;
    }

    get page() {
        return this._page;
    }

    get totalCount() {
        return this._totalCount;
    }
}