import React from 'react'
import './About.css'

function About() {
    return (
        <div className='about-box'>
            <h2 className="about-title">About the Library</h2>
            <div className="about-data">
                <div className="about-img">
                    <img src="https://png.pngtree.com/thumb_back/fh260/background/20240914/pngtree-diverse-group-of-students-reading-books-in-a-library-stock-photo-image_16205449.jpg" alt="" />
                </div>
                <div>
                    <p className="about-text">
                        Reading books brings many benefits to our life.
                        First, it helps us gain more knowledge about the world, history, science, and different cultures.
                        Second, reading improves our vocabulary and writing skills, which are very useful for studying and communication.
                        Moreover, books can reduce stress and give us relaxation after a busy day. They also inspire us with new ideas and teach us valuable lessons.
                        In short, reading is not only a great way to learn but also an enjoyable hobby that makes life richer and more meaningful.<br/>
                        <br/>
                        Reading books is a wonderful way to expand your knowledge on various subjects.
                        When you enjoy reading about history, you connect with diverse cultures and times.
                        This develops a love for learning and helps you become more empathetic towards people from different eras. 
                        The journey through pages of history broadens the reader’s perspective and stimulates a deeper appreciation for the past.<br/>
                        <br/>
                        Regular reading improves vocabulary and comprehension. 
                        By following the lives of characters, readers gain insight into emotions and situations, which cultivates empathy. 
                        Books are not just informative; they are gateways to become more empathetic. 
                        They serve as a mirror reflecting the human condition, allowing readers to connect with the hearts and minds of others.<br/>
                        <br/>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
