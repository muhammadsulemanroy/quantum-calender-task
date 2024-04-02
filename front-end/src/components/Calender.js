import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import  {dateChangedActions} from '../store/index';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import Cardone from './Cardone';
import axios from 'axios';
import { useEffect } from 'react';
const useStyles = makeStyles((theme) => ({
  customDateCalendar: {
    '& .MuiTypography-root': {
      width: '700px', 
    },
    '& .MuiPickersDay-root': {
      width: '700px', 
    },
    
    '& .MuiButtonBase-root': {

    },
    '&.css-1q04gal-MuiDateCalendar-root': {
      width: '880px', 
      height: '100%',
      maxHeight: '607px',
      
    },
     
    '& .MuiPickersSlideTransition-root':{
      minHeight:'607px'
    },
    '& .MuiDayCalendar-weekContainer':{
    
      height:'110px'
    },
    '& .css-flbe84-MuiDayCalendar-weekContainer': {
    
      border: '1px solid #ccc', 
    },
    '& .Mui-selected.css-1u23akw-MuiButtonBase-root': {
      width:'372px !important'
    },
    '& .css-12mkn7b-MuiButtonBase-root-MuiIconButton-root-MuiPickersCalendarHeader-switchViewButton': {
      display: 'none',
    },
    
    
  },
}));



const Calender = () =>{
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(dayjs('2022-04-17'));
  const meetdata = useSelector((state) => state.date.meetdata);
  const changedDate= useSelector((state) => state.date.dateChanged);
  console.log(changedDate);
  const meetdatadatabase= useSelector((state) => state.date.meetdatadatabase);
 


  const classes = useStyles();



  
  useEffect(() => {
    const fetchCalendarEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/calendar');
  
        dispatch(dateChangedActions.setMeetUpDatabase(response.data));
      } catch (error) {
        console.error('Error fetching calendar events:', error);
      }
    };
    

    fetchCalendarEvents();
  }, []);


  useEffect(() => {
    if (meetdatadatabase && meetdatadatabase.length > 0) {
      const meetdate = meetdatadatabase.find(data => data.date === changedDate);
      if (meetdate) {
        console.log(meetdate);
        dispatch(dateChangedActions.setMeetUpDatabase(meetdate));
        dispatch(dateChangedActions.setDataAvailable(true));
      }
    }
  }, [meetdatadatabase, changedDate]);



  const dateHandler = async(newValue) => {
 
    const { $d: date} = value;
console.log(value);
    const monthDate = newValue.format("MMM D YYYY"); 
    console.log(monthDate);
    dispatch(dateChangedActions.setChangedDate(monthDate));
    
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
 
  };

 
  return (
    <>
    <Box sx={{display:'flex',width:'100%', justifyContent:'space-around',alignItems:'center', backgroundColor:'#EDF3FD',height:'100vh'}}>
   
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DateCalendar']} sx={{width:'65%',height:'607px',backgroundColor:'white',}} >
      
     
      <DateCalendar
  value={value}
  onChange={(newValue) => {
    setValue(newValue);
    dateHandler(newValue);
  }}
  classes={{ root: classes.customDateCalendar }}
  
/>


      
      </DemoContainer>
    </LocalizationProvider>

       <Box sx={{   width: '30%',display:'flex',alignItems:'center', height:'100vh'}}>
<Cardone/>
       </Box>
       </Box>
       </>
  );
}

export default Calender;

