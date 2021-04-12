import React from 'react'

const Header = ({ course }) => {
    return (
        <h2>{course}</h2>
    )
}

const Part = ({ course }) => {
    return (
        <div>
            <p>{course.name} {course.exercises}</p>
        </div>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => {
                return (    
                    <Part key={ part.id } course={ part }></Part>
                )
            })}
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)
    return (
        <h3>total of {total} exercises</h3>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name}></Header>
            <Content parts={course.parts}></Content>
            <Total parts={course.parts}></Total>
        </div>
    )
}

export default Course