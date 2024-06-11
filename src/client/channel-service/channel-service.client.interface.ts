
//http://localhost:8080/api/v1/user/create
//http://localhost:8080/api/v1/channel/add
//http://localhost:8080/api/v1/user/delete
//http://localhost:8080/api/v1/channel/delete
//http://localhost:8080/api/v1/channel/delete/channel-to-rewrite
//http://localhost:8080/api/v1/user/get
export interface ChannelServiceClientInterface {
    createUser()
    getUser()
    deleteUser()
    addChannel()
    deleteChannel()
    deleteChannelToRewrite()


}