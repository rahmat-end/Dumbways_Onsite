import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Profile from "@/components/profile"
import UseFollow from "@/feature/follow/hook/useFollow"
import SearchItem from "@/components/search_item"
import { API } from "@/libs/api"
import { IUserSearch } from "@/type/user"
import { FormControl } from "@chakra-ui/form-control"
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/input"
import { Flex, Box, Text } from "@chakra-ui/layout"
import { RiUserSearchLine } from "react-icons/ri"
import React from "react"

export default function Search() {
    const [search, setSearch] = React.useState<IUserSearch[] | null>([])
    let [keyword, setKeyword] = React.useState<string>('')

    async function getSearch() {
        try {
            const response = await API.get(`/search/${keyword}`)
            console.log(response.data)
            setSearch(response.data.data)
        } catch(err) {
            console.log(err)
        }
    }
    function handleKeyword(event: any) {
        setKeyword(keyword = event.target.value)
    }

    React.useEffect(() => {
        getSearch()
    }, [keyword])

    return(
        <Flex>
            <Navbar />

            <Flex flexDirection='column' width='45vw' padding='20px' borderLeft='1px solid gray' borderRight='1px solid gray' borderBottom='1px solid gray' bg='#1D1D1D' zIndex='1'>
                <Box
                    color={"white"}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    marginTop={"15px"}
                >
                    <FormControl
                        isRequired
                        display={"flex"}
                        flexDirection={"column"}
                        gap={3}
                    >
                        <Text fontSize={"2xl"} fontWeight={"bold"}>
                            Search User
                        </Text>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <RiUserSearchLine color='gray.300'/>
                            </InputLeftElement>
                            <Input type='tel' placeholder='Find user' onChange={handleKeyword} />
                        </InputGroup>
                        { search?.map((search: any, index: any) => ( 
                            <SearchItem id={search.id} username={search.username} fullname={search.fullname} profile_picture={search.profile_picture} profile_description={search.profile_description} key={index}/>
                        ))}
                    </FormControl>
                </Box>
            </Flex>

            <Flex padding='30px' width='450px' height='100vh' flexDirection='column' bg='#1D1D1D' position='sticky' top='0'>
                <Profile />
                <UseFollow/>
                <Footer />
            </Flex>
        </Flex>
    )
}