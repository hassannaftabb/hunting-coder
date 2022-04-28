import React from 'react'
import { useState } from 'react'
import styles from '../styles/Contact.module.css'

const Contact = () => {
  const [name, setname] = useState([])
  const [email, setemail] = useState([])
  const [phone, setphone] = useState([])
  const [desc, setdesc] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, phone, desc);
    const data = { name, email, phone, desc };
    fetch('http://localhost:3000/api/postcontact/', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
        alert("Thanks for Contacting Us!")
        setdesc('')
        setemail('')
        setphone('')
        setname('')
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleChange = (e) => {
    if (e.target.name == 'phone') {
      setphone(e.target.value)
    }
    else if (e.target.name == 'name') {
      setname(e.target.value)
    }
    else if (e.target.name == 'email') {
      setemail(e.target.value)
    }
    else if (e.target.name == 'desc') {
      setdesc(e.target.value)
    }
  }
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1>Contact Us</h1>
      <div className={styles.mb3}>
        <label htmlFor="name" className={styles.formlabel}>Name:</label>
        <input type="text" value={name} onChange={handleChange} className={styles.Input} id="name" name='name' />
      </div>
      <div className={styles.mb3}>
        <label htmlFor="email" className={styles.formlabel}>Email address:</label>
        <input type="email" value={email} onChange={handleChange} className={styles.Input} id="email" name='email' />
        <div id="email" className={styles.subLabel}>We&apos;ll never share your email with anyone else.</div>
      </div>
      <div className={styles.mb3}>
        <label htmlFor="phone" className={styles.formlabel}>Phone:</label>
        <input type="number" onChange={handleChange} value={phone} className={styles.Input} id="phone" name='phone' />
      </div>
      <div className={styles.mb3}>
        <label htmlFor="desc" className={styles.formlabeldesc}>Elaborate your concern:</label>
        <textarea value={desc} cols={40} rows={10} onChange={handleChange} className={styles.textareaInput} placeholder="Leave a comment here" id="desc" name='desc'></textarea>
      </div>
      <button type="submit" className={styles.button}>Submit</button>
    </form>
  )
}

export default Contact