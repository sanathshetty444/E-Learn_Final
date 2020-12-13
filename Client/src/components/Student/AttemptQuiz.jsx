import React, { useState,useEffect ,useContext} from 'react'
import {Radio,Form,Button } from 'antd'
import UserContext from '../../context/UserContext'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {FullScreen,useFullScreenHandle} from 'react-full-screen'
function AttemptQuiz() {

  
  const {qid} = useParams()
  const [check,setCheck]=useState({a:"",b:"",c:"",d:"",e:""})
  const [qna,setQna] = useState()
  console.log('qna =' ,qna);
  const { userData, setUserData } = useContext(UserContext);

  useEffect(()=>{
    axios
    .get(`http://localhost:5000/faculty/course/get-quiz/${qid}`,{ headers: { 'x-auth-token': userData.token } })
    .then(res=>{
      if(res.data){
       setQna(res.data.qna)
      }
    })
    .catch(error=>{
      console.log(error);
    })
  },[])

  
  const onChange = e => {
    const {name,value} = e.target
    setCheck(prev=>{
      return {...prev,
        [name]:value
      }
    })
    
    
  };

  const onSubmit = async(e)=>{
    e.preventDefault()
    console.log(check,qna);
    const arr = [check.a,check.b,check.c,check.d,check.e]
    let i,score=0;
    for (i=0;i<5;i++){
      if(qna[i].ans===arr[i])
        score++
    }
    // alert(score)
    const data = {name:userData.user.name,rollno:userData.user.username,score:score}
    axios
    .post(`http://localhost:5000/faculty/course/submit-quiz/${qid}`,data,{ headers: { 'x-auth-token': userData.token } })
    .then(res=>{
      alert(`Test Submitted \nScore=${score}`)
    })
    .catch(error=>{
      alert('Please try again')
      console.log(error);
    })

  }
  const handle = useFullScreenHandle();
  const [pressed,setPressed]=React.useState(false)
  function goFullscreen(e){
    e.preventDefault()
    console.log('>?>??????')
    handle.enter()
    setPressed(prev=>!prev)
    
    
    
  }

  return (
    <>
     <button onClick={goFullscreen}>
         Enter fullscreen
       </button>
 
    <FullScreen handle={handle} onChange={(state)=>{
      if(state==true){
        setPressed(true)
      }
      else{
        setPressed(false)
         
      }
    }}>
        
     
    {pressed && <div style={{maxWidth:'800px', margin:'10vh auto',padding:'1rem 2rem',boxShadow:'6px 6px 15px 5px rgba(0, 0, 0,0.25)',borderRadius:"15px"}}> 
   
      <h1>Test</h1>
      <Form onSubmit={onSubmit}>
      
      {qna && <div>
        <p><b>Q1 : </b>{qna[0].q}</p>
      <Radio.Group name='a' onChange={onChange} value={check.a}>
          <Radio value="a">{qna[0].a}</Radio>
          <Radio value="b">{qna[0].b}</Radio>
          <Radio value="c">{qna[0].c}</Radio>
          <Radio value="d">{qna[0].d}</Radio>
        </Radio.Group>
        <br/><br/>

        <p><b>Q2 : </b>{qna[1].q}</p>
        <Radio.Group name='b'  onChange={onChange} value={check.b}>
          <Radio value="a">{qna[1].a}</Radio>
          <Radio value="b">{qna[1].b}</Radio>
          <Radio value="c">{qna[1].c}</Radio>
          <Radio value="d">{qna[1].d}</Radio>
        </Radio.Group>
        <br/><br/>

        <p><b>Q3 : </b>{qna[2].q}</p>
        <Radio.Group name='c' onChange={onChange}  value={check.c}>
          <Radio value="a">{qna[2].a}</Radio>
          <Radio value="b">{qna[2].b}</Radio>
          <Radio value="c">{qna[2].c}</Radio>
          <Radio value="d">{qna[2].d}</Radio>
        </Radio.Group>
        <br/><br/>

        <p><b>Q4 : </b>{qna[3].q}</p>
        <Radio.Group name='d' onChange={onChange} value={check.d}>
          <Radio value="a">{qna[3].a}</Radio>
          <Radio value="b">{qna[3].b}</Radio>
          <Radio value="c">{qna[3].c}</Radio>
          <Radio value="d">{qna[3].d}</Radio>
        </Radio.Group>
        <br/><br/>
        <p><b>Q5 : </b>{qna[4].q}</p>
        <Radio.Group name='e' onChange={onChange} value={check.e}>
          <Radio value="a">{qna[4].a}</Radio>
          <Radio value="b">{qna[4].b}</Radio>
          <Radio value="c">{qna[4].c}</Radio>
          <Radio value="d">{qna[4].d}</Radio>
        </Radio.Group>
        <br/><br/>
        
      </div>}
      
        



      <Button type="primary"  onClick={onSubmit}>Submit</Button>  
      </Form>
    </div>}
    </FullScreen>
    </>
  )

}

export default AttemptQuiz
