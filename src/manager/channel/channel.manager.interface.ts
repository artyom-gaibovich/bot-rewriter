import {UserInterface} from "../../model/user.interface";

export interface ChannelManagerInterface {
    addChannel(user : UserInterface) : Promise<UserInterface>
    deleteChannel(user : UserInterface) : Promise<UserInterface>
    deleteChannelToRewrite(user : UserInterface) : Promise<UserInterface>
}