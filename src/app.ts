import "reflect-metadata"

interface UserServiceInterface {
    users : number;
    getUsersInDatabase() : number
}


export class UserService implements UserServiceInterface {
    users : number = 1000;
    getUsersInDatabase(): number {
        return this.users
    }
}

function nullUser(obj: UserServiceInterface) {
    obj.users = 0
    return obj
}

