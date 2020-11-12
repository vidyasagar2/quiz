import React from 'react'
import ReactDOM from 'react-dom'

const DisplayQuestion = (props) => {
  console.log(props.question.options)
  return (
    <div>
      <h1>{props.question.question}</h1>
      
        {props.question.options.map((option)=>(
          <React.Fragment><label style={{display:"block", position: "relative"}}>
          <input type ="radio" name="option" value={option}></input>{option}</label>
          <br/></React.Fragment>
        )
        )}
        <br/>
      
    </div>
  )
}

const ShowFeedBack = (props) => {
  return (
    <div>
      <h2>Hi {props.username} , you score is {props.score}</h2>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username : "",
      quizData : [
        {
            "question": "What is the capital of Telangana ?",
            "options" : ["Secunderabad", "Hyderabad", "Warangal"],
            "answer" : "Hyderabad"
        },
        {
            "question": "What is the capital of TamilNadu ?",
            "options" :["Chennai", "Madurai", "Vellore"],
            "answer" : "Chennai"
        },
        {
            "question": "What is the capital of Karnataka ?",
            "options" : ["Belgaum", "Bengaluru", "Mysuru"],
            "answer" : "Bengaluru"
        },
        {
            "question": "What is the capital of Kerala ?",
            "options" : ["Thiruvananthapuram", "Thrissur", "Kochi"],
            "answer" : "Thiruvananthapuram"
        }     
      ],
      questionIndex : -1,
      score : 0
    }
  }

  enterQuiz = () => {
    let username = document.getElementById("uname").value
    console.log(username)
    if(username === "") {

    } else {
      this.setState((currentState) => {
        return {
          username,
          questionIndex : 0
        }
      })
    }
  }

  resetQuiz = () => {
    this.setState((currentState) => {
      return {
        username : "",
        questionIndex : -1,
        score : 0
      }
    })
  }

  submitQuestion = () => {
    let checked = document.querySelector('input[name="option"]:checked')
    console.log(checked)
    if (checked) {
      checked.checked = false
      let increment = 0
      if (this.state.quizData[this.state.questionIndex].answer === checked.value) {
        increment = 1
      }
      
      this.setState((currentState)=>{
        return {
          score : currentState.score+increment,
          questionIndex : currentState.questionIndex+1
        }
      })
      
    }
  }

  // componentDidUpdate() {
  //   console.log("--Inside Component Did Update")
  //   console.log(this.state.questionIndex !== -1)
  //   console.log(this.state.questionIndex !== this.state.quizData.length)
  //   if (this.state.questionIndex !== -1 && (this.state.questionIndex !== this.state.quizData.length)) {
  //     console.log("--Inside Second")
  //     return <DisplayQuestion question = {this.state.quizData[this.state.questionIndex]} />
  //   }
  // }

  render() {
    return (
      <div style={{textAlign:"center", display:"block"}}>
        {this.state.username === "" ?
        <div> 
          <h1 style={{color:"green"}}>Enter Your Name</h1>
        <input type = "text" placeholder = "Enter your name" id = "uname"/>
        <input type = "submit" onClick = {this.enterQuiz} value="Take Quiz"/>
        </div>
         : (this.state.questionIndex !==  this.state.quizData.length) ? 
         <React.Fragment>
         <DisplayQuestion question = {this.state.quizData[this.state.questionIndex]} />
         <input type = "button" onClick={this.submitQuestion} value={this.state.questionIndex !== this.state.quizData.length-1 ? "Next" : "Submit"} />
         </React.Fragment> :
         <React.Fragment>
          <ShowFeedBack username={this.state.username} score={this.state.score} />
          <input type = "submit" onClick = {this.resetQuiz} value="Take Quiz Again"/>
         </React.Fragment>
        }
      </div>
    )
  }

}

export default App;
