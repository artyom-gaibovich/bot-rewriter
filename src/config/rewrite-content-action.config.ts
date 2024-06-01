export class RewriteContentActionConfig {
    constructor(private readonly url : string) {
        this.url = url
    }
    getUrl() {
        return this.url
    }
}