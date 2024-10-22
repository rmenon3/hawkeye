import { Flex, FlexBox } from '@/components';
import { Avatar, Card, Divider, Text } from '@nextui-org/react';
import React, { useEffect } from 'react';
import ContentLoader from "react-content-loader";
// import {Flex} from '../styles/flex';

const Loader = () => (
   <ContentLoader
     viewBox="0 0 380 70"
     speed={1}
     backgroundColor="#f3f3f3"
     foregroundColor="#ded9d9"
   >
     <rect x="0" y="0" rx="5" ry="5" width="350" height="15" />
     <rect x="0" y="17" rx="4" ry="4" width="300" height="13" />
     <rect  y="35"  rx="4" width="300" height="13" />
   </ContentLoader>
 );

export const CardTransactions = ({customerData, loading}: any) => {

   if (loading) return(
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
         <Loader/>
      </Card>
   )

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
            <Flex css={{ gap: '$5', justifyContent: 'start' }} >
               <Text b css={{ lineHeight: "$xm" }}>
               {customerData?.SiteName?.toUpperCase()}
            </Text>
            </Flex>
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
                     {customerData?.CategoryRank?.Category}
                  </Text>

               </Flex>
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
                     {(Math.round(customerData?.Engagments?.BounceRate * 100) / 100) * 100} %
                  </Text>
                 
               </Flex>

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
                     {Math.round(customerData?.Engagments?.PagePerVisit * 100) / 100}
                  </Text>
                  
               </Flex>
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
                     {Math.round(customerData?.Engagments?.TimeOnSite * 100) / 100}
                  </Text>
                  
               </Flex>
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
                     {Math.round(customerData?.Engagments?.Visits * 100) / 100}
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
                     {Math.round(customerData?.Engagments?.Year * 100) / 100}
                  </Text>
                 
               </Flex>
               {/* <Flex css={{gap: '$6'}} align={'center'} justify="between"> */}

            </FlexBox>
            {/* <Divider></Divider> */}
         </Card.Body>
      </Card>
   );
};
