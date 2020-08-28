const UI = require('./iu');
const Github = require('./github');

const {
    client_id,
    client_secret
} = require('./config.json');

//crear un nuevo objeto
const github = new Github(client_id, client_secret); //datos para buscar en la api
const ui = new UI();

const userForm = document.getElementById('userForm');
userForm.addEventListener('submit', (e) => {
    const textSearch = document.getElementById('textSearch').value;
    //input entero --> quiero su valor por eso value
    if (textSearch !== '') { //distinto a vacío
        github.fetchUser(textSearch) //obtienes el id busca lo que yo pedi fletch -> promesa
            //nombre al evento --> me retorna un objeto
            .then(data => { //
                if (data.userData.message === 'Not Found') {
                    ui.showMessage('User not found', 'alert alert-danger mt-2 col-md-12')

                } else {
                    ui.showProfile(data.userData); //método donde mando datos
                    ui.showRepositories(data.repositories);
                }
            })
    }
    e.preventDefault();
});