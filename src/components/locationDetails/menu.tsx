import React, { useState } from 'react';
 import { Tabs, TabList, Tab, TabPanel } from '@zendeskgarden/react-tabs';
 
 const Example = () => {
   const [selectedTab, setSelectedTab] = useState('tab-1');
 
   return (
     <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
       <TabList>
         <Tab item="tab-1">About the team</Tab>
         <Tab item="tab-2">About the store</Tab>
         <Tab item="tab-3">Find the store</Tab>
       </TabList>
       <TabPanel item="tab-1">
       Our experienced team of dedicated, friendly and knowledgeable Sleep Advisors look forward to welcoming you into our Tottenham Court Road store. We will find you the perfect solution to get you the best night's sleep whether you are looking for a bed for yourself or someone else. We hope to make you feel at home by offering you a drink in a relaxed and welcoming environment, helping to make your decision as easy as possible.
       </TabPanel>
       <TabPanel item="tab-2">
       Welcome to Dreams Tottenham Court Road. We have over 20 upholstered, metal and wooden bed frames including a range of TV and tech beds, over 20 mattresses from pocket spring to combination, memory foam and natural filling, and even a selection of mattresses available for you to take home the same day. Not looking to buy for yourself? We have a range of kid's beds and sofa beds in store, offering the perfect sleep solution for any room in the house. We look forward to welcoming you into our store where our trained Sleep Advisors will help you find the perfect products to help you sleep better at night. Featured in all of our stores, why not try Sleepmatch - using a number of inbuilt sensors to take statistical measurements we'll find a selection of mattresses that give you the best level of support. So no matter your size or shape or how you sleep, Sleepmatch will help you get a good night's sleep, every night, for years to come.\n\n\nCome in store for personalised advice from our Sleep Experts. They'll help you choose the bed and mattress that's best for you, so you can get a great night's sleep. Simply pop in, or if you prefer, make an appointment online or by calling the store.
       </TabPanel>
       <TabPanel item="tab-3">
       The store is located between Goodge St \u0026 Warren St Tube Stations (Northern Line). Just a 3 minute walk from either station.
       </TabPanel>
     </Tabs>
   );
 };
 
 export default Example;