"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { WebClient } = require('@slack/web-api');
const fajrPrayerTimeGroup = (namaz, fajr) => {
    const web = new WebClient(process.env.SLACK_API_TOKEN);
    console.log(`${namaz} Time', ${fajr}`);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Use the `chat.postMessage` method to send a message from this app
            yield web.chat.postMessage({
                channel: '#test-prayer-bot',
                text: `${namaz} Namaz Time : ${fajr}`,
            });
            console.log('Message posted!');
        }
        catch (error) {
            console.log('Slack Error', error);
        }
    }))();
};
exports.default = fajrPrayerTimeGroup;
// Reviews
// Slack channel on registraion
//# sourceMappingURL=getFajrPrayerTimeGroup.js.map