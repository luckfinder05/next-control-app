import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";

import classes from "./Document.module.css";

function Document() {
  return (
    <div className={classes.templateBody}>
      <section className="header document">
        <div className="container">
          <Image
            src={logo}
            alt="logo"
            className="logo"
            width={133}
            height={106}
          />
          <div className="company-name">ООО «Мегаполис»</div>
          <div className="company-address">
            {" "}
            127006, Москва, ЦАО ул. Малая Дмитровка, д. 18А, стр.3 тел.:
            +7-495-363-15-45, megapolis@cckgroup.ru{" "}
          </div>

          <div className="reprimand-title">
            ПРЕДПИСАНИЕ № <span className="reprimand-number">32</span> от{" "}
            <span className="reprimand-date">26.11.2020</span>
          </div>
          <div className="subtitle">
            ОБ УСТРАНЕНИИ ВЫЯВЛЕННЫХ НАРУШЕНИЙ ПРИ СТРОИТЕЛЬСТВЕ ОБЪЕКТА
          </div>

          <div className="object-title">
            «Комплекс строений жилого дома. Жилой дом»
          </div>
          <div className="substring">(наименование строящегося объекта)</div>

          <div className="row located">
            <div className="col-3 located-title">Расположенного по адресу:</div>
            <div className="col location">
              М.О., Одинцовский район, Назарьевский с/о, Д. Таганьково, Дорожный
              дом ГП-2
            </div>
          </div>

          <div className="row given">
            <div className="col-3 given-title">Выдано:</div>
            <div className="col given-to">
              ИП Аноприенко А.Ю. производителю работ Голикову А.В.
            </div>
          </div>
        </div>
      </section>

      <section className="content document">
        <div className="container">
          <div className="content-title">
            Производство земляных работ выполняется с нарушениями:
          </div>
          <ol className="reprimand-list">
            <li className="reprimand-item">
              <div className="reprimand-item-text">Описание нарушения</div>
              <div className="reprimand-document">Что нарушено</div>
            </li>
            <li className="reprimand-item">
              <div className="reprimand-item-text">Описание нарушения</div>
              <div className="reprimand-document">Что нарушено</div>
            </li>
            <li className="reprimand-item">
              <div className="reprimand-item-text">Описание нарушения</div>
              <div className="reprimand-document">Что нарушено</div>
            </li>
            <li className="reprimand-item">
              <div className="reprimand-item-text">Описание нарушения</div>
              <div className="reprimand-document">Что нарушено</div>
            </li>
            <li className="reprimand-item">
              <div className="reprimand-item-text">Описание нарушения</div>
              <div className="reprimand-document">Что нарушено</div>
            </li>
            <li className="reprimand-item">
              <div className="reprimand-item-text">Описание нарушения</div>
              <div className="reprimand-document">Что нарушено</div>
            </li>
          </ol>

          <div className="order document">
            <div className="order-title"> Предписываю:</div>
            <ol className="orders-list">
              <li className="order-item"></li>
              <li className="order-item"></li>
              <li className="order-item"></li>
              <li className="order-item"></li>
              <li className="order-item"></li>
              <li className="order-item"></li>
            </ol>
          </div>
        </div>
      </section>

      <section className="signs document">
        <div className="container">
          <div className="row signatory">
            <div className="col-6 justify-content-between sing-function ">
              Представитель ООО «Мегаполис» <br /> Инженер строительного
              контроля
            </div>
            <div className="col sign-field"></div>
            <div className="col-3 sign-person">/Новицкий В.Б./</div>
          </div>

          <div className="col-12 signs-subheader-title">
            Представители ИП Аноприенко А.Ю.:
          </div>

          <div className="row signatory">
            <div className="col-6 justify-content-between sing-function">
              Производитель работ:
            </div>
            <div className="col sign-field"></div>
            <div className="col-3 sign-person">/Голиков А.В./</div>
          </div>
          <div className="row signatory">
            <div className="col-6 justify-content-between sing-function">
              Представитель лица осуществляющего строительство по вопросам
              строительного контроля
            </div>
            <div className="col sign-field"></div>
            <div className="col-3 sign-person">/Долинин А.В./</div>
          </div>
          <div className="row signatory">
            <div className="col-6 justify-content-between sing-function">
              Представитель заказчика:
            </div>
            <div className="col sign-field"></div>
            <div className="col-3 sign-person">/Хайретдинов Э.Р./</div>
          </div>
        </div>

        <div className="footer document">
          <div className="footer-container">
            <div className="reprimand-check">
              Отметка о выполнении предписания:
              _____________________________________________
            </div>
          </div>
        </div>
      </section>

      <div className="tooltip hidden" id="tooltip">
        <label htmlFor="tooltip-input">Введите новое название</label>
        <div className="tooltip__close-btn">X</div>
        <textarea
          type="text"
          name="tooltip-input"
          className="tooltip__input"
          id="tooltip-input"
          cols="30"
          rows="5"
        ></textarea>
        <button className="tooltip__btn">Изменить</button>
      </div>
    </div>
  );
}

export default Document;
