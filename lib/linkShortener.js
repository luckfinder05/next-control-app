import { ShortLink } from "../models/ShortedLinksModel";
import { customAlphabet } from "nanoid";
import dbConnect from "./mongooseConnect";
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 3);

export default new class LinkShortener {
  async addLink(req, res) {
    try {
      dbConnect();
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

      // Исходные данные для формирования результирующей ссылки: 
      const { originalLink } = req.body;

      // Если по-ошибке передана пустая ссылка - выходим
      if (!originalLink) { return res.status(500).json({ message: "OriginalLink: Пустая ссылка" }); }

      // Если добавляемая ссылка ранее уже добавлялась - возвращаем существующую короткую ссылку
      let candidate = await ShortLink.findOne({ originalLink });
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
      candidate = await ShortLink.findOne({ shortLinkId });
      if (candidate) {
        return res.status(500).json({ message: "Ошибка сервера: невозможно создать короткую ссылку. Попробуйте снова." });
      }

      //Добавляем запись в базу данных
      const dbRecord = new ShortLink({ shortLinkId, originalLink });
      await dbRecord.save();

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

  async getLink(req, res) {
    const params = [...req.query.params]
    const shortLinkId = params[0];

    dbConnect();
    const result = await ShortLink.findOne({ shortLinkId });
    if (result) {
      if (result.originalLink.match(/^.*:(\/\/)/gm)) {
        res.status(301).redirect(result.originalLink);
      }
      else {
        res.status(301).redirect(`https://${result.originalLink}`);
      }
    } else {
      res.status(400).json({ message: "Not found" });
    }
  }

  async update(req, res) {
    dbConnect();
  }

  async remove(req, res) {
    try {
      const { id } = req.body;
      await dbConnect();
      const users = await ShortLink.deleteOne({ _id: id });
      if (users) return res.status(200).json({ message: "Shortlink was deleted" });
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error on deleting shortlink" });
    }
    return
  }

  async clearDB(req, res) { }

  async listAllLinks() {
    await dbConnect();
    const result = await ShortLink.find({});
    return result
  }

}