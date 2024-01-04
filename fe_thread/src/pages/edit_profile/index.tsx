import { Box, Button, Flex, FormControl, Input, Text } from "@chakra-ui/react"
import { useEditProfile } from "@/feature/edit_profile/hook/useEditProfile"
import Navbar from "@/components/navbar"
import Profile from "@/components/profile"
import UseFollow from "@/feature/follow/hook/useFollow"
import Footer from "@/components/footer"

export default function EditProfile() {
    const { handleChange, handleEdit } = useEditProfile() 

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
                        width={"300px"}
                    >
                        <Text fontSize={"2xl"} fontWeight={"bold"}>
                            Edit Profile
                        </Text>
                        <Input 
                            placeholder="Fill in the username" 
                            name="username" 
                            onChange={handleChange}
                        />
                        <Input 
                            placeholder="Fill in the fullname" 
                            name="fullname" 
                            onChange={handleChange}
                        />
                        <Input 
                            placeholder="Fill in the email" 
                            name="email" 
                            onChange={handleChange}
                        />
                        <Input 
                            type="password"
                            placeholder="Fill in the password" 
                            name="password" 
                            onChange={handleChange}
                        />
                        <Input 
                            placeholder="Fill in the profile description" 
                            name="profile_description" 
                            onChange={handleChange}
                        />
                        <Button 
                            backgroundColor={"green"} 
                            colorScheme="green" 
                            color={"white"} 
                            onClick={handleEdit}
                        >
                            Submit
                        </Button>
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