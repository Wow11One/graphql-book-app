import {makeAutoObservable} from 'mobx';

export class BookStore {
    constructor() {
        this._books = []
        this._search = ''
        this._limit = 9
        this._page = 1
        this._totalCount = 0
        this._genreIds = []
        this._author = {}
        this._genres = []
        makeAutoObservable(this);
    }

    get books() {
        return this._books;
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

    get genreIds() {
        return this._genreIds;
    }

    get author() {
        return this._author;
    }

    get genres() {
        return this._genres;
    }

    set genres(value) {
        this._genres = value;
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

    set genreIds(value) {
        this._genreIds = value;
    }

    set author(value) {
        this._author = value;
    }

    set search(value) {
        this._search = value;
    }

    set books(value) {
        this._books = value;
    }
}