/**
 * Created by gmena on 08-17-17.
 */

const FORMS = {

    invite_user: {
        inputs: [{
            type: 'text',
            placeholder: "fullname",
            autoComplete: 'nope',
            name: "first_name",
            icon: 'icon-text',
            size: 'm12 l12',
            required: true
        }, {
            type: 'text',
            placeholder: "e-mail",
            autoComplete: 'nope',
            name: "email",
            icon: 'icon-email',
            size: 'm12 l12',
            required: true
        }],
        buttons: [{
            type: 'submit',
            text: 'Invite',
            color: 'orange',
            size: 'm6 l6'
        }]
    },
    user_new_or_update: {
        inputs: [{
            type: 'text',
            placeholder: "first name",
            autoComplete: 'nope',
            name: "displayName",
            icon: 'icon-text',
            size: 'm12 l12',
            required: true
        }, {
            type: 'email',
            placeholder: "e-mail",
            autoComplete: 'nope',
            name: "email",
            icon: 'icon-email',
            //disabled: true,
            size: 'm12 l12',
            required: true
        } /*{
         type: 'password',
         placeholder: "password",
         autoComplete: 'nope',
         name: "password",
         icon: 'icon-dial-pad',
         size: 'm12 l12'
         }*/],
        buttons: [{
            type: 'submit',
            text: 'Update',
            size: 'm6 l6'
        }]
    }
};

//Export forms
export default FORMS;