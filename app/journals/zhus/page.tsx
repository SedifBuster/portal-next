



export default function Zhus() {
  
    //TODO
    //1. взять из прошлого сервака данные и добавить в стейт даты COMPLETE
    //2. сделать выборку с датой COMPLETE
    //3. победить саброу COMPLETE
    //3.1 3.2  ссл и pnpm и nginx
    //4. фильтр по отделениям
    //5. таблица уходит влево
    //6. возможность коммент запилить
    return (
      <main className="flex justify-center">
        <div>
        </div>

      </main>
    )
  }
  /**
   * 
   * post log {
  department: 'Neurology',
  name: 'Попова Майя Александровна 30.04.1936',
  date: '2025-04-30T23:00:00.000Z',
  place: 'Неврологическое отделение №308(ТО3)',
  event: 'PressureSoresOut',
  circs: 'При осмотре кожных покровов пациентки Поповай М.А. был обнаружен пролежень на ступне 3 степени  ',
  gauge: 'Сообщено лечащему врачу, обработано бетадином, наложена асептическая повязка    ',
  note: '.',
  liable: 'Никитина А.В.',
  cause: 'Не известна '
}
PrismaClientValidationError:
Invalid `prisma.log.create()` invocation:











{
  data: {
    department: "Neurology",
    name: "Попова Майя Александровна 30.04.1936",
    date: "2025-04-30T23:00:00.000Z",
    place: "Неврологическое отделение №308(ТО3)",
    event: "PressureSoresOut",
           ~~~~~~~~~~~~~~~~~~
    circs: "При осмотре кожных покровов пациентки Поповай М.А. был обнаружен пролежень на ступне 3 степени  ",
    gauge: "Сообщено лечащему врачу, обработано бетадином, наложена асептическая повязка    ",
    note: ".",
    liable: "Никитина А.В.",
    cause: "Не известна ",
    comment: undefined
  }
}

Invalid value for argument `event`. Expected Problem.
    at wn (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\@prisma\client\runtime\library.js:29:1363)
    at $n.handleRequestError (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\@prisma\client\runtime\library.js:121:6958)
    at $n.handleAndLogRequestError (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\@prisma\client\runtime\library.js:121:6623)
    at $n.request (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\@prisma\client\runtime\library.js:121:6307)
    at async l (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\@prisma\client\runtime\library.js:130:9633)
    at async c (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\.next\server\app\api\logs\route.js:1:891)
    at async C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\next\dist\compiled\next-server\app-route.runtime.prod.js:6:42484
    at async eI.execute (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\next\dist\compiled\next-server\app-route.runtime.prod.js:6:32486)
    at async eI.handle (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\next\dist\compiled\next-server\app-route.runtime.prod.js:6:43737)
    at async doRender (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\next\dist\server\base-server.js:1333:42) {
  clientVersion: '5.22.0'
} LOG_CREATE_ERROR
Error fetching data: Error: HTTP error! status: 500
    at x (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\.next\server\app\journals\zhus\form\page.js:1:19478)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\next\dist\compiled\next-server\app-page.runtime.prod.js:16:406
    at async rg (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\next\dist\compiled\next-server\app-page.runtime.prod.js:15:6309)
    at async rz (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\next\dist\compiled\next-server\app-page.runtime.prod.js:16:24709)
    at async doRender (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\next\dist\server\base-server.js:1394:30)
    at async cacheEntry.responseCache.get.routeKind (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\next\dist\server\base-server.js:1555:28)
    at async NextNodeServer.renderToResponseWithComponentsImpl (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\next\dist\server\base-server.js:1463:28)
    at async NextNodeServer.renderPageComponent (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\next\dist\server\base-server.js:1856:24)
    at async NextNodeServer.renderToResponseImpl (C:\Users\Администратор.WIN-R1QG28THMKB\Documents\GitHub\portal-next\node_modules\next\dist\server\base-server.js:1894:32)
[Function: Error] { stackTraceLimit: 10 }
   */