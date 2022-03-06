

import React,{useState, useEffect} from "react";
import NewHeader from "./new_header";
import NewBody from "./new_body";
import AddNew from "./addNew";
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';



const New=()=>{
    const [show,setShow]=useState(false);
    const navigate = useNavigate();
    const callbackFunction = () => {
        if (show){
            setShow(false);
          }else{
            setShow(true);
        }
      }
      const callbackFunction3 = (value) => {
        setCheck(true);
        let date1 = new Date(value);
        var a=[];
         for (var i = 0; i < news.length; i++) {
           let  date2 = new Date(news[i].created_at);
           if (date1<=date2) {
             a.push(news[i]);
           }
          }
        setResult(a)
      }
      const callbackFunction4 = (value) => {
        setCheck(true);
        let date1 = new Date(value);
        var a=[];
         for (var i = 0; i < news.length; i++) {
           let  date2 = new Date(news[i].created_at);
           if (date1>=date2) {
             a.push(news[i]);
           }
          }
        setResult(a)
      }
      const onClickRender = (value) => {
        setRender(value);
      }
      const onClickRender2 = (value) => {
        setRender(value);
      }
      const callbackFunction2 = (value) => {
        setCheck(true);
        var a=[];
       if(value==="Important"){
        for (var i = 0; i < news.length; i++) {
          if (news[i].important === 1) {
            a.push(news[i]);
          }
        }
      }else if(value==="Non important"){
        for (var i = 0; i < news.length; i++) {
          if (news[i].important === 0) {
            a.push(news[i]);
          }
        }
      }else{
        for (var i = 0; i < news.length; i++) {
           a.push(news[i])
        }
      }
      setResult(a)
      }      
      const $token=localStorage.getItem('access_token');
      const [news, setNews]= useState([]);
      const [result, setResult]= useState([]);
      const [render, setRender] = useState(false);
      const [check, setCheck] = useState(false);

      const getNews = () =>{
        fetch(process.env.REACT_APP_API+'/new/getAllNew', {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            setNews(data.data.reverse());
        });
    }
    useEffect(() => {
        if($token){
           getNews();
        }else{
           navigate('/home');
        }
    }, [render])
    return(
        !show?
        <div style={{ backgroundColor: '#eceff1', height: '100vh'}}>
            <NewHeader parentCallback={callbackFunction}  parentCallback2={callbackFunction2} parentCallback3={callbackFunction3} parentCallback4={callbackFunction4}/>
            <div style={{ marginTop:"150px"}}>
              {!check?
                  news.length?
                    news.map((item,index)=>{
                      return(
                        <NewBody data={item} token={$token} onRender={onClickRender} renderR={render}/>
                      )
                    }):
                <Typography
                align="center"
                variant="h4" 
                sx={{ 
                  mb: 1.5,
                  color:"rgb(105, 129, 148)",
                }} 
                color="text.secondary" 
              >
               No data found
              </Typography>
              :result.length?result.map((item,index)=>{
                return(
                  <NewBody data={item} token={$token} onRender={onClickRender} renderR={render}/>
                )
              }):
              <Typography
              align="center"
              variant="h4" 
              sx={{ 
                mb: 1.5,
                color:"rgb(105, 129, 148)",
              }} 
              color="text.secondary" 
            >
             No data found
            </Typography>
            }
            </div>
        </div>
        :
        <AddNew token={$token}/>
    );
}
export default New;