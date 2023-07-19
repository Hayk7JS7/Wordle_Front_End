import { Autocomplete, Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { TOPIC_LIST } from '../utils/WordsList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWordsByTopic } from '../features/wordleWordsSlice'

const Register = () => {
  const { wordleWords, status, error } = useSelector((state) => state.wordleWords)
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState({name: '', topic: ''})

  const handlePlayGame = () => {
    if(userInfo.topic) {
      dispatch(fetchWordsByTopic(userInfo.topic))
    } else {
      alert('Topic is not selected')
    }
  }

  // console.log({ wordleWords, status, error })

    return (
        <Box sx={{ textAlign: 'center', marginTop: "5rem", backgroundColor: "white", height: "40vw" }}>
            <TextField value={userInfo.name} onChange={(e) => setUserInfo({...userInfo, name: e.target.value})} sx={{ borderColor: "white", marginTop: "5rem" }} id="standard-basic" label="Name" variant="outlined" />
            <Box sx={{ textAlign: 'center' }}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(event, value) => setUserInfo({ ...userInfo, topic: value.label })}
                options={TOPIC_LIST}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Թեմաներ" />}
            />
            </Box>
            <Button variant="contained" onClick={handlePlayGame}>Play Wordle</Button>
        </Box>
  )
}

export default Register
