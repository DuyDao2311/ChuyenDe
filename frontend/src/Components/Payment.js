import React from 'react'
import './News.css'

function News() {
    return (
        <div className='news-container'>
            <h className='news-title'>Updates for You</h>
            <div className='news-data'>
                <div className='news-empty'></div>
                <div>
                    <h1 className='news-subtitle'>Competitions</h1>
                    <div>
                        <div className='news-competition-event'>
                            <p>Competion-1</p>
                            <p>Join the “Read Every Day” challenge and win a Best Seller book set!</p>
                        </div>
                        <div className='news-competition-event'>
                            <p>Competion-2</p>
                            <p>Climb the monthly Reading Leaderboard — top readers earn the “Book Master” badge.</p>
                        </div>
                        <div className='news-competition-event'>
                            <p>Competion-3</p>
                            <p>Complete the 7-Day Reading Streak and unlock a special reward!</p>
                        </div>
                        <div className='news-competition-event'>
                            <p>Competion-4</p>
                            <p>Our Book Review Contest is now open — submit your thoughts and win prizes!</p>
                        </div>
                        <div className='news-competition-event'>
                            <p>Competion-5</p>
                            <p>Join the “Read & Win” challenge — finish 5 books this month to unlock exclusive rewards.</p>
                        </div>
                    </div>
                </div>
                <div className='news-empty'></div>
                <div>
                    <h1 className='news-subtitle'>Online Quiz</h1>
                    <div>
                        <div className='news-quiz-event'>
                            <p>Quiz-1</p>
                            <p>Test your knowledge with the “Sapiens” Quiz — how much do you remember?</p>
                        </div>
                        <div className='news-quiz-event'>
                            <p>Quiz-2</p>
                            <p>Online Quiz: Challenge yourself with classics like 1984 and The Great Gatsby.</p>
                        </div>
                        <div className='news-quiz-event'>
                            <p>Quiz-3</p>
                            <p>Take the 10-question “Atomic Habits” Quiz — how well do you understand good habits?</p>
                        </div>
                        <div className='news-quiz-event'>
                            <p>Quiz-4</p>
                            <p>Try the Harry Potter Trivia Challenge — a must for real fans!</p>
                        </div>
                        <div className='news-quiz-event'>
                            <p>Quiz-5</p>
                            <p>Quick Quiz: Do you truly understand The Alchemist? Try now!</p>
                        </div>
                    </div>
                </div>
                <div className='news-empty'></div>
            </div>
        </div>
    )
}

export default News
