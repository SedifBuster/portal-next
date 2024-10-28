import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { ReactNode } from "react";

export
  function AdminTab({
    value,
    title,
    description,
    tabContent
  }: {
    value: string
    title: string
    description: string
    tabContent: ReactNode
  }
) {
  return <TabsContent value={value}>
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {tabContent}
      </CardContent>
    </Card>
  </TabsContent>
}