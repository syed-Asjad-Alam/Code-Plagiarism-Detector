import React from 'react'

const Home = () => {
  return (
    <>
    <div style={{color: 'blue', margin:'2%', fontSize:'30px', marginLeft:'40%'}}>CODE PLAGIARISM CHECKER</div>
    <br/>
    <div  style={{backgroundColor:'#c4c1c0',fontSize:'25px', margin:'4%', 
    display:'flex', justifyContent:'space-between'}}>
    <div >
      <a href='/login'>Teacher Portal</a>
    </div>
    <br/>
    <div>
      <a href='/S_login'>Student  Portal</a>
    </div>
    <br/>
    <div>
      <a href='/'>Admin Portal</a>
    </div>
    </div>
    </>
  )
}

export default Home