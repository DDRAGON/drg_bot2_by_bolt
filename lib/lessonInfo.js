const request = require('request');


/*
function reaction(app) {

  robot.respond(/授業情報/i, function(res) {

    request.post(
      'http://10.193.64.31:8003/lessonInfoAPI', {},
      function(err, httpResponse, body) {
        if (err) {
            console.log(err);
            res.send(`エラーが出ちゃったみたい。`);
            res.send(err);
            return;
        }
        if (httpResponse.statusCode == 200) {
          const lessoInfos = JSON.parse(body);

          if (lessoInfos.isFindLesson) {
            const textID = lessoInfos.lessonTextsUrl.match(/guides\/([0-9]*?)$/)[1];
            const lessonID = lessoInfos.lessonURL.match(/lessons\/([0-9]*?)$/)[1];

            let message = `` +
              `今日は 「${lessoInfos.title}」 だよ\n` + 
              `授業ページ: \`${lessoInfos.lessonURL}\`\n` +
              `テキスト: \`${lessoInfos.lessonTextsUrl}\`\n` + 
              `先生ツール: \`${lessoInfos.teacherToolUrl}\`\n` +
              `テキストの権限設定ページ: \`https://soroban-manage.nnn.ed.nico/admin/guides/${textID}/edit\`\n` +
              `授業の権限設定ページ: \`https://soroban-manage.nnn.ed.nico/admin/lessons/${lessonID}/edit\``;

            if(lessoInfos.nicoURL) {
              message += `ニコ生: \`${lessoInfos.nicoURL}\`\n`;
            }
            if(lessoInfos.tsCount) {
              message += `TS予約数: \`${lessoInfos.tsCount}\`\n`;
            }
            
            res.send(message);

          } else {
            res.send('今日プログラミングの授業は無いみたい。');
          }
        }
      }
    );
  });
}
*/

function checkToday(app) {
  request.post(
    'http://10.193.64.31:8003/lessonInfoAPI', {},
    function(err, httpResponse, body) {
      if (err) {
        console.log(err);
        sendMessage(app, 'davide_test', err);
        return;
      }
      if (httpResponse.statusCode == 200) {
        const lessoInfos = JSON.parse(body);

        if (lessoInfos.isFindLesson) {
          const textID = lessoInfos.lessonTextsUrl.match(/guides\/([0-9]*?)$/)[1];
          const lessonID = lessoInfos.lessonURL.match(/lessons\/([0-9]*?)$/)[1];

          let message = `` +
            `今日は 「${lessoInfos.title}」 だよ\n` + 
            `授業ページ: \`${lessoInfos.lessonURL}\`\n` +
            `テキスト: \`${lessoInfos.lessonTextsUrl}\`\n` + 
            `先生ツール: \`${lessoInfos.teacherToolUrl}\`\n` +
            `テキストの権限設定ページ: \`https://soroban-manage.nnn.ed.nico/admin/guides/${textID}/edit\`\n` +
            `授業の権限設定ページ: \`https://soroban-manage.nnn.ed.nico/admin/lessons/${lessonID}/edit\``;

          if(lessoInfos.nicoURL) {
            message += `ニコ生: \`${lessoInfos.nicoURL}\`\n`;
          }
          if(lessoInfos.tsCount) {
            message += `TS予約数: \`${lessoInfos.tsCount}\`\n`;
          }

          sendMessage(app, 'progedu_live', message);
          sendMessage(app, 'ext-n-contents', message);

        } else {
          return;
        }
      }
    }
  );
}


async function sendMessage(app, channel, message) {
  await app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: channel,
    text: message
  });
}



module.exports = {
  checkToday
}
