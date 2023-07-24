import { TabIndicator, TabList, TabTrigger, Tabs as ArkTabs, type TabsProps, TabContent } from '@ark-ui/react'

export const Tabs = (props: Partial<TabsProps>) => (
  <ArkTabs className={''} defaultValue="react" {...props}>
    <TabList>
      <TabTrigger value="react">React</TabTrigger>
      <TabTrigger value="solid">Solid</TabTrigger>
      <TabTrigger value="vue">Vue</TabTrigger>
      <TabIndicator />
    </TabList>
    <TabContent value="react">React Content</TabContent>
    <TabContent value="vue">Vue Content</TabContent>
    <TabContent value="solid">Solid Content</TabContent>
  </ArkTabs>
)