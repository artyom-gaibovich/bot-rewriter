import "reflect-metadata"
import {Container} from "inversify";
import {CustomerManager} from "./channel-manager/customer-manager";
import {CustomerManagerInterface} from "./channel-manager/customer-manager.interface";
import {DI} from "./DI";
import {ChannelManager} from "./customer-manager/channel-manager";
import {ChannelManagerInterface} from "./customer-manager/channel-manager.interface";



const appContainer = new Container()
appContainer.bind<ChannelManagerInterface>(DI.CustomerManager).to(ChannelManager)
const app = appContainer.get<CustomerManagerInterface>(DI.CustomerManager)
const res = app.addChannels([1,2,3,4])
console.log(res)
export {appContainer}