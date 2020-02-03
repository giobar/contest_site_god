import React from 'react';
import { Redirect, useParams } from 'react-router-dom';


export default function QuizThanks(){
        var quizResult = JSON.parse(localStorage.getItem('result'));
        console.log(quizResult);
        localStorage.removeItem('result');
        let { quizId } = useParams();
        console.log(quizId)
        if (!quizResult) {
            return <Redirect to='/quiz' />
        }
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <p>Fine</p>
            </div>
        );
}