import axios from 'axios';
import {chat} from "slack"
import {slackPostMessagesAPI,token,channelId,text} from './constants/constants';

const args = {
    // token:token,
    channel: channelId,
    text:text
}

const remind = ()=>{
    //  axios.post(slackPostMessagesAPI, args,
    //     {
    //     headers:{
    //         'Content-Type': 'application/json; charset=UTF-8',
    //         'Authorization': token 
    //     }
    // })
	// .then(function (response: any) {
	// 	console.log(response.data)
	// 	})
	// .catch(function (error: any) {
	// 	console.log(error)
  	// 	})
	// .then(function () {
	// 	console.log ("*** 終了 ***")
	// 	})
    postMessageToSlack()
}

const postMessageToSlack = () =>{
    chat.postMessage({
        token:token,
        channel:channelId,
        text:"まだ草生えてませんよ"
    }).then((response)=>{
console.log(response.data);

    })
}

remind()