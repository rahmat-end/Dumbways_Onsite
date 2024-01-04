import { BiSolidImageAdd } from "react-icons/bi"
import { useRegister } from "../hook/useRegister"
import { Button, FormControl, Text, Input } from '@chakra-ui/react'

export function FormRegister() {
    const { form, fileInputRef, handleChange, handleClickButton, handleRegister} = useRegister()

    return(
        <form onSubmit={handleRegister} encType="multipart/form-data">
            <FormControl 
                isRequired
                display={"flex"}
                flexDirection={"column"}
                gap={3}
                width={"300px"}
            >
                <Text color={"brand.green"} fontSize={"2xl"} fontWeight={"bold"}>
                    Connect
                </Text>
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                    Create Account Connect
                </Text>
                <Input 
                    type="text"
                    placeholder="Fill in the username ..." 
                    name="username" 
                    onChange={handleChange} 
                    value={form.username}
                />
                <Input 
                    type="text"
                    placeholder="Fill in the fullname ..." 
                    name="fullname" 
                    onChange={handleChange} 
                    value={form.fullname}
                />
                <Input 
                    type="email"
                    placeholder="Fill in the email ..." 
                    name="email" 
                    onChange={handleChange} 
                    value={form.email}
                />
                <Input 
                    type="password"
                    placeholder="Fill in the password ..." 
                    name="password" 
                    onChange={handleChange} 
                    value={form.password}
                />
                <Button
                    variant={"ghost"}
                    color={"brand.green"}
                    onClick={handleClickButton}
                >
                    <BiSolidImageAdd
                    style={{
                        height: "50px",
                        width: "50px",
                    }}
                    />
                </Button>
                <Input
                    type="file"
                    name="profile_picture"
                    onChange={handleChange}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                />
                <Input 
                    type="text"
                    placeholder="Fill in the description ..." 
                    name="profile_description" 
                    onChange={handleChange} 
                    value={form.profile_description}
                />
                <Button 
                    backgroundColor={"green"} 
                    color={"white"} 
                    colorScheme="green" 
                    type="submit"
                >
                    Submit
                </Button>
            </FormControl>
        </form>
    )
}