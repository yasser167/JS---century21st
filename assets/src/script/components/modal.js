import API from "./api";

export default class Modal {
    constructor( cardAttr ) {
        this.body = document.querySelector('body');
        this.modalDOM = document.querySelector(`.modal`);
        this.modalCard = document.querySelectorAll('[modal_card]');
        this.modalClose = document.querySelector('.modal-close-button');
        this.openModal( cardAttr );
        this.closeModal();
    }

    openModal( cardAttr ) {
        let body = this.body;
        let isMobile = body.classList.contains('--mobile') ? true : false;
        this.fetchOneComment( cardAttr.id );
    }

    fetchOneComment( id ) {
        fetch( API.oneComment.replace('id', id) )
        .then( (res) => {
            res.json( res ).then( (comment ) => {
                console.log( comment );
                this.modalDOM.querySelector(".comment-title").innerHTML = comment.title;
                this.modalDOM.querySelector(".comment-desc").innerHTML = comment.content;
                this.modalDOM.querySelector(".comment-video").setAttribute('src', comment.video);
                if( comment.video !== undefined ) {
                    this.modalDOM.querySelector(".comment-video").classList.remove('hidden');
                } else {
                    this.modalDOM.querySelector(".comment-video").classList.add('hidden');
                }

                document.querySelector(`.modal`).classList.add('--open');
            })
        })
        .catch( (err) => {
            this.modalDOM.querySelector(".comment-title").innerHTML = err;
        })
    }

    closeModal() {
        this.modalClose.addEventListener('click', (ev) => {
            let current = ev.currentTarget;
            document.querySelector(`.modal`).classList.remove('--open');
        })
    }
}