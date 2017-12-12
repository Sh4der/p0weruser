export default class UserFavorites {
    constructor() {
        this.name = 'Benutzer Favoriten';
        this.description = 'Markiere Benutzer als Favoriten und bleibe auf dem Laufenden.'
    }


    load() {
        this.styles = require('../style/userFavorites.less');
    }
}
