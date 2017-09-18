/**
 * Created by gmena on 08-17-17.
 */

const FORMS = {

    login_user: {
        inputs: [{
            type: 'text',
            placeholder: "e-mail",
            autoComplete: 'nope',
            name: "email",
            icon: 'icon-email',
            size: 'm12 l12',
            required: true
        }, {
            type: 'password',
            placeholder: "password",
            autoComplete: 'nope',
            name: "password",
            icon: 'icon-dial-pad',
            size: 'm12 l12',
            required: true
        }],
        buttons: [{
            type: 'submit',
            text: 'login',
            size: 'm6 l6'
        }]
    }
};

//Export forms
export default FORMS;