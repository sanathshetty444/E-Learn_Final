import React, { useEffect, useState,useContext } from 'react'
import {Typography, Avatar} from 'antd'
import axios from 'axios';
import UserContext from '../context/UserContext'
import {  PlusOutlined,UserOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'

const { Title } = Typography;

function Courses() {
  const colors=['#8ad7c1','#fd3a69','orange','#a685e2',]

  const { userData, setUserData } = useContext(UserContext);

  const [courses,setCourses] = useState([])

  useEffect(()=>{
    axios
    .get('http://localhost:5000/faculty/course/all',{ headers: { 'x-auth-token': userData.token } })
    .then(res=>{
      console.log(res.data);
      setCourses(res.data);
    })
  },[])

  function CourseBox(props) {
    console.log(props.cimg);
    return(
      <div className='hvr-float-shadow' style={{margin:'1.5rem',width:'25%',border:'1px solid lightgray',borderRadius:"10px"}}>
        
        <div style={{backgroundColor:props.c_color,padding:'1rem',borderRadius:"10px"}}>
        <Link to={`/course/${props.id}`}> <Title level={2} style={{color:'#fff'}}>{props.cname}</Title> </Link>
          
          <h4 style={{color:'#fff'}}>{props.cprof}</h4>
        </div>
        <div style={{backgroundColor:'white'}}>
          {props.cimg ? 
          
          <img src={`http://localhost:5000/${props.cimg}`} alt='Professor '
          height='120px' 
          width='120px' 
          style={{borderRadius:'50%',position:'relative' ,left:'55%',bottom:'60px' }}/> 
          
          : <Avatar size={120} icon={<UserOutlined />} 
              style={{borderRadius:'50%',position:'relative' ,left:'55%',bottom:'60px' }}/>
          }
        </div>
        

          <div style={{color:'black',padding:'0 1.5rem 1.5rem',backgroundColor:'white',height:'150px'}}>
            {props.cdesc}
          </div>
      </div>
    )
  }

  return (
    <div style={{height:'70vh'}} className=''>
      <div className='course-svg' style={{overflow: 'hidden',position:'absolute',zIndex:-1}}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}><path d="M570.20,-18.45 C183.63,-2.66 414.44,79.24 -7.67,193.71 L500.00,150.00 L500.00,0.00 Z" style={{stroke: 'none', fill: '#08f'}} /></svg></div>

      <h1>Courses</h1>
      {
        !userData.student && <Link to='/add-course'>
        <div style={{position:'fixed' ,top:'7rem',right:'4rem'}}>
          <Avatar size={80} icon={ <PlusOutlined />} style={{borderRadius:'50%'}} />
          <Title level={5}>Add Course</Title>
        </div>
      </Link>
      }
      

      <div style={{display:'flex', flexWrap:'wrap',overflowY:'scroll',height:'80vh',width:'95vw'}} className='no-scrollbar'>
      {courses && courses.map((item,i)=>{
        return <CourseBox c_color={colors[i%colors.length]}   key={item._id} id={item._id} cname={item.cname} cimg={item.cimg} cprof={item.cprof} cdesc={item.cdesc}/>
      })}
      </div>
      
    </div>
  )
}

export default Courses
