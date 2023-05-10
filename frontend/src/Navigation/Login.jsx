import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Login() {

    const [dataAccount, setDataAccount] = useState({})

    const onChangeData = (e) => {
        setDataAccount((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //axios.get('http://127.0.0.1:8000/account/login', dataAccount).then(res => console.log(res.data))
        console.log(dataAccount);
    }
    return (
        <>
            <div className='text-white'>
                <h1>Login Account</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        Email
                        <input
                            type="email"
                            name="email"
                            value={dataAccount}
                            className='form-control'
                            onChange={onChangeData}
                        />
                    </label>
                    <label htmlFor="password">
                        Password
                        <input
                            type="password"
                            autoComplete='off'
                            name="password"
                            className='form-control'
                            value={dataAccount}
                            onChange={onChangeData}
                        />
                    </label>
                    <button type="submit" className='btn btn-primary'>Login</button>
                </form>
            </div>
        </>
    )
}
