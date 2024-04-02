import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from 'react-redux';
import { LuCoffee } from "react-icons/lu";
import { TextField } from '@mui/material';
import  {dateChangedActions} from '../store/index';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  customCard: {
    '&.css-128t1w0-MuiCardContent-root': {
      padding: '0px',
    },
    
  
  },
 
}));


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

 const Cardone =()=> {
  const dispatch = useDispatch();
  const changedDate= useSelector((state) => state.date.dateChanged);
  const firstTwoWords = changedDate.split(' ').slice(0, 2).join(' ');
  const showForm = useSelector((state) => state.date.showForm);
  const meetdata = useSelector((state) => state.date.meetdata);
  const meetdatadatabase= useSelector((state) => state.date.meetdatadatabase);
  const meetuptitle = meetdatadatabase && meetdatadatabase.length !== 0 ?
  (meetdatadatabase.length === 1 ? meetdatadatabase[0].title : meetdatadatabase.map(data => data.title))
  : '';


  const      meetavailabledata  = useSelector((state) => state.date.meetavailabledata);
console.log(meetavailabledata);
  const classes = useStyles();
  
  const showFormHandler =()=> {
    dispatch(dateChangedActions.setShowForm(true));
  }

  const hideFormHandler =()=> {
    dispatch(dateChangedActions.setShowForm(false));
  }

  const  submitHandler = async (event)=> {
    event.preventDefault();
    console.log('submit');
    try {
      const response = await axios.post('http://localhost:3001/api/calendar', { changedDate, meetdata });
    console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const meetHandler = (event)=> {
    dispatch(dateChangedActions.setMeetData(event.target.value));
  
  }
  return (
    <Card sx={{ minWidth: 400  ,height:'100%',maxHeight:'607px', backgroundColor:'white'}}>
      <CardContent   classes={{ root: classes.customCard }}  sx={{ width:'100%',display:'flex', height:'90%' ,flexDirection:'column', justifyContent:'space-between'}}>
      
      <Box sx={{display:'flex',flexDirection:'column'}} >

       <Box sx={{alignSelf:'start', display:'flex',flexDirection:'column' ,width:'24%',maxWidth:'100px'}}>
         <Typography variant='h5' sx={{alignSelf:'flex-end'}}>Events</Typography>
         <Typography sx={{ color:'#D7D7D7'}}>{firstTwoWords}</Typography>
       </Box>
       <Divider sx={{width:'100%'}}/>
       </Box>

     {showForm === false ?
    <>
    {meetavailabledata === true && (meetdatadatabase !== undefined? <TextField label={meetuptitle.data}></TextField> : null)}

        <Box>
        <LuCoffee color="#44A32C" fontSize="6em"/> 
          <Typography variant='h5'>No Events</Typography>
  
        </Box>

       <Box sx={{ width:'100%',display:'flex', justifyContent:'center', height:'9%' }}>
       <Button variant='contained' value={meetdata}   sx={{backgroundColor:'#44A32C',width:'90%', '&:hover': {
          backgroundColor: '#44A32C',
        }}}  onChange={(event) => meetHandler(event)}   onClick={showFormHandler}>Add Event</Button>
      </Box>

      </>


:

<Box component="form"sx={{height:'85%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between'}} onSubmit={(event) => {submitHandler(event); hideFormHandler();}}>
     <Box sx={{width:'80%',display:'flex', alignItems:'center',flexDirection:'column'}}>
     <Typography variant='h6' sx={{ alignSelf: 'start', fontSize: 'small' }} placeholder="Placeholder">Event Title</Typography>

      <TextField  value={meetdata} variant='outlined' onChange={meetHandler} label='Event Title' sx={{width:'100%'}}></TextField>
      </Box>
      <Box sx={{ width:'100%',display:'flex', justifyContent:'center', height:'10.5%' }}>
      <Button type="submit" variant='contained' sx={{backgroundColor:'#44A32C',width:'90%', '&:hover': {
          backgroundColor: '#44A32C',
        }}} >Save</Button>
      </Box>
      </Box>
    
      
    }
  
      </CardContent>
      
    </Card>
  );
}

export default Cardone;