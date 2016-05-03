import {Constants} from '../utils/Constants';
import {Observable} from 'rxjs/Rx';

export class UploadService {
    public progress$: any;
    public progress: any;
    public progressObserver: any;
    private serverUrl = Constants.WebAPI;
    constructor() {
        this.progress$ = Observable.create(observer => {
            this.progressObserver = observer
        }).share();
    }

    public makeFileRequest(url: string, params: string[], files: File[]): Observable<any> {
        return Observable.create(observer => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append("file", files[i], files[i].name);
            }
            var token = localStorage.getItem(Constants.TokenName);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                console.log("Nuotraukos progresas:", this.progress);
                //this.progressObserver.next(this.progress);
            };

            xhr.open('POST', this.serverUrl + url, true);
            xhr.setRequestHeader(Constants.TokenHeaderName, Constants.TokenType + token);
            xhr.send(formData);
        });
    }
}
