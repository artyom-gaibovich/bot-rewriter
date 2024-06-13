import {LinkValidatorInterface} from "./link.validator.interface";
import {LinkInterface} from "../model/link/link.interface";
import {Injectable} from "@nestjs/common";
@Injectable()
export class LinkValidator implements LinkValidatorInterface {
    validate(link: LinkInterface): boolean {
        return link.link.startsWith('https://');
    }
}