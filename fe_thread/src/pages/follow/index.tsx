import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Profile from "@/components/profile"
import UseFollow from "@/feature/follow/hook/useFollow"
import { API } from "@/libs/api"
import { Flex, Text } from '@chakra-ui/react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/tabs"
import React from "react"
import { Followed, Follower } from "@/feature/follow"

export default function Follow() {
    const [followed, setFollowed] = React.useState<[] | null>([])
    const [follower, setFollower] = React.useState<[] | null>([])
    const session = JSON.parse(localStorage.user)

    async function getFollowed() {
        try {
          const response = await API.get(`/followed/${session.id}`)
          setFollowed(response.data.data)
        } catch(err) {
          console.log(err)
        }
    }
    async function getFollower() {
        try {
          const response = await API.get(`/follower/${session.id}`)
          setFollower(response.data.data)
        } catch(err) {
          console.log(err)
        }
    }

    React.useEffect(() => {
        getFollowed()
        getFollower()
    }, [session])

    return(
        <Flex>
            <Navbar />

            <Flex flexDirection='column' width='45vw' padding='20px' borderLeft='1px solid gray' borderRight='1px solid gray' borderBottom='1px solid gray' bg='#1D1D1D' zIndex='1'>
                <Text fontSize='lg' color='white' fontWeight='bold' mb='15px'>Follows</Text>
                <Tabs>
                    <TabList borderBottom='2px solid green'>
                        <Tab width='50%' color='white' borderBottom='2px solid green'>Follower</Tab>
                        <Tab width='50%' color='white' borderBottom='2px solid green'>Followed</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                        { follower && (follower.map((data: any) => (
                                <Follower 
                                    key={data.followerId.id}
                                    id={data.followerId.id}
                                    fullname={data.followerId.fullname}
                                    username={data.followerId.username}
                                    profile_picture={data.followerId.profile_picture}
                                    profile_description={data.followerId.profile_description}
                                />
                            ))) }
                        </TabPanel>
                        <TabPanel>
                            { followed && (followed.map((data: any) => (
                                <Followed 
                                    key={data.id}
                                    id={data.id}
                                    fullname={data.fullname}
                                    username={data.username}
                                    profile_picture={data.profile_picture}
                                    profile_description={data.profile_description}
                                />
                            ))) }
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>

            <Flex padding='30px' width='450px' height='100vh' flexDirection='column' bg='#1D1D1D' position='sticky' top='0'>
                <Profile />
                <UseFollow/>
                <Footer />
            </Flex>
        </Flex>
    )
}