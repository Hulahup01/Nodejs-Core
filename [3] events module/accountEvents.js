const EventEmitter = require('events');

class AccountEvents extends EventEmitter {
    constructor() {
        super();
        this.on('userRegistered', this.sendUserRegistrationEmail);
        this.on('userLoggedIn', this.sendUserLoginNotification);
        this.on('passwordChanged', this.sendPasswordChangeEmail);
    }

    userRegistered(user) {
        this.emit('userRegistered', user);
    }

    userLoggedIn(user) {
        this.emit('userLoggedIn', user);
    }

    passwordChanged(user) {
        this.emit('passwordChanged', user);
    }

    sendUserRegistrationEmail(user) {
        console.log(`Sending mail to ${user.email} about registrtion.`);
    }

    sendUserLoginNotification(user) {
        console.log(`User ${user.email} enter.`);
    }

    sendPasswordChangeEmail(user) {
        console.log(`Sending mail to ${user.email} about password changing.`);
    }
}


const accountEvents = new AccountEvents();

const user = {
    email: 'johndoe@aboba.com'
};

accountEvents.userRegistered(user);
accountEvents.userLoggedIn(user);
accountEvents.passwordChanged(user);
