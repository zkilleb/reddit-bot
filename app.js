'use strict';
const snoowrap = require('snoowrap');
const schedule = require('node-schedule');
const { creds, subreddit, botOwner, botName, flair, postTitle } = require('./creds');

const r = new snoowrap(creds);
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const divider = '-----------------------\n';

function main() {
  //Post monthly stickied post
  schedule.scheduleJob('0 0 1 * *', () => {
    let today = new Date();
    r.getSubreddit(subreddit)
      .submitSelfpost({
        title: `${postTitle} - ${months[today.getMonth()]} ${today.getFullYear()}`,
        text: '',
      })
      .sticky({ num: 1 })
      .distinguish()
      .approve()
      .assignFlair({ text: flair })
      .reply(
        `This thread was automatically posted by /u/${botName}. For questions or problems, contact /u/${botOwner}.`
      );
    console.log(`Monthly post posted at ${today} to ${subreddit}`);
  });

  //Send modqueue to specified user at end of day
  schedule.scheduleJob('0 0 * * *', async () => {
    let today = new Date();
    let tempString = '';
    const modQueue = await r
      .getSubreddit(subreddit)
      .getModqueue({ limit: 100 })
      .map((item, index) => {
        return `${index + 1}) Title: ${item.link_title || item.title} Reason: ${
          item.user_reports[0] || item.mod_reports[0]
        } Author: ${item.author.RedditUser || 'No Author Information'} Body: ${
          item.body || 'No Body Information'
        } Link: ${item.link_permalink || 'No Link Information'} \n ${divider}`;
      });
    modQueue.forEach((report) => {
      tempString += report;
    });
    r.composeMessage({
      to: botOwner,
      subject: `Modqueue ${today}`,
      text: tempString,
    });
    console.log(`Modqueue message sent at ${today} to ${botOwner}`);
  });
}

main();
