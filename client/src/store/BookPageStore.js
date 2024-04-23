import {makeAutoObservable} from 'mobx';

export class BookPageStore {
    constructor() {
        this.init()
        makeAutoObservable(this);
    }

    init() {
        this._title = ''
        this._publicationYear = 1800
        this._publicationHouse = ''
        this._language = ''
        this._image = null
        this._author = {}
        this._genre = {}
        this._id = null
        this._isLiked = false
    }

    set title(value) {
        this._title = value;
    }

    set publicationYear(value) {
        this._publicationYear = value;
    }

    set publicationHouse(value) {
        this._publicationHouse = value;
    }

    set language(value) {
        this._language = value;
    }

    set image(value) {
        this._image = value;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        this._author = value;
    }

    set genres(value) {
        this._genres = value;
    }

    set id(value) {
        this._id = value;
    }

    get id() {
        return this._id;
    }


    get genres() {
        return this._genres;
    }

    get genre() {
        return this._genre;
    }

    get isLiked() {
        return this._isLiked
    }

    set isLiked(value) {
        this._isLiked = value
    }

    set genre(value) {
        this._genre = value;
    }

    get title() {
        return this._title;
    }

    get publicationYear() {
        return this._publicationYear;
    }

    get publicationHouse() {
        return this._publicationHouse;
    }

    get language() {
        return this._language;
    }

    get image() {
        return this._image;
    }
}
