import { useState } from 'react';
import {
  Box,
  Input,
  Container,
  FormControl,
  FormLabel,
  Button,
  // FormErrorMessage,
  // FormHelperText,
} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { useStore } from './store';

function App() {
  const { data, createData, deleteData, updateData } = useStore();
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)

  const handleSubmit = (e) => {
    if (isUpdate) {
      const newData = [...data]
      const payload = { email: email, username: username }
      const updateIndex = newData.findIndex(item => item.email === email)
      newData.splice(updateIndex, 1, payload)
      updateData(newData)
      setEmail('')
      setUsername('')
      setIsUpdate(false)
    } else {
      console.log('masuk')
      createData({ email: email, username: username })
      setEmail('')
      setUsername('')
    }
    e.preventDefault()
  }
  const handleUpdate = (param) => {
    setEmail(param.email)
    setUsername(param.username)
    setIsUpdate(true)
  }
  // const isErrorEmail = email === ''

  return (
    <>
      <Box display="flex-column" alignItems="top" justifyContent="center" >
        <Container marginTop="50px" p="20px" border="1px" borderColor={"gray.300"} borderRadius="10px">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Box display="flex" alignItems='center' justifyContent="space-between">
                <FormLabel>Email</FormLabel>
                <Input disabled={isUpdate} w="80%" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </Box>
              {/* {!isErrorEmail ? (
              <FormHelperText>
                Enter the email you'd like to receive the newsletter on.
              </FormHelperText>
            ) : (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )} */}
            </FormControl>
            <FormControl mt="10px">
              <Box display="flex" alignItems='center' justifyContent="space-between">
                <FormLabel>Username</FormLabel>
                <Input w="80%" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Box>
              {/* {!isErrorEmail ? (
              <FormHelperText>
                Enter the email you'd like to receive the newsletter on.
              </FormHelperText>
            ) : (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )} */}
            </FormControl>
            <Box mt="25px" display='flex' justifyContent='space-evenly'>
              <Button type='submit'>{isUpdate ? 'Update' : 'Add'}</Button>
              {
                isUpdate &&
                <Button onClick={() => { setIsUpdate(false); setUsername(''); setEmail('') }}>Cancel</Button>
              }
            </Box>
          </form>
        </Container>

        <TableContainer mt="20px">
          <Table variant='simple'>
            <TableCaption>Data</TableCaption>
            <Thead>
              <Tr>
                <Th>Email</Th>
                <Th>Username</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((record) =>
                <Tr key={record.email}>
                  <Td>{record.email}</Td>
                  <Td>{record.username}</Td>
                  <Td>
                    <Button marginRight="10px" onClick={() => handleUpdate(record)}>Update</Button>
                    <Button onClick={() => deleteData(record.email)}>Delete</Button>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default App;
