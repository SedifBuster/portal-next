
import { DepartmentLog, Problem } from "@prisma/client";
import FormRecord from "./components/formRecord";
import QrTooltip from "./components/qrTooltip";

type UnitDep = {
  value: DepartmentLog,
  text: string,
}

export
  type UnitIssue = {
  value: Problem,
  text: string,
}

 const departments: UnitDep[] = [
  {
    value: "Policlinic",
    text: "Поликлиника",
  },
  {
    value: "Reception",
    text: "Приемное",
  },
  {
    value: "Pulmonology",
    text: "Пульмонология",
  },
  {
    value: "Rehabilitation",
    text: "Реабилитация",
  },
  {
    value: "Reanimation",
    text: "Реанимация",
  },
  {
    value: "Laboratory",
    text: "Лаборатория",
  },
  {
    value: "Neurology",
    text: "Неврология",
  },
  {
    value: "Opp",
    text: "ОПП",
  },
  {
    value: "Pao",
    text: "ПАО",
  },
  {
    value: "Ceo",
    text: "СЭО",
  },
  {
    value: "Therapeutic",
    text: "Терапия",
  },
  {
    value: "Surgical",
    text: "Хирургия",
  },
  {
    value: "Xray",
    text: "Рентгенология",
  },
  {
    value: "Administration",
    text: "Администрация",
  },
  {
    value: "Aho",
    text: "АХО",
  },
]
  
export
  default function Form(
) {

  const problems: UnitIssue[] = [
    {
      value: "IdentificationOfThePatientsIdentity",
      text: "Идентификация личности пациента",
    },
    {
      value: "Collapse",
      text: "Падение",
    },
    {
      value: "PressureSores",
      text: "Пролежни",
    },
    {
      value: "PressureSoresIn",
      text: "Пролежни: наши",
    },
    {
      value: "PressureSoresOut",
      text: "Пролежни: извне",
    },
    {
      value: "AnEventRelatedToAMedicalDeviceOrProduct",
      text: "Событие, связаное с медицинским оборудованием или изделием",
    },
    {
      value: "ADrugRelatedEvent",
      text: "Событие, связанное с лекарственным средством/фиксация пациента",
    },
    {
      value: "InfectiousOrParasiticDisease",
      text: "Инфекционное или паразитарное заболевание",
    },
    {
      value: "ISMP",
      text: "ИСМП (инфекции, связанные с медецинской помощью)",
    },
    {
      value: "SurgicalComplications",
      text: "Хирургические осложнения",
    },
    {
      value: "AnotherUndesirableEvent",
      text: "Другое нежелательное событие",
    },
    {
      value: "DeathInTheWard",
      text: "Другое нежелательное событие: смерть в палате",
    },
    {
      value: "Hematomas",
      text: "Другое нежелательное событие: гематомы",
    },
  ]

  async function onPostData(url: string, postData: BodyInit): Promise<number> {
    "use server"
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const data = await response.json()

      return data;
    } catch (error) {
      console.error('Error fetching data:', error)
      throw Error;
    }
  }

  return <section className="flex flex-col justify-between p-2 container">
    <FormRecord departments={departments} problems={problems} postLog={onPostData}/>
    {/** qr and tooltip*/}
    <QrTooltip />
  </section>
}