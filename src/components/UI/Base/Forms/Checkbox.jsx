import React, { forwardRef, useEffect, useRef } from 'react'
import { Input } from 'reactstrap'

const Checkbox = forwardRef(({ indeterminate, ...rest}, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
        <Input type='checkbox' ref={resolvedRef} {...rest} />
    )
})

export default Checkbox