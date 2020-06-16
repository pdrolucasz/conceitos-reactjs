import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

export default function Input({ name, placeholder }) {
    const inputRef = useRef(null)
    const { fieldName, registerField } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField])

    return (
        <input placeholder={placeholder} ref={inputRef}/>
    )
}