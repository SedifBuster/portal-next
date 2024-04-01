"use client"

import * as React from "react"
import { DatePicker } from "./DatePicker"
import axios from "axios"
import { useEffect, useState } from "react"
import { Dash, DashDepartment } from "@prisma/client"
import toast from "react-hot-toast"
import { DashItem } from "./DashItem"
import { DashSkeleton } from "./DashSkeleton"

export
  interface DashInit extends Dash {
    table: DashDepartment[]
}

export
  function DataTable(
) {
  const [isTables, setTables] = useState<DashInit[]>()
  const [isDash, setDash] = React.useState<DashInit>()
  const [date, setDate] = React.useState<Date>()
  const [isIndex, setIndex] = React.useState<number>()
  let getTables = async () => {
    try {
      let result = await axios.get('/api/dash')
      if (result.status === 200) {
        toast.success(`таблицы код ${result.status}`)
        let resultDep = await axios.get('/api/dash/department')
        toast.success(`отделения код ${resultDep.status}`)
        if(resultDep.data && result.data) {
          console.log(resultDep.status)
          let filteredDashes = result.data.map((item: Dash) => {
            return {...item, table: resultDep.data.filter((dep: DashDepartment) => {
              return dep.dashId === item.id
            })}
          })
          console.log(filteredDashes)
          setTables(filteredDashes)
        }
      }
    } catch {
      console.log('error')
    }
  }
  useEffect(() => {
    getTables()
  }, [])
  useEffect(() => {
    if(isTables)
    setDash(isTables[isTables.length - 1])
    setDate(isDash?.date)
  }, [isTables])

  useEffect(() => {
    if(isDash)
    console.log(isLpu(isDash.table))
  }, [isDash])

  const onExist = () => {
    if(isTables && isDash) {
      return isTables.findIndex(el => el.id === isDash.id)
    }
  }
  const next = () => {
    if(typeof isIndex === 'number' && isIndex !== -1 && isTables) {
      if(isIndex < isTables.length - 1) {
        setIndex(isIndex + 1)
        setDash(isTables[isIndex])
        console.log('dash posle nexta', isDash)
      }
    }
  }
  const previous = (/**react.mouseevent */) => {
    if(isIndex && isIndex !== -1 && isTables) {
      if(isIndex !== 0) {
        setIndex(isIndex - 1)
        setDash(isTables[isIndex])
        //tut che to poticat podergat
        console.log('dash posle previousa', isDash)
      }//else setDisabledPrev true
    }
  }
//voobshe zanyatsa table: lpu and filters okay
  const datePick = () => {
    /*
    let res = isTables.findIndex(el => el.date.toString() === date?.toString())
    if(res !== -1) {
     //@ts-ignore
     setDash(isTables[res])
    }


    if(isIndex && isIndex !== -1 && isTables) {
      if(isIndex !== 0) {
        setIndex(isIndex - 1)
        setDash(isTables[isIndex])
        console.log('dash posle previousa', isDash)
      }
    }
        if(typeof isIndex === 'number' && isIndex !== -1 && isTables) {
      if(isIndex < isTables.length - 1) {
        setIndex(isIndex + 1)
        setDash(isTables[isIndex])
        console.log('dash posle nexta', isDash)
      }
    }
    */
  }

  const isLpu = (deps: DashDepartment[] ) => {
    if(!deps) return undefined

    let withoutPal = deps.filter((dep) => {
      return dep.name.toLowerCase() !== "Паллиатив".toLowerCase()
    })

    if(!withoutPal) return undefined

    let LpuDep: DashDepartment = {
      id: 0,
      name: "по ЛПУ",
      createdAt: new Date(),
      updatedAt: new Date(),
      planHuman: isValue(withoutPal.map((dep) => {return dep.planHuman})),
      planRub:   isValue(withoutPal.map((dep) => {return dep.planRub})),
      begAcc:    isValue(withoutPal.map((dep) => {return dep.begAcc})),
      admRec:    isValue(withoutPal.map((dep) => {return dep.admRec})),
      disCome:   isValue(withoutPal.map((dep) => {return dep.disCome})),
      disTax:    isValue(withoutPal.map((dep) => {return dep.disTax})),
      patOver:   isValue(withoutPal.map((dep) => {return dep.patOver})),
      storColed: isValue(withoutPal.map((dep) => {return dep.storColed})),
      transHuman:isValue(withoutPal.map((dep) => {return dep.transHuman})),
      transRub:  isValue(withoutPal.map((dep) => {return dep.transRub})),
      medPrice:  isValue(withoutPal.map((dep) => {return dep.medPrice})),
      dolgDead:  isValue(withoutPal.map((dep) => {return dep.dolgDead})),
      dashId:    isDash? isDash.id : 0
    }

    //let adm = isValue(deps)
      /*let adm = deps.filter((dep) => {
        return dep.name.toLowerCase() !== "Паллиатив".toLowerCase()
      }).map((dep) => {
        return dep.admRec
      }).reduce((sum, current) => {
        return sum + current
      }, 0)
      /*if(adm.length > 0) {
        adm.reduce((sum, current) => {
          return sum + current
        }, 0)
      }
      /*.reduce((sum, current) => {
        if(sum && current) {
          return sum + current
        }
        
      }, 0)*/
    //return adm
    return LpuDep
  }

  const isValue = (lpuValues: (number | null) []): number => {
    if(!lpuValues) return 0

    let lpuValue = lpuValues.reduce((sum: number, current) => {
      return sum + current
    }, 0)

  //lpuValue = lpuValues.filter((dep) => {
  //  return dep.name.toLowerCase() !== "Паллиатив".toLowerCase()
  //})
  return 0
  }

  /**{
    wards.filter((ward) => {
       return ward.depId === dep.id}).reduce((sum, current) => {
           return sum + current.numberOfSeats
       }, 0)
   }*/


  useEffect(() => {
    if(isTables && isDash)
      console.log('index', onExist())
      setIndex(onExist())
      console.log('dash', isDash)
  }, [isTables])

  return (
    <div className="w-full ml-4 mr-4">
      {
        date && isTables && isDash
        ?
        <>
          <DatePicker date={date} setDate={setDate} previous={previous} next={next} testDate={isDash.date}
            dashDates={isTables?.map((el) => {
              return new Date(el.date)
            })}
          />
          {isIndex}
          <DashItem data={isDash.table} />
        </>
        :
        <DashSkeleton/>
      }
    </div>
  )
}
  //previous
  /*let index = onExist()
  if(index && index !== -1 && isTables) {
    if(index !== 0 /*&& index < isTables.length - 1) {
      console.log('do', index)
      index --
      console.log('posle', index)
      setDash(isTables[index])
      console.log('dash posle previousa', isDash)
    }
  }*/
  //next
  /*let index = onExist()
  if(index && index !== -1 && isTables) {
    console.log('rabotaet')
    if(index < isTables.length - 1) {
      index ++
      console.log('menshe')
      setDash(isTables[index])
    }
  }*/
 /* useEffect(() => {
    //setIndex(onExist())
    setInterval(() => console.log(isIndex), 5000)
    //console.log(isIndex)
  }, [isIndex])*/
 /* const onNextDash = (type: 'next' | 'previous' | 'date') => {
    if(isTables && isDash) {
    let index = isTables.findIndex(el => el.id === isDash.id)
    console.log('testIndex' ,index)
  
    switch(type) {
  
      case 'next': 
      console.log('next')
      //return () => {
        //@ts-ignore
        if(index < isTables.length) {
          index --
          //@ts-ignore
          setDash(isTables[index])
          console.log(isDash)
          break
        }
      //}
  
      case 'previous':
      console.log('previos')
      return () => {
        //@ts-ignore
        if(index !== 0 && index < isTables.length) {
          index --
          //@ts-ignore
          setDash(isTables[index])
        }
      }
  
      case 'date':
        console.log('date')
        return () => {
          //@ts-ignore
         let res = isTables.findIndex(el => el.date.toString() === date?.toString())
         if(res !== -1) {
          //@ts-ignore
          setDash(isTables[res])
         }
        }
  
      default:
        return () => undefined
    }
  }
    }*/