export default function test() {
  return (
    <>
      <main className="statements">
        <section className="services">
          <div className="container">
            {/* $2 */}
            {/* <div className="formBox">
                <h2>Создать новый документ</h2> <a href="#toggle">Скрыть/Показать</a>
                $2
            </div> */}
            <h2>Реестр замечаний grid</h2> <a href="#toggle">Скрыть/Показать</a>
            <article className="hidden statement__grid">
              $2 $2
              <div className="statement__card">
                <div className="card__header">
                  <div>
                    <span className="statement__fieldname">№ замечания: </span>$2
                  </div>
                  <div>
                    <span className="statement__fieldname">Предписание №: </span>$2
                  </div>
                  <div>
                    <span className="statement__fieldname">Дата: </span>$2
                  </div>
                  <div>
                    <span className="statement__fieldname">Категория: </span>$2
                  </div>
                  <div>
                    <span className="statement__fieldname">Статус: </span>$2
                  </div>
                </div>
                <div className="card__content">
                  <span className="statement__fieldname">Содержание: </span>
                  {/* {{{insertLineBreaks
                        this.content}}} */}
                </div>
                <div className="card__footer">
                  <div>
                    <span className="statement__fieldname">Подрядчик: </span>$2
                  </div>
                  <div>
                    <span className="statement__fieldname">
                      Представитель ССК:{" "}
                    </span>
                    $2
                  </div>
                  <div>
                    <span className="statement__fieldname">Дата устранения: </span>
                    $2
                  </div>
                </div>
              </div>
              $2 $2
            </article>
            <article className="statement__list">
              <h2>Реестр замечаний Таблица</h2>{" "}
              <a href="#toggle">Скрыть/Показать</a>
              <table className="hidden statements-table">
                <tbody>
                  <tr>
                    <th>№ предписания</th>
                    <th>Дата выдачи замечания</th>
                    <th>№ замечания</th>
                    <th>Категория</th>
                    <th>Содержание замечания</th>
                    <th>Статус замечания</th>
                    <th>Подрядчик</th>
                    <th>Представитель ССК</th>
                    <th>Дата устранения</th>
                    $2
                  </tr>
                  {/* $2
                        $2 */}
                  <tr>
                    <td className="format_center" data-th="Предписание №">
                      $2
                    </td>
                    <td className="format_center" data-th="Дата:">
                      $2
                    </td>
                    <td className="format_center" data-th="№ замечания">
                      $2
                    </td>
                    <td className="format_center" data-th="Категория:">
                      $2
                    </td>
                    <td className="format_left" data-th="Содержание">
                      $2
                    </td>
                    <td className="format_center" data-th="Статус">
                      $2
                    </td>
                    <td className="format_center" data-th="Подрядчик">
                      $2
                    </td>
                    <td className="format_center" data-th="Представитель ССК">
                      $2
                    </td>
                    <td className="format_center" data-th="Устранено">
                      $2
                    </td>
                  </tr>
                  {/* $2 */}
                  {/* $2 */}
                </tbody>
              </table>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

{
  /* <main className="statements">
    <section className="services">
        <div className="container">
            <h1>$2</h1>

            <a href="statements/create">Create</a> <br>
            <a href="statements/read">Read</a> <br>
            <a href="statements/update">Update</a> <br>
            <a href="statements/delete">Delete</a> <br>

            $2

            <div className="formBox">
                <h2>Создать новый документ</h2> <a href="#toggle">Скрыть/Показать</a>
                $2
            </div>

            <h2>Реестр замечаний grid</h2> <a href="#toggle">Скрыть/Показать</a>
            <article className="hidden statement__grid">
                $2
                $2
                <div className="statement__card">
                    <div className="card__header">
                        <div><span className="statement__fieldname">№ замечания: </span>$2</div>
                        <div><span className="statement__fieldname">Предписание №: </span>$2</div>
                        <div><span className="statement__fieldname">Дата: </span>$2</div>
                        <div><span className="statement__fieldname">Категория: </span>$2</div>
                        <div><span className="statement__fieldname">Статус: </span>$2</div>
                    </div>
                    <div className="card__content"><span className="statement__fieldname">Содержание: </span>{{{insertLineBreaks
                        this.content}}}
                    </div>
                    <div className="card__footer">
                        <div><span className="statement__fieldname">Подрядчик: </span>$2</div>
                        <div><span className="statement__fieldname">Представитель ССК: </span>$2
                        </div>
                        <div><span className="statement__fieldname">Дата устранения: </span>$2</div>
                    </div>
                </div>
                $2
                $2
            </article>

            <article className="statement__list">
                <h2>Реестр замечаний Таблица</h2> <a href="#toggle">Скрыть/Показать</a>
                <table className="hidden statements-table">
                    <tbody>
                        <tr>
                            <th>№ предписания</th>
                            <th>Дата выдачи замечания</th>
                            <th>№ замечания</th>
                            <th>Категория</th>
                            <th>Содержание замечания</th>
                            <th>Статус замечания</th>
                            <th>Подрядчик</th>
                            <th>Представитель ССК</th>
                            <th>Дата устранения</th>
                            $2
                        </tr>
                        $2
                        $2
                        <tr>
                            <td className="format_center" data-th="Предписание №">$2</td>
                            <td className="format_center" data-th="Дата:">$2</td>
                            <td className="format_center" data-th="№ замечания">$2</td>
                            <td className="format_center" data-th="Категория:">$2</td>
                            <td className="format_left" data-th="Содержание">$2</td>
                            <td className="format_center" data-th="Статус">$2</td>
                            <td className="format_center" data-th="Подрядчик">$2</td>
                            <td className="format_center" data-th="Представитель ССК">$2</td>
                            <td className="format_center" data-th="Устранено">$2</td>
                        </tr>
                        $2
                        $2
                    </tbody>
                </table>
            </article>
        </div>
    </section>
</main>

<style>
    .statement__grid {
        margin-top: 40px;
        display: grid;
        flex-wrap: wrap;
        justify-content: space-evenly;
        row-gap: 15px;
    }

    .statement__card {
        background-color: rgba(206, 205, 195, 0.623);
        color: black;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        border: 1px solid rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        padding: 10px;
        box-shadow: 5px -1px 5px 5px rgba(0, 0, 0, 0.1);
    }

    .statement__fieldname {
        color: rgba(75, 83, 126, 0.808);
        margin-right: 10px;

    }

    .card__content {
        margin: 10px 0;
    }

    .card__header,
    .card__footer {
        display: grid;
        grid-template-columns: repeat(4, 1fr) auto;
        justify-content: space-around;
        column-gap: 5px;
    }
</style> */
}
