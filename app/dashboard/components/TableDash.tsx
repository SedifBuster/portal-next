"use client"

import * as React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Dash, DashDepartment } from "@prisma/client"
import toast from "react-hot-toast"
import { DashItem } from "./DashItem"
import { DashSkeleton } from "./DashSkeleton"
import { DashPagination} from "./DashPagination"
import { DatePicker } from "./DatePicker"

export
  interface DashInit extends Dash {
    table: DashDepartment[]
}

  //palaty s okoshkom
  // 
  //получение палат по отделению 1/
  //распределение палат по времени(тут сложно) 2/
  //вывод данных в таблице, клик по ним - вывод инфы по всем палатам отделения 3/
  //
  //фикс таблицы именно данных ?5/
  //добавить кнопки быстрых добавление\убавления в палатах (в конце) -/ne nado
  //lpu 6/
  //and fix numbers on pagination 7/
export
  function DataTable(
) {
  const [isTables, setTables] = useState<DashInit[]>()

  //getting data
  let getTables = async () => {
    try {
      let result = await axios.get('/api/dash')
      if (result.status === 200) {
        toast.success(`таблицы код ${result.status}`)
        let resultDep = await axios.get('/api/dash/department')
        toast.success(`отделения код ${resultDep.status}`)
        if(resultDep.data && result.data) {
          let filteredDashes = result.data.map((item: Dash) => {
            return {...item, table: resultDep.data.filter((dep: DashDepartment) => {
              return dep.dashId === item.id
            })}
          })
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

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState(1)

  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage
  const currentItems = isTables?.slice(firstItemIndex, lastItemIndex)



  //const withoutPal = data.filter((item) => { return item.name.toLowerCase() === "Паллиатив".toLowerCase()} )
  //need refactoring
  const setupReduce = (table: DashDepartment[], name: string): number => {
   let withoutPal = table.filter((item) => { return item.name.toLowerCase() === "Паллиатив".toLowerCase()} )
    switch(name) {
      case "planHuman":
        let resultPlanHuman = table.reduce((sum, current) => {
          if(typeof current.planHuman === "number")
            return sum + current.planHuman
          else return 0
        }, 0)

        if(resultPlanHuman && withoutPal && withoutPal[0].planHuman)
          return resultPlanHuman - withoutPal[0].planHuman
        else return resultPlanHuman

      case "planRub":
        let resultPlanRub = table.reduce((sum, current) => {
          if(typeof current.planRub === "number")
            return sum + current.planRub
          else return 0
        }, 0)

        if(resultPlanRub && withoutPal && withoutPal[0].planRub)
          return resultPlanRub - withoutPal[0].planRub
        else return resultPlanRub

        case "begAcc":
          let resultBegAcc = table.reduce((sum, current) => {
            if(typeof current.begAcc === "number")
              return sum + current.begAcc
            else return 0
          }, 0)
  
          if(resultBegAcc && withoutPal && withoutPal[0].begAcc)
            return resultBegAcc - withoutPal[0].begAcc
          else return resultBegAcc

        case "admRec":
          let resultAdmRec = table.reduce((sum, current) => {
            if(typeof current.admRec === "number")
              return sum + current.admRec
            else return 0
          }, 0)

          if(resultAdmRec && withoutPal && withoutPal[0].admRec)
            return resultAdmRec - withoutPal[0].admRec
          else return resultAdmRec
  
        case "disCome":
          let resultDisCome = table.reduce((sum, current) => {
            if(typeof current.disCome === "number")
              return sum + current.disCome
            else return 0
          }, 0)

          if(resultDisCome && withoutPal && withoutPal[0].disCome)
            return resultDisCome - withoutPal[0].disCome
          else return resultDisCome

        case "disTax":
          let resultDisTax = table.reduce((sum, current) => {
            if(typeof current.disTax === "number")
              return sum + current.disTax
            else return 0
          }, 0)

          if(resultDisTax && withoutPal && withoutPal[0].disTax)
            return resultDisTax - withoutPal[0].disTax
          else return resultDisTax

        case "patOver":
          let resultPatOver = table.reduce((sum, current) => {
            if(typeof current.patOver === "number")
              return sum + current.patOver
            else return 0
        }, 0)

        if(resultPatOver && withoutPal && withoutPal[0].patOver)
          return resultPatOver - withoutPal[0].patOver
        else return resultPatOver

          case "storColed":
            let resultStorColed = table.reduce((sum, current) => {
              if(typeof current.storColed === "number")
                return sum + current.storColed
              else return 0
          }, 0)
  
          if(resultStorColed && withoutPal && withoutPal[0].storColed)
            return resultStorColed - withoutPal[0].storColed
          else return resultStorColed

          case "transHuman":
            let resultTransHuman = table.reduce((sum, current) => {
              if(typeof current.transHuman === "number")
                return sum + current.transHuman
              else return 0
          }, 0)
    
          if(resultTransHuman && withoutPal && withoutPal[0].transHuman)
            return resultTransHuman - withoutPal[0].transHuman
          else return resultTransHuman

          case "transRub":
            let resultTransRub = table.reduce((sum, current) => {
              if(typeof current.transRub === "number")
                return sum + current.transRub
              else return 0
          }, 0)
      
          if(resultTransRub && withoutPal && withoutPal[0].transRub)
            return resultTransRub - withoutPal[0].transRub
          else return resultTransRub

          case "medPrice":
            let resultMedPrice = table.reduce((sum, current) => {
              if(typeof current.medPrice === "number")
                return sum + current.medPrice
              else return 0
          }, 0)
        
          if(resultMedPrice && withoutPal && withoutPal[0].medPrice)
            return resultMedPrice - withoutPal[0].medPrice
          else return resultMedPrice

          case "dolgDead":
            let resultDolgDead = table.reduce((sum, current) => {
              if(typeof current.dolgDead === "number")
                return sum + current.dolgDead
              else return 0
          }, 0)
        
          if(resultDolgDead && withoutPal && withoutPal[0].dolgDead)
            return resultDolgDead - withoutPal[0].dolgDead
          else return resultDolgDead

          default: 
            return 0
      }
  }

  const onCreateLPU = (table: DashDepartment[]) => {
    let lpu: DashDepartment = {
      id: 100,
      name: "ЛПУ",
      createdAt: new Date(),
      updatedAt: new Date(),
      planHuman: setupReduce(table, 'planHuman'),
      planRub: setupReduce(table, 'planRub'),
      begAcc: setupReduce(table, 'begAcc'),
      admRec: setupReduce(table, 'admRec'),
      disCome: setupReduce(table, 'disCome'),
      disTax: setupReduce(table, 'disTax'),
      patOver: setupReduce(table, 'patOver'),
      storColed: setupReduce(table, 'storColed'),
      transHuman: setupReduce(table, 'transHuman'),
      transRub: setupReduce(table, 'transRub'),
      medPrice: setupReduce(table, 'medPrice'),
      dolgDead: setupReduce(table, 'dolgDead'),
      dashId: table?table[0].id: 15
    }
    console.log(lpu)
    return lpu
  }
  //lpu issue
  return (
    <div className="w-full ml-4 mr-4">
      {
        currentItems && isTables
        ?
        <>
          {
            currentItems.map((item) => {
              let addedLPU = item.table.splice(item.table.length - 1, 0, onCreateLPU(item.table))
              console.log(addedLPU)
              return <div key={item.id}>
                <DatePicker
                  date={item.date}
                  setCurrentPage={setCurrentPage}
                  dashDates={isTables?.map((el) => {
                    return {date:new Date(el.date), id: el.id }
                  })}
                />

                <DashItem data={item.table.splice(item.table.length - 1, 0, onCreateLPU(item.table)) } stateLpu={onCreateLPU(item.table)}/>
              </div>
            })
          }
          <DashPagination
            totalItems={isTables.length} 
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </>
        :
        <DashSkeleton/>
      }
    </div>
  )
}

/*<p>{currentPage}</p>*/

{
  /*
    isTables && isDash
    ?
    <>
      {format(new Date(isDash.date), "P", {locale: ru})}
      <DashItem data={isDash.table} isStateLpu={isStateLpu} />
      <DashPagination items={pagesWithData.map((table) => {
        return {date: table.date, count: table.count}
      })} 
      current={currentPage}
      onPageChange={onPageChange}
      />
    </>
    :
    <DashSkeleton/>
  */
  }
{
  /**          <DatePicker date={date} setDate={setDate} previous={previous} next={next} testDate={isDash.date}
    dashDates={isTables?.map((el) => {
      return new Date(el.date)
    })}
  />
  {isIndex} */
}

//Version 3?
/*"use client"

import * as React from "react"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Dash, DashDepartment } from "@prisma/client"
import toast from "react-hot-toast"
import { DashItem } from "./DashItem"
import { DashSkeleton } from "./DashSkeleton"
import { DashPagination, paginate } from "./DashPagination"
import format from "date-fns/format"
import ru from "date-fns/locale/ru"

export
  interface DashInit extends Dash {
    table: DashDepartment[]
}

export
  function DataTable(
) {
  const [isTables, setTables] = useState<DashInit[]>()
  const [isDash, setDash] = useState<DashInit>()
  const [isStateLpu, setStateLpu] = useState<DashDepartment>()
  const [isPaginatedPosts, setPaginatedPosts] = useState<any[]>([])

  //getting data
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

  //pagination
  let pagesCount: number
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 1
  const [pagesWithData, setPagesWithData] = useState<any[]>([])

  const onPageChange = (page: any) => {
    setCurrentPage(page)
  }

  /*
  useEffect(() => {
    if(isTables)
      setDash(isTables[currentPage - 1])
    if(isTables)
      pagesCount = isTables.map((table) => {
        return table.date
      }).length
      console.log('pages count' ,pagesCount)

      const pages = Array.from({ length: pagesCount}, (_, i) => i + 1)
      setPagesWithData( pages.map((item, index) => {
        if(isTables)
          return {count: item, date: isTables[index].date, table: isTables[index].table, id: isTables[index].id }
      }))
      console.log( 'pages with data' ,pagesWithData)
  }, [isTables])
  const onPageChange = (action: 'prev' | 'next' | 'date', count: number) => {

    /*switch (action) {

      
      case 'prev':
        if(currentPage - 1 !== undefined) {
          setCurrentPage(currentPage - 1)
          if(isTables) {
            setDash(isTables[currentPage])
          }
        }
        break
      case 'next':
        if(currentPage + 1 === undefined) {
          setCurrentPage(currentPage + 1)
          if(isTables) {
            setDash(isTables[currentPage])
          }
        }
        break
      default: 
      setCurrentPage(currentPage + 1)
    if(isTables && isTables[currentPage])
    setDash(isTables[currentPage])
    break
    }
    //console.log(currentPage, 'current', pagesCount, 'pages count')
    if(currentPage !== pagesCount) {
      setCurrentPage(count)
    }
    
    if(isTables && isTables[currentPage])
    setDash(isTables[currentPage])
  }
 

  let paginatedPosts: any[]
  useEffect(() => {
    if(isTables)
      setPaginatedPosts(paginate(testArray, currentPage, pageSize))
  }, [isTables])
    console.log(isPaginatedPosts)


    const testArray = [2,342,4354,56,564,34,21,23,2,345,56,68,564,43,423,32,23,54,6,6556,56,65,235,34,34,34,2231234,54,57,67]

  return (
    <div className="w-full ml-4 mr-4">

      {isPaginatedPosts?
      isPaginatedPosts.map((item) => {
        return <>
        <p>{currentPage}</p>
        <p>{item}</p>
        <p> {/*item.date.toString()}</p>
        </>
      }):
      null}
      {isTables
      ?
      <DashPagination
      items={testArray.length} 
      current={currentPage}
      pageSize={pageSize}
      onPageChange={onPageChange}
      />
      :
        null
      }
    </div>
  )
}*/

//Vesion 2
/*"use client"

import * as React from "react"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Dash, DashDepartment } from "@prisma/client"
import toast from "react-hot-toast"
import { DashItem } from "./DashItem"
import { DashSkeleton } from "./DashSkeleton"
import { DashPagination } from "./DashPagination"
import format from "date-fns/format"
import ru from "date-fns/locale/ru"

export
  interface DashInit extends Dash {
    table: DashDepartment[]
}

export
  function DataTable(
) {
  const [isTables, setTables] = useState<DashInit[]>()
  const [isDash, setDash] = useState<DashInit>()
  const [isStateLpu, setStateLpu] = useState<DashDepartment>()

  //getting data
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

  //pagination
  let pagesCount: number
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pagesWithData, setPagesWithData] = useState<any[]>([])

  useEffect(() => {
    if(isTables)
      setDash(isTables[currentPage - 1])
    if(isTables)
      pagesCount = isTables.map((table) => {
        return table.date
      }).length
      console.log('pages count' ,pagesCount)

      const pages = Array.from({ length: pagesCount}, (_, i) => i + 1)
      setPagesWithData( pages.map((item, index) => {
        if(isTables)
          return {count: item, date: isTables[index].date, table: isTables[index].table, id: isTables[index].id }
      }))
      console.log( 'pages with data' ,pagesWithData)
  }, [isTables])

  const onPageChange = (action: 'prev' | 'next' | 'date', count: number) => {

    switch (action) {

      
      case 'prev':
        if(currentPage - 1 !== undefined) {
          setCurrentPage(currentPage - 1)
          if(isTables) {
            setDash(isTables[currentPage])
          }
        }
        break
      case 'next':
        if(currentPage + 1 === undefined) {
          setCurrentPage(currentPage + 1)
          if(isTables) {
            setDash(isTables[currentPage])
          }
        }
        break
      default: 
      setCurrentPage(currentPage + 1)
    if(isTables && isTables[currentPage])
    setDash(isTables[currentPage])
    break
    }
    //console.log(currentPage, 'current', pagesCount, 'pages count')
    if(currentPage !== pagesCount) {
      setCurrentPage(count)
    }
    
    if(isTables && isTables[currentPage])
    setDash(isTables[currentPage])
  }

  return (
    <div className="w-full ml-4 mr-4">
      {
        isTables && isDash
        ?
        <>
          {format(new Date(isDash.date), "P", {locale: ru})}
          <DashItem data={isDash.table} isStateLpu={isStateLpu} />
          <DashPagination items={pagesWithData.map((table) => {
            return {date: table.date, count: table.count}
          })} 
          current={currentPage}
          onPageChange={onPageChange}
          />
        </>
        :
        <DashSkeleton/>
      }
    </div>
  )
}*/























//Version 1
  //если дэш поставили ищем его индекс
 /*
   //create Lpu department
  const isLpu = useCallback((deps: DashDepartment[] | undefined ) => {
    if(!deps) return undefined

    let withoutPal = deps.filter((dep) => {
      return dep.name.toLowerCase() !== "Паллиатив".toLowerCase()
    })
  useEffect(() => {
    if(isDash)
    setStateLpu(isLpu(isDash.table))
  }, [isDash, isLpu])
    if(!withoutPal) return undefined
    //@ts-ignore
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

    return LpuDep
  },[isDash])

  const isValue = (lpuValues: (number | null) []): number => {
    if(!lpuValues) return 0

    let lpuValue = lpuValues.reduce((sum: number, current) => {
      //@ts-ignore
      return sum + current
    }, 0)

  return lpuValue
  }
 
 useEffect(() => {
    onExist()
  },[onExist])*/
 /*const onExist = useCallback(() => {
    if(isTables && isDash) {
      setIndex(isTables.findIndex(el => el.id === isDash.id)) 
    }
  }, [isDash, isTables])
  //console.log(isIndex)
  //buttons change table data
  const next = () => {
    if(typeof isIndex === 'number' && isIndex !== -1 && isTables) {
      if(isIndex < isTables.length - 1) {
        setIndex(isIndex + 1)
        setDash(isTables[isIndex])
        console.log('dash posle nexta', isDash)
      }
    }
  }
  const previous = (/**react.mouseevent ) => {
    if(isIndex && isIndex !== -1 && isTables) {
      if(isIndex !== 0) {
        setIndex(isIndex - 1)
        setDash(isTables[isIndex])
        //tut che to poticat podergat
        console.log('dash posle previousa', isDash)
      }//else setDisabledPrev true
    }
  }
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
    
  }*/

/*
"use client"
import * as React from "react"
import { DatePicker } from "./DatePicker"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Dash, DashDepartment } from "@prisma/client"
import toast from "react-hot-toast"
import { DashItem } from "./DashItem"
import { DashSkeleton } from "./DashSkeleton"
import { DashPagination } from "./DashPagination"
export
  interface DashInit extends Dash {
    table: DashDepartment[]
}
export
  function DataTable(
) {
  const [isTables, setTables] = useState<DashInit[]>()
  const [isDash, setDash] = useState<DashInit>()
  const [date, setDate] = useState<Date>()
  const [isIndex, setIndex] = useState<number>()
  const [isStateLpu, setStateLpu] = useState<DashDepartment>()
  //getting data
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

  //finding index
  /*const onExist = (tables: DashInit[] | undefined) => {
    if(tables && isDash) {
      setIndex(tables.findIndex(el => el.id === isDash.id)) 
    }
  }

  const onExist = useCallback(() => {
    if(isTables && isDash) {
      setIndex(isTables.findIndex(el => el.id === isDash.id)) 
    }
  }, [isDash, isTables])
  //console.log(isIndex)
  //buttons change table data
  const next = () => {
    if(typeof isIndex === 'number' && isIndex !== -1 && isTables) {
      if(isIndex < isTables.length - 1) {
        setIndex(isIndex + 1)
        setDash(isTables[isIndex])
        console.log('dash posle nexta', isDash)
      }
    }
  }
  const previous = (/**react.mouseevent ) => {
    if(isIndex && isIndex !== -1 && isTables) {
      if(isIndex !== 0) {
        setIndex(isIndex - 1)
        setDash(isTables[isIndex])
        //tut che to poticat podergat
        console.log('dash posle previousa', isDash)
      }//else setDisabledPrev true
    }
  }
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
    
  }
  //create Lpu department
  const isLpu = useCallback((deps: DashDepartment[] | undefined ) => {
    if(!deps) return undefined

    let withoutPal = deps.filter((dep) => {
      return dep.name.toLowerCase() !== "Паллиатив".toLowerCase()
    })

    if(!withoutPal) return undefined
    //@ts-ignore
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

    return LpuDep
  },[isDash])

  const isValue = (lpuValues: (number | null) []): number => {
    if(!lpuValues) return 0

    let lpuValue = lpuValues.reduce((sum: number, current) => {
      //@ts-ignore
      return sum + current
    }, 0)

  return lpuValue
  }

  //получаем таблицы
  useEffect(() => {
    getTables()
  }, [])
  //если получили таблицы ставим дэш
  useEffect(() => {
    if(isTables && isTables[isTables.length - 1].table)
    setDash({...isTables[isTables.length - 1]/*, table: [...isTables[isTables.length - 1].table, isLpu(isTables[isTables.length - 1].table)]})
  }, [isTables])
  //если дэш поставили ищем его индекс
  useEffect(() => {
    onExist()
  },[onExist])

  useEffect(() => {
    if(isStateLpu && isDash)
      setDash({...isDash, table: [...isDash.table, isStateLpu]})
    //if(isTables && isDash) {}
      //console.log('index', onExist())
      //setIndex(onExist()
    //setDate(isDash?.date)
    //setIndex(onExist())
    //onExist(isTables)
      //console.log('dash', isDash)
  }, [/*isTables, isDash, onExist*//*, isDash?.date])useEffect(() => {if(isDash)setStateLpu(isLpu(isDash.table))//console.log(isLpu(isDash.table))//setDash(isDash?.table.splice(isDash.table.length - 2, 0 , isLpu(isDash.table)))}, [isDash, isLpu])  /*useEffect(() => {if(isTestDep && isDash)setDash({id: isDash.id,date: isDash.date,table: isDash.table})}, [isTables])//ПАГИНАЦИЯ НОРМАЛЬНАЯ ДОЛЖНА БЫТЬ return (<div className="w-full ml-4 mr-4">{/*date && isTables && isDash?<><DatePicker date={date} setDate={setDate} previous={previous} next={next} testDate={isDash.date}dashDates={isTables?.map((el) => {return new Date(el.date)})}/>{isIndex}<DashItem data={isDash.table} isStateLpu={isStateLpu} /><DashPagination /></>:<DashSkeleton/>}</div>)}
*/