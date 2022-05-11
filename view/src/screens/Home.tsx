import { useEffect, useState } from 'react'
import './style.css'
import { useIpc } from '../hooks/useIpc'

export const Home = () => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)

  const { sendIpc, onIpc } = useIpc()

  const handleClick = () => {
    if (name.length) {
      setName('')
      sendIpc('hello', { name })
    }
  }

  useEffect(() => {
    const [, removeListener] = onIpc('hello', ({ msg }: { msg: string }) => {
      setMessage(msg)
    })

    return () => {
      removeListener()
    }
  }, [])

  return (
    <div className="home">
      <div className="home__images">
        <img
          className="home__img"
          src="electron_logo.png"
          alt="electronjs logo"
        />
        <img className="home__img" src="react_logo.png" alt="reactjs logo" />
        <img className="home__img" src="vite_logo.png" alt="vite logo" />
        <img className="home__img" src="webpack_logo.png" alt="webpack logo" />
      </div>
      <label>
        <span style={{ fontWeight: 'bold' }}>Your name:</span>
        <input
          className="home__input"
          placeholder="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <button className="home__button" onClick={handleClick}>
        Saludar
      </button>
      {message && <h1>{message}</h1>}
    </div>
  )
}
