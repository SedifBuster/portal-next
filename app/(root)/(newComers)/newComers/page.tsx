import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import item1 from "../../../../public/carouselComes/1.jpg"
import item2 from "../../../../public/carouselComes/2.jpg"
import item3 from "../../../../public/carouselComes/3.jpg"
import item4 from "../../../../public/carouselComes/4.jpg"
import item5 from "../../../../public/carouselComes/5.jpg"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export
  default function newComers(
) {

  /*const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])*/


  return <section>
    <header>
      <div className="flex ">
        <Label className="text-5xl block subpixel-antialiased tracking-wide p-4">Новым сотрудникам</Label>
      </div>
    </header>
    <div className="flex justify-center pl-14 pr-14 pt-4">
      <Carousel /*setApi={setApi}*/ className="w-full max-w-8xl">
        <CarouselContent>

              <CarouselItem className="p-1 border-none">
                <div className="shadow-none">
                  <Card className="shadow-none">
                    <CardContent className="flex items-center justify-center select-none p-0">
                      <Image src={item1} alt="slide 1"/>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>

              <CarouselItem className="p-1 border-none">
                <div>
                  <Card>
                    <CardContent className="flex items-center justify-center select-none p-0">
                    <Image src={item2} alt="slide 2"/>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>

              <CarouselItem className="p-1 border-none">
                <div>
                  <Card>
                    <CardContent className="flex items-center justify-center select-none p-0">
                    <Image src={item3} alt="slide 3"/>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>

              <CarouselItem className="p-1 border-none">
                <div>
                  <Card>
                    <CardContent className="flex items-center justify-center select-none p-0">
                    <Image src={item4} alt="slide 4"/>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>

              <CarouselItem className="p-1 border-none">
                <div>
                  <Card>
                    <CardContent className="flex items-center justify-center select-none p-0">
                    <Image src={item5} alt="slide 5"/>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>

        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  </section>
}

/**
          {
            Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))
          }
 */

          /**
           *               <CarouselItem>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-2">
                      <Image src={item1} alt="slide 1"/>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
           */