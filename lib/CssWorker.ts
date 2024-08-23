
export class CssWorker {
    className: string;
    blob_url: string;
    style_name: string;
    constructor({className, blob_url, style_name}:{className:string, blob_url:string, style_name: string}) {
        this.style_name = style_name;
        this.className = className;
        this.blob_url = blob_url;
    }
}