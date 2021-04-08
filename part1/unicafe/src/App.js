import React, { useState } from 'react'

const Heading = (props) => {
  return (
    <>
      <h1>{props.text}</h1>
    </>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const StatsTable = ({statistics}) => {
  if (!statistics.length){
    return <p>No feedback given</p>
  }
  return (
    <>
      <table>
        <tbody>
          {statistics.map((statistic) => {
            return (
              <tr>
                <td>{statistic.text}</td>
                <td>{statistic.value}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statistics = []
  const all = good + neutral + bad
  if(all !== 0){
    statistics.push({text: 'good', value: good});
    statistics.push({text: 'neutral', value: neutral});
    statistics.push({text: 'bad', value: bad});
    statistics.push({text: 'all', value: all});
    let average = (good - bad) / all;
    let positive = (good * 100) / all + '%';
    statistics.push({ text: 'average', value: average });
    statistics.push({ text: 'positive', value: positive });
  }
  
  return (
    <div>
      <Heading text='give feedback'></Heading>

      <Button
        onClick = {() => {
          setGood(good + 1)
          console.log('good', good, setGood);
        }}
        text='good'
      >
      </Button>

      <Button
        onClick = {() => {
          setNeutral(neutral + 1)
          console.log('neutral', neutral, setNeutral);
        }}
        text='neutral'
      >
      </Button>

      <Button
        onClick = {() => {
          setBad(bad + 1)
          console.log('bad', bad, setBad);
        }}
        text='bad'
      >
      </Button>

      <Heading text='statistics'></Heading>

      <StatsTable statistics={statistics}></StatsTable>
    </div>
  )
}

export default App