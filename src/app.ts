import "reflect-metadata"
import {Container} from "inversify";
import {CustomerManager} from "./channel-manager/customer-manager";
import {CustomerManagerInterface} from "./channel-manager/customer-manager.interface";
import {DI} from "./DI";
import {CustomerManager} from "./customer-manager/customer-manager";
import {CustomerManagerInterface} from "./customer-manager/customer-manager.interface";



const appContainer = new Container()
appContainer.bind<CustomerManagerInterface>(DI.CustomerManager).to(CustomerManager)
const app = appContainer.get<CustomerManagerInterface>(DI.CustomerManager)
const res = app.addChannels([1,2,3,4])
console.log(res)
export {appContainer}