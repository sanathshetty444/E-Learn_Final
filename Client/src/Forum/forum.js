import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import UserContext from '../context/UserContext'
import {Button, Input,Collapse} from 'antd'
import { CaretRightOutlined } from '@ant-design/icons';
import car from './undraw_public_discussion_btnw.svg'

import './forum.css'
export default function Forum() {
    const { userData, setUserData } = useContext(UserContext);
    const { Panel } = Collapse;
    const [comm,setComm]=useState('')
    const [post,setPost]= useState('')
    const [posts,setPosts]=useState([])
    useEffect(() => {
        const posts=axios.get('http://localhost:5000/forum/getPosts')
                    .then((r)=>{
                        console.log(r)
                        setPosts(r.data.posts)
                    })
        return () => {
        
        }
    }, [setPosts])
    // console.log(userData);
    async function onAdd(e){
        e.preventDefault();
        let data;
        if(userData.student){
            data={
                post:post,
                by:'student'
            }
        }
        else{
            data={
                post:post,
                by:'faculty'
            }
        }
        
       let newone= await axios.post('http://localhost:5000/forum/addPosts',data,{ headers: { 'x-auth-token': userData.token } })
        setPosts([...posts,newone.data.newone])
        console.log(newone.data);
        setPost('')

    }
    async function addComment(e,p){
        e.preventDefault();
        let data;
        if(userData.student){
            data={
                comm:comm,
                id:p._id,
                by:'student'
            }
        }
        else{
            data={
                comm:comm,
                id:p._id,
                by:'faculty'
            }
        }
        let newComm=await axios.post('http://localhost:5000/forum/addComment',data,{ headers: { 'x-auth-token': userData.token } })
        setPosts(newComm.data.posts)
        setComm('')

    }
    return (
        <div id='forum-main'>
            <div className='forum-svg' style={{ overflow: 'hidden',position:'absolute',zIndex:-1}}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}><path d="M-7.11,1.29 C150.00,150.00 349.20,-49.99 506.43,161.15 L500.00,150.00 L0.00,150.00 Z" style={{stroke: 'none', fill: '#08f'}} /></svg></div>

            <form action="">
                
                <Input style={{height:'100px',width:'50%'}} type="text" placeholder="What's on your mind?" value={post} onChange={(e)=>{setPost(e.target.value)}}/>
                <br />
                <br />
                <Button type='primary' onClick={onAdd}>Click To Add</Button>
            </form>
            <br />
            <br />
            <Collapse expandIcon={({ isActive }) => <CaretRightOutlined style={{fontSize:'25px'}} rotate={isActive ? 90 : 0} />} className="site-collapse-custom-collapse"  bordered={false} accordion>
            {posts.map((p,i)=>{
                return  <Panel className="site-collapse-custom-panel"  header={`${p.content}`} key={i+1}>
                            
                            <div id='post'>
                                <div id="name">
                                <p style={{display: 'inline-block'}}>{p.name}</p>
                                <i style={{fontSize: 5, verticalAlign: 'middle', paddingRight: 5, paddingLeft: 15}} className="fas fa-circle" />
                                <p style={{display: 'inline-block',color:'purple'}}>{p.onModel=='StudentUser'?'Student':'Faculty'}</p>

                                </div>
                                <div id="content">
                                    <p>{p.content}</p>
                                </div>
                               
                                <div id="comments">
                                <Input value={comm} id={p._id} onChange={(e)=>{setComm(e.target.value)}}  placeholder="Add your Comments Here" />
                                <Button type='success' style={{backgroundColor:'lightgreen',paddingRight:'10px',borderRadius:'4px'}} onClick={(e)=>addComment(e,p)}>Add Comment</Button>
                                
                                </div>

                               
                                <br/>
                                {p.comments.map((c,i)=>{
                                    return <div className="comments-box">
                                    <div id="user-details">
                                    <p style={{display: 'inline-block',color:'white'}}>{c.name}</p>
                                    <i style={{fontSize: 5,color:'white', verticalAlign: 'middle', paddingRight: 5, paddingLeft: 15}} className="fas fa-circle" />
                                    <p style={{display: 'inline-block',color:'purple'}}>{c.onModel=='StudentUser'?'Student':'Faculty'} </p>
                                    <p className="comments-content"> {c.content}</p> 
                                    </div>
                                </div>
                                  
                                })}
                                
                                </div> 
                                
                            </Panel>

                            
                            
                        
                })}
                </Collapse>
        </div>
    )
}

