import React from 'react';
import './Contact.scss';
import Person from '../../../assets/person.svg'
import emailjs from 'emailjs-com'
import { useEffect, useRef, useState } from 'react'



const Contact = () => {
    const [letterClass,setLetterClass] = useState('text-animate')
    const form = useRef();

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
    }, []);
    
    const sendEmail = (e) => {
        e.preventDefault()
    
        emailjs
        .sendForm('service_1njy9ce', 'template_t0ac0my', form.current, 'amVkIb0N1CBy6fSzs')
        .then(
            () => {
                alert('Message successfully sent!')
                window.location.reload(false)
            },
            () => {
                alert('Failed to send the message, please try again')
            }
        )
    }


    return (
        <div id="contact" className="contact-page">
            <div className="contact-info">
            <h1>Contact Us</h1>
            <p>Feel free to contact us for any queries or feedback.</p>
            <img src={Person} alt="person" />

            <div className="contact-form">
                <form ref={form} onSubmit={sendEmail}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Your Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" name="subject" placeholder="Subject" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" placeholder="Write Something"></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>

            </div>
            
        </div>
    );
}

export default Contact;