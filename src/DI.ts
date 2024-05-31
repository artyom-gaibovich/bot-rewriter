import {ChooseChannelAction} from "./customer-manager/actions/choose-channel/choose-channel.action";
import {RewriteContentActionConfig} from "./config/rewrite-content-action.config";

export const DI = {
    CustomerManager : Symbol('CustomerManager'),
    ChannelRepository : Symbol('ChannelRepository'),
    ChooseChannelAction : Symbol('ChooseChannelAction'),
    RewriteContentActionConfig : Symbol('RewriteContentActionConfig'),
    RewriteContentAction : Symbol(`RewriteContentAction`)
}