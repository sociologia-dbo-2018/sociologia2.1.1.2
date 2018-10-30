console.log('JavaScript up and running');

import {db, provider, auth} from './fb.js';

const mensagens = db.ref('/mensagens');

const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const mensagem = form.mensagem.value;
    console.log(mensagem);
    // salvar firebase
    mensagens.push({mensagem, autor: 'Cazz'});

    form.mensagem.value = '';
    form.mensagem.focus();
});

document.addEventListener('DOMContentLoaded', function(e) {
    const ul = document.querySelector('div#mensagens ul');

    mensagens.on('child_added', function(msg) {
        const li = document.createElement('li');
        li.textContent = msg.val().mensagem;
        li.dataset['key'] = msg.key;
        li.className = 'mt-2';
        ul.appendChild(li);
        // ul.innerHTML += `<br>${msg.val().mensagem}`;
        const bt = document.createElement('button');
        bt.textContent = 'X';
        bt.className = 'btn btn-danger ml-2';
        li.appendChild(bt);
    });

    mensagens.on('child_removed', function(msg) {
        const key = msg.key;
        const li = document.querySelector(`li[data-key=${key}]`);
        li.remove();
    });

    ul.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            // e.target === BUTTON
            // e.target.parentElement === LI
            // e.target.parentElement.dataset['key'] === <li data-key='KEY'...
            const key = e.target.parentElement.dataset['key'];
            const msg = db.ref(`/mensagens/${key}`);
            msg.remove();

            // SÓ REMOVE LOCALMENTE
            // e.target.parentElement.remove();
        }
    });
});

const btlogin = document.querySelector('button#login');

btlogin.addEventListener('click', function(e) {
    auth.signInWithPopup(provider).then(function(result) {
        // document.querySelector('div.usuario').textContent =
        //     JSON.stringfy(result.user);
        document.querySelector('div.usuario')
            .textContent = ` Logado como ${result.user.displayName}`;
    }).catch(function(error) {
        console.error(error);
    });
});
