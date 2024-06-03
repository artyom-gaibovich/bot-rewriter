import {LinkModel} from "../../model/link.model";
import {Injectable} from "@nestjs/common";

@Injectable()
export class RewriteContentActionConfig {
    constructor(private readonly link : LinkModel) {
    }
    get() : LinkModel {
        return this.link
    }
}