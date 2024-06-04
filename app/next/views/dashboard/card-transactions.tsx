import { Flex, FlexBox } from '@/components';
import { Avatar, Card, Divider, Text } from '@nextui-org/react';
import React, { useEffect } from 'react';
// import {Flex} from '../styles/flex';

export const CardTransactions = (customerData: any) => {

   console.log(customerData);
   return (
      <Card
         css={{
            // mw: '375px',
            height: 'auto',
            bg: '$accents0',
            borderRadius: '$xl',
            // alignContent: 'start',
            justifyContent: 'start',
            px: '$6',
         }}
      >
         <Card.Body css={{ py: '$10' }}>
            {/* <Flex
      css={{
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    > */}
            <Flex css={{ gap: '$5', justifyContent: 'start' }} >
               {/* <Text h3 css={{ textAlign: 'center' }}>
                  {customerData?.customerData?.SiteName?.toUpperCase()}
               </Text> */}
               <Text b css={{ lineHeight: "$xm" }}>
               {customerData?.customerData?.SiteName?.toUpperCase()}
            </Text>
            </Flex>
            {/* <Divider></Divider> */}
            {/* <FlexBox
              w={370}
              flexDirection="column"
              jc="space-between"
              ai="center"
            ></FlexBox> */}
            <FlexBox
               css={{ gap: '$6', py: '$4' }}
               align={'center'}

               flexDirection='column'
            >
               <Flex
                  css={{
                     gap: '$6',
                     justifyContent: "between",
                     alignItems: "center",
                  }}
               >

                  <Text span size={'$base'} weight={'semibold'}>
                     Category
                  </Text>
                  <Text span css={{ color: '$green800' }} size={'$xm'}>
                     {customerData?.customerData?.CategoryRank?.Category}
                  </Text>

               </Flex>
               {/* <Flex css={{gap: '$6'}} align={'center'} justify="between"> */}
               <Flex
                  css={{
                     gap: '$6',
                     justifyContent: "between",
                     alignItems: "center",
                  }}
               >

                  <Text span size={'$base'} weight={'semibold'}>
                     Bounce Rate :
                  </Text>
                  <Text span css={{ color: '$green800' }} size={'$xm'}>
                     {/* {customerData.customerData.Engagments.BounceRate} */}
                     {(Math.round(customerData.customerData?.Engagments?.BounceRate * 100) / 100) * 100} %
                  </Text>
                 
               </Flex>

               {/* <Flex css={{gap: '$6'}} align={'center'} justify="between"> */}
               <Flex
                  css={{
                     gap: '$6',
                     justifyContent: "between",
                     alignItems: "center",
                  }}
               >

                  <Text span size={'$base'} weight={'semibold'}>
                     Page Per Visit :
                  </Text>
                  <Text span css={{ color: '$green800' }} size={'$xm'}>
                     {Math.round(customerData.customerData?.Engagments?.PagePerVisit * 100) / 100}
                  </Text>
                  
               </Flex>
               {/* <Flex css={{gap: '$6'}} align={'center'} justify="between"> */}
               <Flex
                  css={{
                     gap: '$6',
                     justifyContent: "between",
                     alignItems: "center",
                  }}
               >

                  <Text span size={'$base'} weight={'semibold'}>
                     Time On Site
                  </Text>
                  <Text span css={{ color: '$green800' }} size={'$xm'}>
                     {Math.round(customerData.customerData?.Engagments?.TimeOnSite * 100) / 100}
                  </Text>
                  
               </Flex>
               {/* <Flex css={{gap: '$6'}} align={'center'} justify="between"> */}
               <Flex
                  css={{
                     gap: '$6',
                     justifyContent: "between",
                     alignItems: "center",
                  }}
               >

                  <Text span size={'$base'} weight={'semibold'}>
                     Visits
                  </Text>
                  <Text span css={{ color: '$green800' }} size={'$xm'}>
                     {Math.round(customerData.customerData?.Engagments?.Visits * 100) / 100}
                  </Text>
                 
               </Flex>
               {/* <Flex css={{gap: '$6'}} align={'center'} justify="between"> */}
               <Flex
                  css={{
                     gap: '$6',
                     justifyContent: "between",
                     alignItems: "center",
                  }}
               >

                  <Text span size={'$base'} weight={'semibold'}>
                     Year
                  </Text>
                  <Text span css={{ color: '$green800' }} size={'$xm'}>
                     {Math.round(customerData.customerData?.Engagments?.Year * 100) / 100}
                  </Text>
                 
               </Flex>
               {/* <Flex css={{gap: '$6'}} align={'center'} justify="between"> */}

            </FlexBox>
            <Divider></Divider>
         </Card.Body>
      </Card>
   );
};
