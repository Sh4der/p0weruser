import Utils from '../Utils';

export default class UserFavorites {
    constructor() {
        this.name = 'Benutzer Favoriten';
        this.description = 'Markiere Benutzer als Favoriten und bleibe auf dem Laufenden.'
    }


    load() {
        this.styles = require('../style/userFavorites.less');
        this.menuEntry = {};
        this.user = document.getElementById('user-profile-name').href;
        this.user = this.user.substr(this.user.lastIndexOf('/') + 1);

        this.templates = {
            toggle: `<span class="fa fa-star favoriteToggle" title="(De-)Favorisieren"></span>`,
            menuEntry: `<a id="tab-fav" class="head-tab">fav</a>`
        };
        this.userFavorites = window.localStorage.getItem('userFavorites');

        if(! this.userFavorites) {
            window.localStorage.setItem('userFavorites', '[]');
            this.userFavorites = [];
        } else {
            this.userFavorites = JSON.parse(this.userFavorites);
        }

        this.addCommentsListener();
        this.addMenuEntry();
    }


    addCommentsListener() {
        window.addEventListener('pageLoaded', () => {
            let commentUsers = $('.user:not(.user-mark):not([href*="' + this.user + '"])');
            commentUsers.tooltip();

            for(let i = 0; i < commentUsers.length; i++) {
                this.addToggleIcon(commentUsers[i]);
            }
        });
    }


    addMenuEntry() {
        let stalkLink = document.getElementById('tab-stalk');
        this.menuEntry = $(this.templates.menuEntry);

        Utils.insertAfter(this.menuEntry[0], stalkLink);
        console.log(this.menuEntry);
    }


    addToggleIcon(userElement) {
        if(! userElement.nextSibling.classList) {
            Utils.insertAfter($(this.templates.toggle)[0], userElement);
            let toggle = userElement.nextSibling;

            if(this.userFavorites.indexOf(userElement.innerText) !== -1) {
                toggle.classList.add('active');
            }

            toggle.addEventListener('click', () => {
                this.toggleUserFavorite(userElement.innerText);
            });
        }
    }


    toggleUserFavorite(userName) {
        const index = this.userFavorites.indexOf(userName);

        if(index !== -1) {
            this.userFavorites.splice(index, 1);
        } else {
            this.userFavorites.push(userName);
        }

        $('[href*="/' + userName + '"] + .favoriteToggle').toggleClass('active');
        window.localStorage.setItem('userFavorites', JSON.stringify(this.userFavorites));
    }
}
