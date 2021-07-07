import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import "@pnotify/countdown/dist/PNotifyCountdown.css";
import { info, alert, success, error, defaultModules } from '@pnotify/core';
import * as PNotifyCountdown from '@pnotify/countdown';

import "@pnotify/confirm/dist/PNotifyConfirm.css";
import * as PNotifyConfirm from '@pnotify/confirm';

export default {
    onSuccessfulRequest() {
        // success({
        //     text: "Congratulations! You found the images.",
        //     maxTextHeight: null,
        // });

        success({
            title: 'Congratulations!',
            text: 'You found the images.',
            delay: 2500,
            maxTextHeight: null,
            modules: new Map([
                ...defaultModules,
                [PNotifyCountdown, {
                }]
            ])
        });        
    },

    onFetchError() {
        // error({
        //     text: "Something went wrong! Please please try again.",
        //     maxTextHeight: null,
        // });

        error({
            title: 'Something went wrong!',
            text: 'Please please try again.',
            delay: 2500,
            maxTextHeight: null,
            modules: new Map([
                ...defaultModules,
                [PNotifyCountdown, {
                }]
            ])
        });
    },

    notCorrectRequestAlert() {
        alert({
            title: 'No data to search',
            text: 'Please enter a correct request!',
            delay: 2500,
            maxTextHeight: null,
            modules: new Map([
                ...defaultModules,
                [PNotifyCountdown, {
                }]
            ])
        });

        // notification option
        // alert({
        //     title: 'No data to search',
        //     text: 'Please enter a correct request!',
        //     icon: 'fas fa-info-circle',
        //     hide: false,
        //     closer: false,
        //     sticker: false,
        //     destroy: true,
        //     maxTextHeight: null,
        //     modules: new Map([
        //         ...defaultModules,
        //         [PNotifyConfirm, {
        //             confirm: true,
        //             buttons: [{
        //                 text: 'Ok',
        //                 primary: true,
        //                 click: notice => notice.close()
        //             }]
        //         }]
        //     ])
        // });

        // notification option 2
        // alert({
        //         text: "Please enter a correct request!"
        //     });
    },

    noMoreImgRequestAlert() {
        info({
            title: 'Sorry...',
            text: 'There are no more photos for your request!',
            delay: 2500,
            maxTextHeight: null,
            modules: new Map([
                ...defaultModules,
                [PNotifyCountdown, {
                }]
            ])
        });

        // alert({
        //     text: "Sorry, there are no more photos for your request!",
        //     maxTextHeight: null,
        // });
    }

}