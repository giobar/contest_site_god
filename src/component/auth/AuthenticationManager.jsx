import { Auth } from "aws-amplify";

const AuthenticationManager = {
    signIn: async function SignIn(username, password) {
        try {
            const user = await Auth.signIn(username, password);
            console.log(user)
            return "ok"
        } catch (err) {
            if (err.code === 'UserNotConfirmedException') {
                console.log('UserNotConfirmedException')
                return "Utente non confermato";
            } else if (err.code === 'PasswordResetRequiredException') {
                console.log('PasswordResetRequiredException')
                return "Effettuare reset della password";
            } else if (err.code === 'NotAuthorizedException') {
                console.log('NotAuthorizedException')
                return "Password Errata";
            } else if (err.code === 'UserNotFoundException') {
                console.log('UserNotFoundException')
                return "Utente non presente";
            } else {
                console.log(err);
                return err.message;
            }
        }
    },

    signUp: async function signUp(username, password, email) {
        const c = await Auth.signUp({
            username,
            password,
            attributes: {
                email
            },
            validationData: []  //optional
        })
            .then(data => { return data })
            .catch(err => { return err });
        console.log(c)
        if (c.message) {
            if (c.message.includes("password")) {
                return "Password non valida..Minimo 6 Caratteri"
            }
            if (c.message.includes("email")) {
                return "Email formato non valido"
            }
            return c.message
        }
        return "ok"
    },
    confirmSignUp: async function confirmSignUp(username, code) {
        Auth.confirmSignUp(username, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true
        }).then(data => console.log(data))
            .catch(err => console.log(err));
    },
    resendCodeSignUp: async function resendCodeSignUp(username) {
        Auth.resendSignUp(username).then(() => {
            console.log('code resent successfully');
        }).catch(e => {
            console.log(e);
        });
    },

    isLoggedIn : function isLoggedIn(callBackFunction){
        Auth.currentAuthenticatedUser().then(user => {
            callBackFunction(user)
          }).catch(e => {
            console.log(e);
            callBackFunction("Error")
          });
    }
}
export default AuthenticationManager;