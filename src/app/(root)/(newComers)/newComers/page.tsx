import { Card, CardContent } from "@/src/shared/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/src/shared/ui/carousel";
import { Label } from "@/src/shared/ui/label";


export
  default function newComers(
) {
  return <section>
    <header>
      <div className="flex ">
        <Label className="text-5xl block subpixel-antialiased tracking-wide p-4">Новым сотрудникам</Label>
      </div>
    </header>
    <div className="flex justify-center p-6">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
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
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  </section>
}