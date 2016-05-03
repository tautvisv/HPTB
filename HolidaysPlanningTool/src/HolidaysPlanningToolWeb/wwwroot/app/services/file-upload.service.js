"use strict";
var Constants_1 = require('../utils/Constants');
var Rx_1 = require('rxjs/Rx');
var UploadService = (function () {
    function UploadService() {
        var _this = this;
        this.serverUrl = Constants_1.Constants.WebAPI;
        this.progress$ = Rx_1.Observable.create(function (observer) {
            _this.progressObserver = observer;
        }).share();
    }
    UploadService.prototype.makeFileRequest = function (url, params, files) {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append("file", files[i], files[i].name);
            }
            var token = localStorage.getItem(Constants_1.Constants.TokenName);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = function (event) {
                _this.progress = Math.round(event.loaded / event.total * 100);
                console.log("Nuotraukos progresas:", _this.progress);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('POST', _this.serverUrl + url, true);
            xhr.setRequestHeader(Constants_1.Constants.TokenHeaderName, Constants_1.Constants.TokenType + token);
            xhr.send(formData);
        });
    };
    return UploadService;
}());
exports.UploadService = UploadService;
//# sourceMappingURL=file-upload.service.js.map