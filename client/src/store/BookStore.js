import {makeAutoObservable} from 'mobx';

export class BookStore {
    constructor() {
        this._books = []
        this._search = ''
        this._limit = 5
        this._page = 1
        this._totalCount = 0
        this._selectedGenreIds = []
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

    get selectedGenreIds() {
        return this._selectedGenreIds;
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

    set selectedGenreIds(value) {
        this._selectedGenreIds = value;
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