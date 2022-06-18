// path: /s/:params

import dbConnect from "../../../controllers/dbController";
import ShortLinks from "../../../models/shortedLinksModel.schema";

const customAlphabet = require('nanoid/async').customAlphabet;
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 3);


const Handler = async (req, res) => {
  // console.log('req: ', req);
  // console.log('req.headers: ', req.headers);
  // console.log('req.body: ', req.body);
  // console.log('req.query: ', req.query);

  if (req.method === 'GET') {
    const params = [...req.query.params]
    const shortLinkId = params[0];

    // There is no need for redirection, because Nextjs does it on its own
    //
    // if (params[0] === '/') {
    //   console.log('ERR');
    //   res.status(404).redirect(`http://${req.headers.host}`);
    // }

    const result = await ShortLinks.findOne({ shortLinkId });
    if (result) {
      if (result.originalLink.match(/^.*:(\/\/)/gm)) {
        res.status(301).redirect(result.originalLink);
      }
      else {
        // console.log('`https://${result.originalLink}`: ', `https://${result.originalLink}`);
        res.status(301).redirect(`https://${result.originalLink}`);
      }
    } else {
      res.status(400).json({ message: "Not found" });
    }
  }

  if (req.method === 'POST') {
    try {

      /* 
       * Заменить имя сервера для работы с удаленного сервера 
       * Возможно ничего менять не нужно - проверить в продакшене и оставить
       */
      // const serverName = req.hostname;         //"localhost"
      // const serverName = req.headers.host;        //"localhost:5000";
      // const newLinkPrefix = `${req.protocol}://${serverName}/s/`;
      // const newLinkPrefix = `https://${serverName}/s/`;

      const serverName = req.headers.origin;        //"localhost:5000";
      const newLinkPrefix = `${serverName}/s/`;


      /* 
      *
      */

      // Исходные данные для формирования результирующей ссылки: 
      const { originalLink } = req.body;

      // Если по-ошибке передана пустая ссылка - выходим
      if (!originalLink) { return res.status(500).json({ message: "OriginalLink: Пустая ссылка" }); }

      // Если добавляемая ссылка ранее уже добавлялась - возвращаем существующую короткую ссылку
      let candidate = await ShortLinks.findOne({ originalLink });
      if (candidate) {
        const newLink = `${newLinkPrefix}${candidate.shortLinkId}`;
        return res.json({
          message: `Ссылка уже была создана ранее: ${newLink}`,
          link: newLink
        });
      }

      // Генерируем короткий ID ссылки
      const shortLinkId = await nanoid();

      // Проверяем нет ли в базе данных ссылки с таким ID? Если есть - кидаем ошибку сервера
      candidate = await ShortLinks.findOne({ shortLinkId });
      if (candidate) {
        return res.status(500).json({ message: "Ошибка сервера: невозможно создать короткую ссылку. Попробуйте снова." });
      }

      //Добавляем запись в базу данных
      const shortLink = new ShortLinks({ shortLinkId, originalLink });
      await shortLink.save();

      //Возвращаем результат в формате JSON. Результирующая ссылка в поле link
      const newLink = `${newLinkPrefix}${shortLinkId}`;
      return res.json({
        message: `Ссылка создана: ${newLink}`,
        link: newLink
      });

    }
    catch (err) {
      console.dir(err);
      res.status(400).json({
        message: 'Short link creation error',
        msg: err
      });
    }
  }

}

// class LinkShortener {
//   async createShortLink(req, res) {
//     try {

//       /* 
//        * Заменить имя сервера для работы с удаленного сервера 
//        * Возможно ничего менять не нужно - проверить в продакшене и оставить
//        */
//       // const serverName = req.hostname;         //"localhost"
//       const serverName = req.headers.host;        //"localhost:5000";
//       // const newLinkPrefix = `${req.protocol}://${serverName}/s/`;
//       const newLinkPrefix = `https://${serverName}/s/`;


//       /* 
//       *
//       */

//       // Исходные данные для формирования результирующей ссылки: 
//       const { originalLink } = req.body;

//       // Если по-ошибке передана пустая ссылка - выходим
//       if (!originalLink) { return res.status(500).json({ message: "OriginalLink: Пустая ссылка" }); }

//       // Если добавляемая ссылка ранее уже добавлялась - возвращаем существующую короткую ссылку
//       let candidate = await ShortLinks.findOne({ originalLink });
//       if (candidate) {
//         const newLink = `${newLinkPrefix}${candidate.shortLinkId}`;
//         return res.json({
//           message: `Ссылка создана: ${newLink}`,
//           link: newLink
//         });
//       }

//       // Генерируем короткий ID ссылки
//       const shortLinkId = await nanoid();

//       // Проверяем нет ли в базе данных ссылки с таким ID? Если есть - кидаем ошибку сервера
//       candidate = await ShortLinks.findOne({ shortLinkId });
//       if (candidate) {
//         return res.status(500).json({ message: "Ошибка сервера: невозможно создать короткую ссылку. Попробуйте снова." });
//       }

//       //Добавляем запись в базу данных
//       const shortLink = new ShortLinks({ shortLinkId, originalLink });
//       await shortLink.save();

//       //Возвращаем результат в формате JSON. Результирующая ссылка в поле link
//       const newLink = `${newLinkPrefix}${shortLinkId}`;
//       return res.json({
//         message: `Ссылка создана: ${newLink}`,
//         link: newLink
//       });

//     }
//     catch (e) {
//       console.dir(e);
//       res.status(400).json({
//         message: 'Short link creation error',
//         msg: e
//       });
//     }





//   }

//   async getShortLink(req, res) {
//     if (req.params[0] === '/') {
//       return res.status(404).redirect(`http://${req.headers.host}`);
//     }

//     const shortLinkId = req.params[0].slice(1);
//     const result = await ShortLinks.findOne({ shortLinkId });
//     if (result) {
//       if (result.originalLink.match(/^.*:(\/\/)/gm)) {
//         return res.status(301).redirect(result.originalLink);
//       }
//       else {
//         console.log('`https://${result.originalLink}`: ', `https://${result.originalLink}`);
//         return res.status(301).redirect(`https://${result.originalLink}`);
//       }
//     } else {
//       return res.status(400).json({ message: "Not found" });
//     }
//   }

//   async update(req, res) {

//   }

//   async remove(req, res) {

//   }

//   async clearDB(req, res) { }

//   async listAllLinks(req, res) { }

// }

export default dbConnect(Handler);
