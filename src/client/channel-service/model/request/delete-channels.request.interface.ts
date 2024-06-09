


interface UserChannelInterface {
    userChannel :  {
        id : number
    }
}
export interface DeleteChannelsRequestInterface {
    user : {
        id : number,
        userChannels  : UserChannelInterface[]
    }
}